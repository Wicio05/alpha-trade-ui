import axios from 'axios';
import { StockRanking, Transaction, Stock } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const StockService = {
  getRankings: async (params?: { limit?: number; min_financial_score?: number; min_politician_score?: number }) => {
    const response = await api.get<StockRanking[]>('/rankings/composite/', { params });
    return response.data;
  },

  getStockAnalysis: async (ticker: string) => {
    const response = await api.get<Stock>(`/rankings/stock/${ticker}/`);
    return response.data;
  },

  getRecentTransactions: async (limit: number = 10) => {
    // This endpoint might be different depending on DRF setup
    const response = await api.get<Transaction[]>('/rankings/transactions/', { params: { limit } });
    return response.data;
  }
};

export default api;
