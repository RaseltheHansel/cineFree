import type { NextFunction, Request, Response } from 'express';
import { redis } from '../config/redis';

type KeyBuilder = (req: Request) => string;

const defaultKeyBuilder: KeyBuilder = (req) =>
  `cache:${req.method}:${req.originalUrl}`;

export const cacheMiddleware = (
  ttlSeconds: number,
  keyBuilder: KeyBuilder = defaultKeyBuilder
) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = keyBuilder(req);

    try {
      const cached = await redis.get(key);
      if (cached) {
        res.set('X-Cache', 'HIT');
        return res.json(JSON.parse(cached));
      }

      const originalJson = res.json.bind(res);
      res.json = ((body: unknown) => {
        res.set('X-Cache', 'MISS');
        redis
          .setex(key, ttlSeconds, JSON.stringify(body))
          .catch((err) => console.error('Cache set error:', err));
        return originalJson(body);
      }) as Response['json'];

      return next();
    } catch (err) {
      console.error('Cache middleware error:', err);
      return next();
    }
  };

export default cacheMiddleware;
