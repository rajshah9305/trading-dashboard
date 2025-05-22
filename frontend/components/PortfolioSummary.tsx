"use client";

import React from 'react';

interface PortfolioData {
  total_value: number;
  cash_balance: number;
  profit_loss: number;
}

interface Props {
  portfolio: PortfolioData;
}

const PortfolioSummary: React.FC<Props> = ({ portfolio }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="bg-gray-700 p-4 rounded-md text-center">
        <h3 className="text-sm font-medium text-gray-400 mb-1">Total Portfolio Value</h3>
        <p className="text-3xl font-bold text-green-400">{formatCurrency(portfolio.total_value)}</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-md text-center">
        <h3 className="text-sm font-medium text-gray-400 mb-1">Cash Balance</h3>
        <p className="text-3xl font-bold text-blue-400">{formatCurrency(portfolio.cash_balance)}</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-md text-center">
        <h3 className="text-sm font-medium text-gray-400 mb-1">Overall Profit/Loss</h3>
        <p className={`text-3xl font-bold ${portfolio.profit_loss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {formatCurrency(portfolio.profit_loss)}
        </p>
      </div>
    </div>
  );
};

export default PortfolioSummary;