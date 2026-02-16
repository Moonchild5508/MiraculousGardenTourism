import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connect.js';
import authRoutes from './routes/auth.js';
import bookingsRoutes from './routes/bookings.js';
import reviewsRoutes from './routes/reviews.js';
import adminRoutes from './routes/admin.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start:', err.message);
    process.exit(1);
  }
}

start();
