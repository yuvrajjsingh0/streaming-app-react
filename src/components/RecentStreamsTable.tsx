import React, { useState } from 'react';
import { Stream, useDashboardData } from '../context/DashboardContext';


const RecentStreamsTable: React.FC = () => {

  const { streams } = useDashboardData();

  const [filter, setFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Stream) => {
    const sortedData = [...streams!].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    return sortedData;
  };
  console.log("streams", streams)
  const filteredData = streams?.filter((stream) =>
    stream.songName.toLowerCase().includes(filter.toLowerCase()) || stream.artist.toLowerCase().includes(filter.toLowerCase())
  );

  if (!streams || streams.length === 0) {
    return <div>No streams available</div>;
  }


  return (
    <div className="bg-white p-6 shadow-md rounded-lg my-8">
      <h2 className="font-bold mb-4">Recent Streams</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by song or artist..."
          className="border p-2 w-full rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="cursor-pointer" onClick={() => handleSort('songName')}>Song Name</th>
            <th className="cursor-pointer" onClick={() => handleSort('artist')}>Artist</th>
            <th className="cursor-pointer" onClick={() => handleSort('dateStreamed')}>Date Streamed</th>
            <th className="cursor-pointer" onClick={() => handleSort('streamCount')}>Stream Count</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredData!.map((stream, index) => (
            <tr key={index} className="border-t">
              <td>{stream.songName}</td>
              <td>{stream.artist}</td>
              <td>{stream.dateStreamed}</td>
              <td>{stream.streamCount}</td>
              <td>{stream.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentStreamsTable;
