
import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  foodType: {
    type: String,
    enum: ['Veg', 'Non-Veg', 'Both'],
    required: true,
  },
  image: {
    data: Buffer, 
    contentType: String, 
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  usedBy: {
    type: Date,
    default: null, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donor', donorSchema);