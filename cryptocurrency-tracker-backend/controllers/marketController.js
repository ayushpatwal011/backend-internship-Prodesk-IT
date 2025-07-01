import { fetchFromCoinGecko } from '../utils/coingecko.js';

//  @route GET /api/market/trending
export const getTrendingCoins = async (req, res) => {
  try {
    const data = await fetchFromCoinGecko('/search/trending');
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  @route GET /api/market/top
export const getTopCoins = async (req, res) => {
  try {
    const data = await fetchFromCoinGecko('/coins/markets', {
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route GET /api/market/coin/:id
export const getCoinDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromCoinGecko(`/coins/${id}`);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  @route GET /api/market/chart/:id
export const getCoinChart = async (req, res) => {
  try {
    const { id } = req.params;
    const { days } = req.query; // like 1, 7, 30
    const data = await fetchFromCoinGecko(`/coins/${id}/market_chart`, {
      days: days || 7,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//  @route GET /api/market/news
export const getCryptoNews = async (req, res) => {
  try {
    const data = await fetchFromCoinGecko('/global');
    res.status(200).json({ success: true, data: data.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch news', error: error.message });
  }
};
