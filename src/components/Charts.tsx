import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement, LineOptions, ChartOptions } from 'chart.js';
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
        tension: 0.4, // Curvy lines
        pointHitRadius: 20, // Increase the hit radius for tooltips
      },
      {
        label: 'Active Users',
        data: userGrowth?.activeUsers,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.4, // Curvy lines
        pointHitRadius: 20, // Increase the hit radius for tooltips
      },
    ],
  };

  const userGrowthOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Hides vertical grid lines
        },
      },
      y: {
        grid: {
          display: false, // Hides horizontal grid lines
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        mode: 'index', // Display tooltips for all data points on the vertical line
        intersect: false, // Allows the tooltip to appear when hovering near the line
        position: 'nearest', // Shows the tooltip near the pointer
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    elements: {
      line: {
        borderJoinStyle: 'round' as const, // Correct type for borderJoinStyle
      },
    },
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
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 my-8">
      {/* User Growth Line Chart */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow h-96 pb-12">
          <h2 className="font-bold mb-4">User Growth (Last 12 Months)</h2>
          <Line data={userGrowthData} options={userGrowthOptions} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-8'>
        {/* Top 5 Streamed Songs Bar Chart */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="font-bold mb-4">Top 5 Streamed Songs</h2>
          <Bar data={topSongsData} />

          {/* Top 5 Songs Table */}
          <div className="mt-6">
            <table className="min-w-full bg-transparent">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-4">Song Name</th>
                  <th className="py-2 px-4">Streams</th>
                </tr>
              </thead>
              <tbody>
                {topSongs?.map((song, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="py-2 px-4">{song.name}</td>
                    <td className="py-2 px-4">{song.streams}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Revenue Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="font-bold mb-4">Revenue Distribution</h2>
          <Pie data={revenueData} />
        </div>
      </div>
      

      
    </div>
  );
};

export default Charts;
