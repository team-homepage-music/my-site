import { NextResponse } from "next/server";
import { createClient, RedisClientType } from "redis";

export const runtime = "nodejs";

const VISITOR_KEY = "hibiki:visitor-count";

type RedisClient = RedisClientType<Record<string, never>, Record<string, never>>;

let redisClient: RedisClient | null = null;

async function getRedisClient(): Promise<RedisClient> {
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL environment variable is not configured.");
  }

  if (!redisClient) {
    const url = process.env.REDIS_URL.startsWith("redis://")
      ? process.env.REDIS_URL.replace("redis://", "rediss://")
      : process.env.REDIS_URL;
    const client = createClient({
      url,
      socket: {
        tls: true,
      },
    });
    client.on("error", (error) => {
      console.error("Redis client error", error);
    });
    await client.connect();
    redisClient = client;
  }

  return redisClient;
}

export async function GET() {
  try {
    const client = await getRedisClient();
    const storedCount = await client.get(VISITOR_KEY);
    const count = storedCount ? Number.parseInt(storedCount, 10) || 0 : 0;
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Failed to read visitor count", error);
    return NextResponse.json({ error: "Failed to fetch visitor count" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const client = await getRedisClient();
    const count = await client.incr(VISITOR_KEY);
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Failed to update visitor count", error);
    return NextResponse.json({ error: "Failed to update visitor count" }, { status: 500 });
  }
}
