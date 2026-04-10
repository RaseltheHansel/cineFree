import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on('connect', () => console.log('Connected to Redis'));  
redis.on('error', (err) => console.error('Redis error:', err));

// cache helper - wrap any TMDB call 
export const withCache = async <T> (key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> => {
    const cached = await redis.get(key);
    if (cached) {
        return JSON.parse(cached) as T;
    }
    const data = await fetcher();
    await redis.setex(key, ttlSeconds, JSON.stringify(data));
    return data;
};

export const invalidateCache = async (key: string) => {
    await redis.del(key);
    console.log(`Cache invalidated for key: ${key}`);
}
