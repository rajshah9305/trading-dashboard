"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PortfolioSummary from '@/components/PortfolioSummary';
import ProfitChart from '@/components/ProfitChart';
import TradeTable from '@/components/TradeTable';

interface TradeData {
  id: number;
  timestamp: string;
  symbol: string;
  side: string;
  price: number;
  quantity: number;
  profit_loss: number;
}

interface PortfolioData {
  total_value: number;
  cash_balance: number;
  profit_loss: number;
}

const API_BASE_URL = 'http://localhost:8000'; // Backend API URL

export default function DashboardPage() {
  const [trades, setTrades] = useState<TradeData[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [tradesResponse, portfolioResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/trades/`),
          axios.get(`${API_BASE_URL}/portfolio/`)
        ]);

        setTrades(tradesResponse.data);
        setPortfolio(portfolioResponse.data);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Optional: Set up polling for real-time updates
    // const intervalId = setInterval(fetchData, 30000); // Fetch every 30 seconds
    // return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-xl">Loading Dashboard Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-2xl font-semibold mb-2">Error</p>
        <p className="text-lg">{error}</p>
        <p className="mt-4 text-sm text-gray-400">
          Make sure your backend server is running at <code className="bg-gray-700 p-1 rounded">{API_BASE_URL}</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-400">AI Trading Dashboard</h1>
      </header>

      {portfolio && (
        <section className="mb-8">
          <PortfolioSummary portfolio={portfolio} />
        </section>
      )}

      <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Profit/Loss Over Time</h2>
          {/* Assuming trades data can be used for a simple profit chart */}
          <ProfitChart data={trades.map(t => ({ name: new Date(t.timestamp).toLocaleTimeString(), profit: t.profit_loss }))} />
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Recent Activity</h2>
          {/* Placeholder for recent activity or alerts */}
          <div className="text-gray-400">
            <p>- Bot executed a trade: BUY BTC/USDT at $40,000</p>
            <p>- AI model re-trained successfully.</p>
            <p>- Market volatility alert: ETH/USDT showing high fluctuations.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Recent Trades</h2>
        <TradeTable trades={trades} />
      </section>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI Trading Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}
