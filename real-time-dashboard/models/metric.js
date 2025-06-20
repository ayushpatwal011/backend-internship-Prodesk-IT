import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const Metric = mongoose.model('Metric', metricSchema);

