const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth.middleware');
const prisma = new PrismaClient();

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

// Create intent (Mock Stripe)
router.post('/create-intent', async (req, res) => {
  try {
    const { destinationId, guests, travelDate } = req.body;
    
    const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const totalPrice = destination.price * (guests || 1);

    // MOCK STRIPE intent returned
    res.json({ client_secret: 'mock_secret_123', totalPrice });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Confirm booking
router.post('/confirm', async (req, res) => {
  try {
    const { destinationId, guests, travelDate } = req.body;
    
    const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
    if (!destination) {
       return res.status(404).json({ error: 'Destination not found' });
    }
    
    const totalPrice = destination.price * (guests || 1);

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        destinationId,
        travelDate: new Date(travelDate),
        guests,
        totalPrice,
        status: 'confirmed',
      },
    });

    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
