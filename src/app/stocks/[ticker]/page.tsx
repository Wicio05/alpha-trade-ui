"use client";

import { use } from "react";
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Info, 
  BarChart3, 
  Calendar,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { cn, getScoreColor, formatCurrency } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const MOCK_PRICE_DATA = [
  { date: "2025-09", price: 420, sentiment: 65 },
  { date: "2025-10", price: 445, sentiment: 68 },
  { date: "2025-11", price: 430, sentiment: 72 },
  { date: "2025-12", price: 480, sentiment: 85 },
  { date: "2026-01", price: 510, sentiment: 82 },
  { date: "2026-02", price: 590, sentiment: 94 },
  { date: "2026-03", price: 615, sentiment: 92 },
];

const MOCK_METRICS = [
  { label: "P/E Ratio", value: "32.4", status: "High" },
  { label: "Forward P/E", value: "28.1", status: "Good" },
  { label: "ROE", value: "45.2%", status: "Strong" },
  { label: "Rev Growth", value: "18.5%", status: "Strong" },
  { label: "Profit Margin", value: "24.1%", status: "Good" },
  { label: "Debt/Equity", value: "0.42", status: "Healthy" },
];

export default function StockAnalysisPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = use(params);

  return (
    <div className="space-y-8">
      <Link 
        href="/rankings" 
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Rankings
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-3xl font-bold text-emerald-500">
            {ticker}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-zinc-100">NVIDIA Corporation</h1>
            <div className="flex items-center gap-4 mt-2 text-zinc-400">
              <span className="flex items-center gap-1"><Info className="h-4 w-4" /> Technology</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Last Updated: Mar 16, 2026</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <ScoreCard label="Composite" score={92} />
          <ScoreCard label="Fundamental" score={88} />
          <ScoreCard label="Political" score={96} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-500" />
                Price Performance vs. Sentiment
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-zinc-800 rounded text-xs font-medium">1M</button>
                <button className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded text-xs font-medium">6M</button>
                <button className="px-3 py-1 bg-zinc-800 rounded text-xs font-medium">1Y</button>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_PRICE_DATA}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Analysis Summary
            </h2>
            <div className="prose prose-invert max-w-none text-zinc-400">
              <p>
                {ticker} shows an exceptionally strong composite score of 92, driven primarily by heavy political insider buying 
                over the last 90 days. Multiple members of the House Armed Services committee have disclosed purchases totaling 
                over $5M in the last quarter.
              </p>
              <p className="mt-4">
                Fundamentally, the company remains in the top decile of its sector with a ROE of 45.2% and consistent 
                revenue growth. While the P/E ratio is slightly elevated compared to historical averages, the forward-looking 
                ML model suggests significant upside potential based on current margin expansion trends.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Info Area */}
        <div className="space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Financial Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_METRICS.map((metric) => (
                <div key={metric.label} className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                  <div className="text-xs text-zinc-500">{metric.label}</div>
                  <div className="text-sm font-bold mt-1">{metric.value}</div>
                  <div className={cn(
                    "text-[10px] font-medium mt-1 uppercase",
                    metric.status === 'Strong' || metric.status === 'Healthy' ? "text-emerald-500" : "text-amber-500"
                  )}>
                    {metric.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-500" />
              Recent Political Trades
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-l-2 border-emerald-500 pl-4 py-1">
                  <div className="text-sm font-medium">Nancy Pelosi (House)</div>
                  <div className="text-xs text-zinc-500 mt-1">Purchase: $1,000,001 - $5,000,000</div>
                  <div className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">Mar 12, 2026</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors">
              View All 14 Trades
            </button>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2 text-emerald-500">ML Recommendation</h2>
            <p className="text-sm text-emerald-500/80 leading-relaxed">
              Based on historical correlations between politician cluster buying and fundamental health, 
              this stock has a 78% probability of outperforming the S&P 500 over the next 6 months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, score }: { label: string, score: number }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 min-w-[120px] text-center">
      <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</div>
      <div className={cn("text-3xl font-bold mt-1", getScoreColor(score))}>
        {score}
      </div>
    </div>
  );
}
