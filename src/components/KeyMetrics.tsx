import React from 'react';
import { useDashboardData } from '../context/DashboardContext';

interface MetricCardProps {
  title: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-2xl mt-2">{value}</p>
    </div>
  );
};

const KeyMetrics: React.FC = () => {
  const { metrics } = useDashboardData();

  if (!metrics) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <MetricCard title="Total Users" value={metrics.totalUsers} />
      <MetricCard title="Active Users" value={metrics.activeUsers} />
      <MetricCard title="Total Streams" value={metrics.totalStreams} />
      <MetricCard title="Revenue" value={metrics.revenue} />
    </div>
  );
};

export default KeyMetrics;
