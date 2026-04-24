const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const prisma = require('../config/db');

const router = express.Router();

router.use(authenticate);

router.get('/me/dashboard', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { destination: true },
      orderBy: { createdAt: 'desc' }
    });
    
    // Calculate simple stats
    const upcoming = bookings.filter(b => b.status === 'confirmed');

    res.json({
      user: {
        fullName: user.fullName,
        email: user.email,
        tier: user.tier,
        role: user.role,
        miles: 45200, // mock miles
        bookingsCount: bookings.length
      },
      bookings,
      upcoming,
      exportData: bookings
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
