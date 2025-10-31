import { NextResponse } from "next/server";
import { createClient } from "redis";

export const runtime = "nodejs";

const VISITOR_KEY = "hibiki:visitor-count";

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
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

export async function GET() {
  try {
    const client = await getRedisClient();
    const value = await client.get(VISITOR_KEY);
    const count = value ? Number.parseInt(value, 10) || 0 : 0;
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
