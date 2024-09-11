import React, { createContext, useContext, useEffect, useState } from 'react';

// Define types for the data structures
export interface Metrics {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

export interface UserGrowth {
  totalUsers: number[];
  activeUsers: number[];
}

export interface Revenue {
  subscriptions: number;
  ads: number;
}

export interface TopSong {
  name: string;
  streams: number;
}

export interface Stream {
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}

export interface DashboardContextType {
  metrics: Metrics | null;
  userGrowth: UserGrowth | null;
  revenue: Revenue | null;
  topSongs: TopSong[] | null;
  streams: Stream[] | null;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Custom hook to use the DashboardContext
export const useDashboardData = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardData must be used within a DashboardProvider');
  }
  return context;
};

// Provider component that fetches and provides data
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [userGrowth, setUserGrowth] = useState<UserGrowth | null>(null);
  const [revenue, setRevenue] = useState<Revenue | null>(null);
  const [topSongs, setTopSongs] = useState<TopSong[] | null>(null);
  const [streams, setStreams] = useState<Stream[] | null>(null);

  useEffect(() => {
    // Fetch metrics
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((data) => setMetrics(data));

    // Fetch user growth data
    fetch('/api/user-growth')
      .then((res) => res.json())
      .then((data) => setUserGrowth(data));

    // Fetch revenue data
    fetch('/api/revenue')
      .then((res) => res.json())
      .then((data) => setRevenue(data));

    // Fetch top songs data
    fetch('/api/top-songs')
      .then((res) => res.json())
      .then((data) => setTopSongs(data.songs));

    // Fetch recent streams data
    fetch('/api/streams')
      .then((res) => {
        console.log("STRAMS");
        return res.json()
      })
      .then((data) => {
        console.log("STREAMS", data)
        setStreams(data.streams)
      });
  }, []);

  return (
    <DashboardContext.Provider
      value={{ metrics, userGrowth, revenue, topSongs, streams }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
