export interface Stock {
  ticker: string;
  company_name: string;
  sector: string;
  industry: string;
}

export interface StockRanking {
  ticker: string;
  company_name: string;
  financial_score: number;
  politician_score: number;
  composite_score: number;
  date: string;
}

export interface Transaction {
  id: number;
  ticker: string;
  politician_name: string;
  transaction_type: 'Purchase' | 'Sale' | 'Exchange';
  amount_range: string;
  transaction_date: string;
  filing_date: string;
  chamber: 'House' | 'Senate';
}

export interface MarketSentiment {
  overall: number; // -100 to 100
  trend: 'up' | 'down' | 'neutral';
  top_sectors: string[];
}
