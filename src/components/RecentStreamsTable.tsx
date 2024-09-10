import React, { useState } from 'react';

interface StreamData {
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}

// Mock data for the table
const mockStreamData: StreamData[] = [
  { songName: 'Song 1', artist: 'Artist 1', dateStreamed: '2024-09-01', streamCount: 500, userId: 'User1' },
  { songName: 'Song 2', artist: 'Artist 2', dateStreamed: '2024-09-02', streamCount: 350, userId: 'User2' },
  { songName: 'Song 3', artist: 'Artist 3', dateStreamed: '2024-09-03', streamCount: 250, userId: 'User3' },
  { songName: 'Song 4', artist: 'Artist 4', dateStreamed: '2024-09-04', streamCount: 400, userId: 'User4' },
  { songName: 'Song 5', artist: 'Artist 5', dateStreamed: '2024-09-05', streamCount: 450, userId: 'User5' },
];

const RecentStreamsTable: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof StreamData) => {
    const sortedData = [...mockStreamData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    return sortedData;
  };

  const filteredData = mockStreamData.filter((stream) =>
    stream.songName.toLowerCase().includes(filter.toLowerCase()) || stream.artist.toLowerCase().includes(filter.toLowerCase())
  );

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
          {filteredData.map((stream, index) => (
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
