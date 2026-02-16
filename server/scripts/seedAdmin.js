/**
 * Run once to create first admin: node scripts/seedAdmin.js
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in .env or pass as env vars.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from '../models/User.js';

const uri = process.env.MONGODB_URI;
const email = process.env.ADMIN_EMAIL || 'admin@miraclegarden.com';
const password = process.env.ADMIN_PASSWORD || 'admin123';

async function seed() {
  if (!uri) {
    console.error('Set MONGODB_URI in .env');
    process.exit(1);
  }
  await mongoose.connect(uri);
  const existing = await User.findOne({ role: 'admin' });
  if (existing) {
    console.log('Admin already exists:', existing.email);
    process.exit(0);
  }
  await User.create({ name: 'Admin', email, password, role: 'admin' });
  console.log('Admin created:', email, '(change password after first login)');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
