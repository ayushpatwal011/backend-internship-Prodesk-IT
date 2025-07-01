import Portfolio from '../models/portfolioModel.js';
import { fetchFromCoinGecko } from '../utils/coingecko.js';

//  POST /api/portfolio
export const addToPortfolio = async (req, res) => {
  try {
    const { coinId, amount, buyPrice } = req.body;
    const newCoin = await Portfolio.create({
      user: req.user._id,
      coinId,
      amount,
      buyPrice,
    });
    res.status(201).json({ success: true, message: "Coin added", data: newCoin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Add failed", error: error.message });
  }
};

//  GET /api/portfolio
export const getPortfolio = async (req, res) => {
  try {
    const coins = await Portfolio.find({ user: req.user._id });

    // Fetch current prices for all coins
    const coinIds = coins.map((coin) => coin.coinId).join(',');
    const marketData = await fetchFromCoinGecko('/coins/markets', {
      ids: coinIds,
    });

    const result = coins.map((coin) => {
      const marketCoin = marketData.find((m) => m.id === coin.coinId);
      const currentPrice = marketCoin?.current_price || 0;
      const totalValue = currentPrice * coin.amount;
      const profitLoss = totalValue - (coin.buyPrice * coin.amount);

      return {
        ...coin.toObject(),
        currentPrice,
        totalValue,
        profitLoss,
      };
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch portfolio", error: error.message });
  }
};

// DELETE /api/portfolio/:id
export const deleteFromPortfolio = async (req, res) => {
  try {
    const coin = await Portfolio.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Coin removed from portfolio' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete", error: error.message });
  }
};
