import { fetchFromCoinGecko } from '../utils/coingecko.js';

// ✅ @route GET /api/compare?coins=bitcoin,ethereum
export const compareCoins = async (req, res) => {
  try {
    const { coins } = req.query;

    if (!coins) {
      return res.status(400).json({ success: false, message: 'Please provide coin IDs to compare' });
    }

    const coinIds = coins.split(','); // ['bitcoin', 'ethereum']

    const data = await fetchFromCoinGecko('/coins/markets', {
      ids: coinIds.join(','),
    });

    // Format data
    const result = data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      circulating_supply: coin.circulating_supply,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    }));

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Comparison failed', error: error.message });
  }
};
