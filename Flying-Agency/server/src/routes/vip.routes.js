const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/status', (req, res) => {
  if (req.user.tier === 'tier_omega') {
    res.json({ status: 'granted' });
  } else {
    res.status(403).json({ error: 'Access Denied: Omega Tier Required' });
  }
});

router.post('/request', (req, res) => {
  if (req.user.tier !== 'tier_omega') {
    return res.status(403).json({ error: 'Access Denied: Omega Tier Required' });
  }
  // Mocking the request execution
  res.json({ message: 'Secure VIP Request Initiated successfully', requestId: `REQ-${Date.now()}` });
});

module.exports = router;
