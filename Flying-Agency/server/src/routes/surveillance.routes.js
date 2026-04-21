const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const prisma = new PrismaClient();

const router = express.Router();

router.use(authenticate);

// Get stats
router.get('/stats', authorize('elite', 'omega', 'admin'), async (req, res) => {
  res.json({
    monitored: 14802,
    alerts: 3,
    accuracy: 99.7,
    status: 'LIVE'
  });
});

// Get surveillance alerts (only elite and omega can view)
router.get('/alerts', authorize('elite', 'omega', 'admin'), async (req, res) => {
  try {
    const alerts = await prisma.surveillanceAlert.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Run a scan (simulated action)
router.post('/scan', authorize('elite', 'omega', 'admin'), async (req, res) => {
  try {
    const newAlert = await prisma.surveillanceAlert.create({
      data: {
        userId: req.user.id,
        targetName: 'Unknown Node #X992',
        riskLevel: 'Medium',
        status: 'active',
        location: 'Sector 7, Neo Tokyo',
      }
    });
    res.json({ message: 'Scan complete', alert: newAlert });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
