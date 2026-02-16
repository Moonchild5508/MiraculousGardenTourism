import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const TOKEN_EXPIRY = '7d';

function signToken(user) {
  return jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

// Register (users only)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'user',
    });
    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

// Login (user or admin by role)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = signToken(user);
    res.json({
      token,
      user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// Get current user (requires token)
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });
    res.json({ user: { id: String(user._id), name: user.name, email: user.email, role: user.role } });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
