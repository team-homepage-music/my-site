import { createClient } from "redis";

type RedisClient = ReturnType<typeof createClient>;

let redisClient: RedisClient | null = null;

export async function getRedisClient(): Promise<RedisClient> {
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL environment variable is not configured.");
  }

  if (redisClient) {
    return redisClient;
  }

  const url = new URL(process.env.REDIS_URL);
  const useTls = url.protocol === "rediss:";

  redisClient = createClient(
    useTls
      ? {
          url: url.toString(),
          socket: {
            tls: true,
          },
        }
      : {
          url: url.toString(),
        },
  );

  redisClient.on("error", (error) => {
    console.error("Redis client error", error);
  });

  await redisClient.connect();

  return redisClient;
}
