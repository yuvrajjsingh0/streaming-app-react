import React from 'react';

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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <MetricCard title="Total Users" value="2M" />
      <MetricCard title="Active Users" value="1.5M" />
      <MetricCard title="Total Streams" value="45M" />
      <MetricCard title="Revenue" value="$12M" />
    </div>
  );
};

export default KeyMetrics;
