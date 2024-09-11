import React, { useState } from 'react';
import { Stream, useDashboardData } from '../context/DashboardContext';
import { FiSettings } from 'react-icons/fi'; // For settings icon
import { Popover } from '@headlessui/react'; // Import Popover from Headless UI
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // Import icons for sorting indicators

const RecentStreamsTable: React.FC = () => {
  const { streams } = useDashboardData();

  const [filter, setFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<keyof Stream>('songName');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'songName',
    'artist',
    'dateStreamed',
    'streamCount',
    'userId',
  ]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSort = (field: keyof Stream) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleColumnChange = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const sortedData = [...(streams || [])].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const filteredData = sortedData.filter(
    (stream) =>
      stream.songName.toLowerCase().includes(filter.toLowerCase()) ||
      stream.artist.toLowerCase().includes(filter.toLowerCase())
  );

  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const paginatedData = filteredData.slice(startRow, endRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  if (!streams || streams.length === 0) {
    return <div className="text-center py-4">No streams available</div>;
  }

  const renderSortIcon = (field: keyof Stream) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ? (
        <FaSortUp className="inline-block ml-1" />
      ) : (
        <FaSortDown className="inline-block ml-1" />
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow my-8">
      <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center justify-between">
        Recent Streams
        <Popover className="relative">
          <Popover.Button className="bg-gray-200 dark:bg-gray-600 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700">
            <FiSettings className="text-gray-700 dark:text-white" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 w-48 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-xs max-h-64 overflow-auto right-0">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Select Columns</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center text-gray-800 dark:text-white">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes('songName')}
                  onChange={() => handleColumnChange('songName')}
                  className="mr-2"
                />
                Song Name
              </label>
              <label className="flex items-center text-gray-800 dark:text-white">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes('artist')}
                  onChange={() => handleColumnChange('artist')}
                  className="mr-2"
                />
                Artist
              </label>
              <label className="flex items-center text-gray-800 dark:text-white">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes('dateStreamed')}
                  onChange={() => handleColumnChange('dateStreamed')}
                  className="mr-2"
                />
                Date Streamed
              </label>
              <label className="flex items-center text-gray-800 dark:text-white">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes('streamCount')}
                  onChange={() => handleColumnChange('streamCount')}
                  className="mr-2"
                />
                Stream Count
              </label>
              <label className="flex items-center text-gray-800 dark:text-white">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes('userId')}
                  onChange={() => handleColumnChange('userId')}
                  className="mr-2"
                />
                User ID
              </label>
            </div>
          </Popover.Panel>
        </Popover>
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by song or artist..."
          className="border p-2 rounded w-full md:w-1/2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value as keyof Stream)}
          className="border p-2 rounded w-full md:w-1/2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="songName">Sort by Song Name</option>
          <option value="artist">Sort by Artist</option>
          <option value="dateStreamed">Sort by Date Streamed</option>
          <option value="streamCount">Sort by Stream Count</option>
          <option value="userId">Sort by User ID</option>
        </select>

        <select
          value={rowsPerPage}
          name='pagination_select'
          onChange={handleRowsPerPageChange}
          className="border p-2 rounded w-full md:w-1/2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value={5}>5 rows per page</option>
          <option value={10}>10 rows per page</option>
          <option value={15}>15 rows per page</option>
        </select>
      </div>

      {/* Wrap the table in an overflow-x-auto container to allow horizontal scrolling on smaller screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
              {selectedColumns.includes('songName') && (
                <th
                  className="py-2 px-4 cursor-pointer"
                  onClick={() => handleSort('songName')}
                >
                  Song Name {renderSortIcon('songName')}
                </th>
              )}
              {selectedColumns.includes('artist') && (
                <th
                  className="py-2 px-4 cursor-pointer"
                  onClick={() => handleSort('artist')}
                >
                  Artist {renderSortIcon('artist')}
                </th>
              )}
              {selectedColumns.includes('dateStreamed') && (
                <th
                  className="py-2 px-4 cursor-pointer"
                  onClick={() => handleSort('dateStreamed')}
                >
                  Date Streamed {renderSortIcon('dateStreamed')}
                </th>
              )}
              {selectedColumns.includes('streamCount') && (
                <th
                  className="py-2 px-4 cursor-pointer"
                  onClick={() => handleSort('streamCount')}
                >
                  Stream Count {renderSortIcon('streamCount')}
                </th>
              )}
              {selectedColumns.includes('userId') && (
                <th className="py-2 px-4 cursor-pointer">
                  User ID {renderSortIcon('userId')}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((stream, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {selectedColumns.includes('songName') && (
                  <td className="py-2 px-4 text-gray-700 dark:text-white">
                    {stream.songName}
                  </td>
                )}
                {selectedColumns.includes('artist') && (
                  <td className="py-2 px-4 text-gray-700 dark:text-white">
                    {stream.artist}
                  </td>
                )}
                {selectedColumns.includes('dateStreamed') && (
                  <td className="py-2 px-4 text-gray-700 dark:text-white">
                    {stream.dateStreamed}
                  </td>
                )}
                {selectedColumns.includes('streamCount') && (
                  <td className="py-2 px-4 text-gray-700 dark:text-white">
                    {stream.streamCount}
                  </td>
                )}
                {selectedColumns.includes('userId') && (
                  <td className="py-2 px-4 text-gray-700 dark:text-white">
                    {stream.userId}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-900 dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentStreamsTable;
