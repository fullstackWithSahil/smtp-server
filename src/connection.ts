import Redis from 'ioredis';

export const connection = new Redis({
  host: 'localhost', // 'localhost' because Docker is mapping the port to localhost
  port: 6379,        // Default Redis port
  maxRetriesPerRequest: null, // Required by BullMQ
  // Optional: if your Redis server requires authentication
  // password: 'your-redis-password'
});

connection.on('connect', () => {
  console.log('Connected to Redis');
});

connection.on('error', (err) => {
  console.error('Redis connection error:', err);
});