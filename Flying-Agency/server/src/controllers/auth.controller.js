const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, comparePassword } = require('../utils/hash.util');
const { signToken } = require('../utils/jwt.util');

const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const ADMIN_EMAILS = ['adam@ctrlelite.com', 'alaa', 'asmaa', 'laura', 'majd'];
    const isAdmin = ADMIN_EMAILS.some(adminStr => email.toLowerCase().includes(adminStr));
    
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName,
        role: isAdmin ? 'admin' : 'user',
        tier: isAdmin ? 'tier_omega' : 'basic'
      },
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role, tier: user.tier });
    res.status(201).json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role, tier: user.tier } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role, tier: user.tier });
    res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role, tier: user.tier } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role, tier: user.tier } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login, getMe };
