import React from 'react';
import KeyMetrics from './KeyMetrics';
import Charts from './Charts';
import RecentStreamsTable from './RecentStreamsTable';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Streamify Analytics Dashboard</h1>
      <KeyMetrics />
      <Charts />
      <RecentStreamsTable />
    </div>
  );
};

export default Dashboard;
