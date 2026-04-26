const express = require('express');
const prisma = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Admin Route to add new destinations
router.post('/', authenticate, authorize('admin', 'omega'), async (req, res) => {
  try {
     let { name, country, code, description, image, price, category } = req.body;
     if(!image) image = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05'; // default abstract plane image
     const destination = await prisma.destination.create({
        data: { 
          name, 
          country, 
          code: code || name.slice(0,3).toUpperCase() + Math.floor(Math.random()*100), 
          description: description || `Premium flight directly to ${name}, ${country}. Experience unparalleled comfort and luxury.`, 
          image, 
          price: parseFloat(price), 
          category: category || 'Standard', 
          popular: true 
        }
     });
     res.status(201).json(destination);
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Failed to create destination' });
  }
});

// Get trending flights
router.get('/trending', async (req, res) => {
  try {
    const popular = await prisma.destination.findMany({
      where: { popular: true },
      take: 4
    });
    res.json(popular);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all destinations, or filter by category
router.get('/', async (req, res) => {
  try {
    const { category, popular } = req.query;
    
    let where = {};
    if (category) where.category = category;
    if (popular === 'true') where.popular = true;

    // Explicitly include capacity fields to ensure they are returned
    const destinations = await prisma.destination.findMany({ 
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific destination
router.get('/:id', async (req, res) => {
  try {
    const destination = await prisma.destination.findUnique({ where: { id: req.params.id } });
    if (!destination) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
// Delete a destination
router.delete('/:id', authenticate, authorize('admin', 'omega'), async (req, res) => {
  try {
    await prisma.destination.delete({ where: { id: req.params.id } });
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error or destination already booked' });
  }
});

module.exports = router;
