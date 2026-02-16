import { Router } from 'express';
import { Review } from '../models/Review.js';
import { authUser } from '../middleware/auth.js';

const router = Router();

// List reviews (public, optionally filter by park)
router.get('/', async (req, res) => {
  try {
    const park = req.query.park;
    const filter = park && ['garden', 'butterfly'].includes(park) ? { park } : {};
    const reviews = await Review.find(filter)
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

// Create review (authenticated)
router.post('/', authUser, async (req, res) => {
  try {
    const { park, rating, comment } = req.body;
    if (!park || rating == null || !comment?.trim()) {
      return res.status(400).json({ error: 'park, rating and comment are required' });
    }
    if (!['garden', 'butterfly'].includes(park)) {
      return res.status(400).json({ error: 'Invalid park' });
    }
    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    const review = await Review.create({
      user: req.user._id,
      park,
      rating: numRating,
      comment: comment.trim(),
    });
    const populated = await Review.findById(review._id).populate('user', 'name email').lean();
    res.status(201).json({
      review: {
        id: populated._id,
        park: populated.park,
        rating: populated.rating,
        comment: populated.comment,
        name: populated.user?.name,
        email: populated.user?.email,
        date: populated.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to submit review' });
  }
});

export default router;
