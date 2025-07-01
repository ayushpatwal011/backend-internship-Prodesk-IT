import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coinId: {
      type: String,
      required: true, 
    },
    amount: {
      type: Number,
      required: true,
    },
    buyPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
