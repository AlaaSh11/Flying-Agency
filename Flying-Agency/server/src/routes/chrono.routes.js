const express = require('express');
const prisma = require('../config/db');

const router = express.Router();

router.get('/destinations', async (req, res) => {
  try {
    const destinations = await prisma.chronoTravel.findMany();
    // Check if empty, maybe seed a few temporarily for testing if missing
    if (destinations.length === 0) {
      return res.json([
        { id: '1', name: 'Roaring Twenties', era: '1920s', year: 1925, location: 'New York City, USA', description: 'Experience the jazz age.', image: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17', temporalRisk: 'Low' },
        { id: '2', name: 'Renaissance Florence', era: '15th Century', year: 1450, location: 'Florence, Italy', description: 'Witness the rebirth of art.', image: 'https://images.unsplash.com/photo-1549429505-189f31ab244a', temporalRisk: 'Medium' }
      ]);
    }
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
