import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

//  Generic fetcher
export const fetchFromCoinGecko = async (endpoint, params = {}) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        vs_currency: 'usd',
        ...params,
      },
    });
    return data;
  } catch (error) {
    console.error(" CoinGecko API Error:", error.message);
    throw new Error('Failed to fetch data from CoinGecko');
  }
};
