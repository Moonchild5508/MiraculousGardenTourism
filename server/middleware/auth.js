import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export function authUser(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    User.findById(decoded.userId)
      .then((user) => {
        if (!user) return res.status(401).json({ error: 'User not found' });
        req.user = user;
        next();
      })
      .catch(() => res.status(401).json({ error: 'Invalid token' }));
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function authAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Admin authentication required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    User.findById(decoded.userId)
      .then((user) => {
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ error: 'Admin access required' });
        }
        req.user = user;
        next();
      })
      .catch(() => res.status(401).json({ error: 'Invalid token' }));
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function optionalAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    User.findById(decoded.userId)
      .then((user) => {
        req.user = user || null;
        next();
      })
      .catch(() => next());
  } catch {
    next();
  }
}
