import { Router } from 'express';
import { Booking } from '../models/Booking.js';
import { Review } from '../models/Review.js';
import { authAdmin } from '../middleware/auth.js';

const router = Router();
router.use(authAdmin);

// List all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ visitDate: -1, createdAt: -1 })
      .lean();
    const list = bookings.map((b) => ({
      id: b._id,
      park: b.park,
      ticketType: b.ticketType,
      quantity: b.quantity,
      visitDate: b.visitDate,
      price: b.price,
      email: b.user?.email,
      name: b.user?.name,
      createdAt: b.createdAt,
    }));
    res.json({ bookings: list });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch bookings' });
  }
});

// List all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .lean();
    const list = reviews.map((r) => ({
      id: r._id,
      park: r.park,
      rating: r.rating,
      comment: r.comment,
      name: r.user?.name,
      email: r.user?.email,
      date: r.createdAt,
    }));
    res.json({ reviews: list });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch reviews' });
  }
});

router.delete('/reviews/:id', async (req, res) => {
  try {
    const r = await Review.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ error: 'Review not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete review' });
  }
});

export default router;
