import Redis from 'ioredis';

// @ts-ignore
const redis = new Redis(process.env.REDIS_URL);

export default redis;
