const express = require('express');
const prisma = require('../config/db');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

// Get my bookings
router.get('/my-bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { destination: true },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create intent (Mock Stripe) — also validates capacity early
router.post('/create-intent', async (req, res) => {
  try {
    const { destinationId, guests, travelDate } = req.body;

    const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const requestedSeats = guests || 1;
    const availableSeats = destination.capacity - destination.seatsBooked;

    if (requestedSeats > availableSeats) {
      return res.status(409).json({
        error: 'Not enough seats available',
        availableSeats,
        requestedSeats,
      });
    }

    const totalPrice = destination.price * requestedSeats;

    // MOCK STRIPE intent returned
    res.json({ client_secret: 'mock_secret_123', totalPrice, availableSeats });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Confirm booking — atomically checks & decrements capacity
router.post('/confirm', async (req, res) => {
  try {
    const { destinationId, guests, travelDate } = req.body;
    const requestedSeats = guests || 1;

    // Use a transaction to safely check & decrement in one atomic operation
    const result = await prisma.$transaction(async (tx) => {
      const destination = await tx.destination.findUnique({
        where: { id: destinationId },
      });

      if (!destination) {
        throw { status: 404, message: 'Destination not found' };
      }

      const availableSeats = destination.capacity - destination.seatsBooked;
      if (requestedSeats > availableSeats) {
        throw {
          status: 409,
          message: 'Not enough seats available',
          availableSeats,
          requestedSeats,
        };
      }

      // Decrement seatsBooked
      await tx.destination.update({
        where: { id: destinationId },
        data: { seatsBooked: { increment: requestedSeats } },
      });

      // Create booking
      const booking = await tx.booking.create({
        data: {
          userId: req.user.id,
          destinationId,
          travelDate: new Date(travelDate),
          guests: requestedSeats,
          totalPrice: destination.price * requestedSeats,
          status: 'confirmed',
        },
        include: { destination: true },
      });

      return booking;
    });

    res.status(201).json({ booking: result });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message, ...error });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel booking — restores seats back to destination
router.patch('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.userId !== req.user.id && !['admin', 'omega'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }

    // Atomically cancel and restore seats
    const result = await prisma.$transaction(async (tx) => {
      await tx.destination.update({
        where: { id: booking.destinationId },
        data: { seatsBooked: { decrement: booking.guests } },
      });

      return tx.booking.update({
        where: { id },
        data: { status: 'cancelled' },
        include: { destination: true },
      });
    });

    res.json({ booking: result });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

