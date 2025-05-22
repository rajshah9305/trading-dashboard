"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  name: string; // Typically time or date
  profit: number;
}

interface Props {
  data: ChartDataPoint[];
}

const ProfitChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-400 text-center py-8">No profit data available to display chart.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" /> {/* Darker grid for dark theme */}
        <XAxis dataKey="name" stroke="#A0AEC0" /> {/* Lighter text for dark theme */}
        <YAxis stroke="#A0AEC0" /> {/* Lighter text for dark theme */}
        <Tooltip
          contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }} // Dark tooltip
          itemStyle={{ color: '#E2E8F0' }} // Lighter text in tooltip
        />
        <Legend wrapperStyle={{ color: '#E2E8F0' }} /> {/* Lighter legend text */}
        <Line type="monotone" dataKey="profit" stroke="#48BB78" activeDot={{ r: 8 }} strokeWidth={2} /> {/* Green line for profit */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfitChart;