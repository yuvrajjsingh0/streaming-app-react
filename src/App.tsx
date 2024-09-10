import React from 'react';
import './App.css';
import KeyMetrics from './components/KeyMetrics';
import Charts from './components/Charts';
import RecentStreamsTable from './components/RecentStreamsTable';
import { DashboardProvider } from './context/DashboardContext';

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Streamify Dashboard</h1>
        <KeyMetrics />
        <Charts />
        <RecentStreamsTable />
      </div>
    </DashboardProvider>
  );
};

export default App;
