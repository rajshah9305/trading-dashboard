"use client";

import React from 'react';

interface TradeData {
  id: number;
  timestamp: string;
  symbol: string;
  side: string; // 'buy' or 'sell'
  price: number;
  quantity: number;
  profit_loss: number;
}

interface Props {
  trades: TradeData[];
}

const TradeTable: React.FC<Props> = ({ trades }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  if (!trades || trades.length === 0) {
    return <p className="text-gray-400 text-center py-8">No trades to display.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-750">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Timestamp
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Symbol
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Side
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              P/L
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {trades.map((trade) => (
            <tr key={trade.id} className="hover:bg-gray-700 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(trade.timestamp)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{trade.symbol}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${trade.side.toLowerCase() === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                {trade.side.toUpperCase()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatCurrency(trade.price)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.quantity}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${trade.profit_loss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(trade.profit_loss)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeTable;