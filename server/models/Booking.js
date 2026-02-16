import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  park: { type: String, enum: ['garden', 'butterfly'], required: true },
  ticketType: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1, max: 20 },
  visitDate: { type: Date, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);
