import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const Charts: React.FC = () => {
  // Mock data for the User Growth Line Chart
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Users',
        data: [1000, 1500, 1800, 2200, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Active Users',
        data: [800, 1200, 1500, 1800, 2000, 2300, 2600, 2800, 3200, 3400, 4000, 4500],
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
        data: [8000, 4000],
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
        data: [5000, 4200, 3800, 3600, 3400],
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
