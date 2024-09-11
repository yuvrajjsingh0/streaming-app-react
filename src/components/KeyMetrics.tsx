import React from 'react';
import { useDashboardData } from '../context/DashboardContext';

interface MetricCardProps {
  title: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow flex flex-col items-center justify-center">
      <h3 className="text-sm font-semibold">{title}</h3>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard title="Total Users" value={metrics.totalUsers} />
      <MetricCard title="Active Users" value={metrics.activeUsers} />
      <MetricCard title="Total Streams" value={metrics.totalStreams} />
      <MetricCard title="Revenue" value={metrics.revenue} />
    </div>
  );
};

export default KeyMetrics;
