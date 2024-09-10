import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { useDashboardData } from '../context/DashboardContext';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const Charts: React.FC = () => {

  const { userGrowth, revenue, topSongs } = useDashboardData();

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Users',
        data: userGrowth?.totalUsers,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Active Users',
        data: userGrowth?.activeUsers,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  // Mock data for the Revenue Distribution Pie Chart
  const revenueData = {
    labels: ['Subscriptions', 'Ads'],
    datasets: [
      {
        data: [revenue?.subscriptions, revenue?.ads],
        backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)'],
      },
    ],
  };

  // Mock data for the Top 5 Streamed Songs Bar Chart
  const topSongsData = {
    labels: ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5'],
    datasets: [
      {
        label: 'Streams',
        data: topSongs?.map((song) => song.streams),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      {/* User Growth Line Chart */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="font-bold mb-4">User Growth (Last 12 Months)</h2>
        <Line data={userGrowthData} />
      </div>

      {/* Revenue Distribution Pie Chart */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="font-bold mb-4">Revenue Distribution</h2>
        <Pie data={revenueData} />
      </div>

      {/* Top 5 Streamed Songs Bar Chart */}
      <div className="md:col-span-2 bg-white p-6 shadow-md rounded-lg">
        <h2 className="font-bold mb-4">Top 5 Streamed Songs</h2>
        <Bar data={topSongsData} />
      </div>
    </div>
  );
};

export default Charts;
