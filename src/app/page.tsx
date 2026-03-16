"use client";

import { TrendingUp, Users, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn, getScoreColor } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const MOCK_TOP_STOCKS = [
  { ticker: "NVDA", name: "NVIDIA Corp.", composite: 92, financial: 88, politician: 96 },
  { ticker: "MSFT", name: "Microsoft Corp.", composite: 88, financial: 85, politician: 91 },
  { ticker: "AAPL", name: "Apple Inc.", composite: 84, financial: 78, politician: 90 },
  { ticker: "AMZN", name: "Amazon.com Inc.", composite: 81, financial: 72, politician: 89 },
  { ticker: "META", name: "Meta Platforms", composite: 79, financial: 82, politician: 76 },
];

const MOCK_RECENT_TRADES = [
  { politician: "Nancy Pelosi", ticker: "NVDA", type: "Purchase", amount: "$1,000,001 - $5,000,000", date: "2026-03-12" },
  { politician: "Tommy Tuberville", ticker: "XOM", type: "Purchase", amount: "$100,001 - $250,000", date: "2026-03-10" },
  { politician: "Josh Gottheimer", ticker: "MSFT", type: "Sale", amount: "$500,001 - $1,000,000", date: "2026-03-09" },
];

const MOCK_SECTOR_SENTIMENT = [
  { name: "Tech", score: 85 },
  { name: "Energy", score: 62 },
  { name: "Finance", score: 45 },
  { name: "Health", score: 71 },
  { name: "Retail", score: 38 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-100">Market Overview</h1>
        <p className="text-zinc-400 mt-2">Combined analysis of fundamentals and political sentiment.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Overall Sentiment" 
          value="Bullish" 
          change="+12.4%" 
          trend="up"
          icon={TrendingUp}
          description="Aggregated politician buy/sell ratio"
        />
        <StatCard 
          title="Active Filings" 
          value="142" 
          change="+8" 
          trend="up"
          icon={Users}
          description="New House/Senate reports this week"
        />
        <StatCard 
          title="Top Signal" 
          value="NVDA" 
          change="Strong Buy" 
          trend="up"
          icon={Target}
          description="Highest composite score"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Composite Scores */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Top Composite Scores</h2>
          <div className="space-y-4">
            {MOCK_TOP_STOCKS.map((stock) => (
              <div key={stock.ticker} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-emerald-500">
                    {stock.ticker}
                  </div>
                  <div>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-sm text-zinc-500">Score Breakdown: F:{stock.financial} P:{stock.politician}</div>
                  </div>
                </div>
                <div className={cn("text-xl font-bold px-3 py-1 rounded-md", getScoreColor(stock.composite))}>
                  {stock.composite}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Analysis Chart */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Sector Sentiment Analysis</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SECTOR_SENTIMENT}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {MOCK_SECTOR_SENTIMENT.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 70 ? '#10b981' : entry.score > 50 ? '#f59e0b' : '#3f3f46'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold">Significant Political Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Politician</th>
                <th className="px-6 py-4 font-medium">Ticker</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {MOCK_RECENT_TRADES.map((trade, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{trade.politician}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded text-xs font-bold">
                      {trade.ticker}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={cn(
                      "flex items-center gap-1",
                      trade.type === 'Purchase' ? "text-emerald-400" : "text-rose-400"
                    )}>
                      {trade.type === 'Purchase' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{trade.amount}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{trade.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon, description }: any) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Icon className="h-6 w-6 text-emerald-500" />
        </div>
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full",
          trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
        )}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className="text-xs text-zinc-500 mt-2">{description}</p>
      </div>
    </div>
  );
}
