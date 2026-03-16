"use client";

import { useState } from "react";
import { Search, Filter, ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { cn, getScoreColor } from "@/lib/utils";
import Link from "next/link";

const MOCK_RANKINGS = [
  { ticker: "NVDA", name: "NVIDIA Corp.", composite: 92, financial: 88, politician: 96, sector: "Technology" },
  { ticker: "MSFT", name: "Microsoft Corp.", composite: 88, financial: 85, politician: 91, sector: "Technology" },
  { ticker: "AAPL", name: "Apple Inc.", composite: 84, financial: 78, politician: 90, sector: "Technology" },
  { ticker: "AMZN", name: "Amazon.com Inc.", composite: 81, financial: 72, politician: 89, sector: "Consumer Cyclical" },
  { ticker: "META", name: "Meta Platforms", composite: 79, financial: 82, politician: 76, sector: "Communication Services" },
  { ticker: "GOOGL", name: "Alphabet Inc.", composite: 77, financial: 80, politician: 74, sector: "Communication Services" },
  { ticker: "TSLA", name: "Tesla, Inc.", composite: 72, financial: 65, politician: 79, sector: "Consumer Cyclical" },
  { ticker: "JPM", name: "JPMorgan Chase", composite: 68, financial: 75, politician: 61, sector: "Financial Services" },
  { ticker: "V", name: "Visa Inc.", composite: 65, financial: 70, politician: 60, sector: "Financial Services" },
  { ticker: "XOM", name: "Exxon Mobil", composite: 62, financial: 58, politician: 66, sector: "Energy" },
];

export default function RankingsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRankings = MOCK_RANKINGS.filter(r => 
    r.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Stock Rankings</h1>
          <p className="text-zinc-400 mt-2">Global leaderboard based on Alpha Trade composite scoring.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search ticker or company..." 
              className="bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium text-center">Composite</th>
                <th className="px-6 py-4 font-medium text-center">Fundamental</th>
                <th className="px-6 py-4 font-medium text-center">Political</th>
                <th className="px-6 py-4 font-medium">Sector</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredRankings.map((stock, idx) => (
                <tr key={stock.ticker} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-500">#{idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center font-bold text-xs">
                        {stock.ticker}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-100">{stock.name}</div>
                        <div className="text-xs text-zinc-500">{stock.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn("inline-block w-12 py-1 rounded text-sm font-bold", getScoreColor(stock.composite))}>
                      {stock.composite}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium">{stock.financial}</span>
                      <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500" 
                          style={{ width: `${stock.financial}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium">{stock.politician}</span>
                      <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500" 
                          style={{ width: `${stock.politician}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {stock.sector}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/stocks/${stock.ticker}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      Analyze
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
