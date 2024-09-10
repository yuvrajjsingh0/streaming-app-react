import { createServer, Model, Factory } from 'miragejs';

export function makeServer() {
  return createServer({
    models: {
      metric: Model,
      userGrowth: Model,
      revenue: Model,
      song: Model,
      stream: Model,
    },

    factories: {
      metric: Factory.extend({
        totalUsers: () => Math.floor(Math.random() * 10000),
        activeUsers: () => Math.floor(Math.random() * 3000),
        totalStreams: () => Math.floor(Math.random() * 500000),
        revenue: () => parseFloat((Math.random() * 10000).toFixed(2)),
        topArtist: () => 'Artist ' + Math.floor(Math.random() * 100),
      }),

      userGrowth: Factory.extend({
        totalUsers: () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000)),
        activeUsers: () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 3000)),
      }),

      revenue: Factory.extend({
        subscriptions: () => parseFloat((Math.random() * 7000).toFixed(2)),
        ads: () => parseFloat((Math.random() * 3000).toFixed(2)),
      }),

      song: Factory.extend({
        name: (i) => `Song ${i + 1}`,
        streams: () => Math.floor(Math.random() * 100000),
      }),

      stream: Factory.extend({
        songName: (i) => `Song ${i + 1}`,
        artist: () => 'Artist ' + Math.floor(Math.random() * 100),
        dateStreamed: () => new Date().toISOString().split('T')[0],
        streamCount: () => Math.floor(Math.random() * 1000),
        userId: () => `User-${Math.floor(Math.random() * 10000)}`,
      }),
    },

    seeds(server) {
      server.create('metric');
      server.create('userGrowth');
      server.create('revenue');
      server.createList('song', 5);
      server.createList('stream', 20);
    },

    routes() {
      this.namespace = 'api';

      this.get('/metrics', (schema) => {
        return schema.db.metrics[0];
      });

      this.get('/user-growth', (schema) => {
        return schema.db.userGrowths[0];
      });

      this.get('/revenue', (schema) => {
        return schema.db.revenues[0];
      });

      this.get('/top-songs', (schema) => {
        return { songs: schema.db.songs };
      });

      this.get('/streams', (schema) => {
        return { streams: schema.db.streams };
      });
    },
  });
}
