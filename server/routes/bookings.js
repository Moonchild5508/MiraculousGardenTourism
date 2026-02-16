import { Router } from 'express';
import { Booking } from '../models/Booking.js';
import { authUser } from '../middleware/auth.js';

const router = Router();

// All booking routes require user auth
router.use(authUser);

// List my bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ visitDate: 1, createdAt: -1 })
      .lean();
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch bookings' });
  }
});

// Create booking
router.post('/', async (req, res) => {
  try {
    const { park, ticketType, quantity, visitDate, price } = req.body;
    if (!park || !ticketType || quantity == null || !visitDate || price == null) {
      return res.status(400).json({
        error: 'park, ticketType, quantity, visitDate and price are required',
      });
    }
    if (!['garden', 'butterfly'].includes(park)) {
      return res.status(400).json({ error: 'Invalid park' });
    }
    const numQty = Number(quantity);
    if (numQty < 1 || numQty > 20) {
      return res.status(400).json({ error: 'Quantity must be between 1 and 20' });
    }
    const booking = await Booking.create({
      user: req.user._id,
      park,
      ticketType,
      quantity: numQty,
      visitDate: new Date(visitDate),
      price: Number(price),
    });
    res.status(201).json({
      booking: {
        id: booking._id,
        park: booking.park,
        ticketType: booking.ticketType,
        quantity: booking.quantity,
        visitDate: booking.visitDate,
        price: booking.price,
        createdAt: booking.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Booking failed' });
  }
});

export default router;
