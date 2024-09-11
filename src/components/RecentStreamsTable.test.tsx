import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecentStreamsTable from './RecentStreamsTable';
import { DashboardContext, DashboardProvider } from '../context/DashboardContext';

const mockStreams = [
  {
    songName: 'Song A',
    artist: 'Artist A',
    dateStreamed: '2024-09-01',
    streamCount: 100,
    userId: 'user123',
  },
  {
    songName: 'Song B',
    artist: 'Artist B',
    dateStreamed: '2024-09-02',
    streamCount: 50,
    userId: 'user124',
  },
  {
    songName: 'Song C',
    artist: 'Artist C',
    dateStreamed: '2024-09-03',
    streamCount: 150,
    userId: 'user125',
  },
];

const renderComponent = () =>
  render(
    <DashboardContext.Provider value={{ streams: mockStreams, metrics: null, userGrowth: null, topSongs: null, revenue: null }}>
      <RecentStreamsTable />
    </DashboardContext.Provider>
  );

describe('RecentStreamsTable Component', () => {
  test('renders the table with correct headers', () => {
    renderComponent();
    expect(screen.getByText('Song Name')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
  });

  test('displays data rows correctly', () => {
    renderComponent();
    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.getByText('Artist A')).toBeInTheDocument();
  });

  test('sorts data by stream count ascending and descending when header is clicked', () => {
    renderComponent();
    const streamCountHeader = screen.getByText('Stream Count');

    // Initial sort by ascending order
    fireEvent.click(streamCountHeader);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Song B'); // 50 streams
    expect(rows[2]).toHaveTextContent('Song A'); // 100 streams
    expect(rows[3]).toHaveTextContent('Song C'); // 150 streams

    // Toggle to descending order
    fireEvent.click(streamCountHeader);
    expect(rows[1]).toHaveTextContent('Song C'); // 150 streams
    expect(rows[2]).toHaveTextContent('Song A'); // 100 streams
    expect(rows[3]).toHaveTextContent('Song B'); // 50 streams
  });

  
  
});
