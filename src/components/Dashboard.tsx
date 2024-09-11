import React from 'react';
import KeyMetrics from './KeyMetrics';
import Charts from './Charts';
import RecentStreamsTable from './RecentStreamsTable';
import { DashboardProvider } from '../context/DashboardContext';

const Dashboard: React.FC = () => {
  return (
    <DashboardProvider> 
      <div className="container mx-auto p-4 h-100 overflow-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Streamify Dashboard</h1>
        <KeyMetrics />
        <Charts />
        <RecentStreamsTable />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
