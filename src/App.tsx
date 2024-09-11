import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <TopBar />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
