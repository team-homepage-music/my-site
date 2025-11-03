import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

export const runtime = "nodejs";

const VISITOR_KEY = "hibiki:visitor-count";

export async function GET() {
  try {
    const client = await getRedisClient();
    const value = await client.get(VISITOR_KEY);
    const count = value ? Number.parseInt(value, 10) || 0 : 0;
    return NextResponse.json({ count });
  } catch (error) {
    console.error("来訪者数の取得に失敗しました", error);
    return NextResponse.json({ error: "来訪者数の取得に失敗しました" }, { status: 500 });
  }
}

const VISITOR_LOG_KEY = "hibiki:visitor-log";
const MAX_LOG_LENGTH = 500;

function parseClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-client-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const client = await getRedisClient();
    const count = await client.incr(VISITOR_KEY);

    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: parseClientIp(request),
      country: request.headers.get("x-vercel-ip-country") ?? "unknown",
      region: request.headers.get("x-vercel-ip-country-region") ?? "unknown",
      city: request.headers.get("x-vercel-ip-city") ?? "unknown",
      userAgent: request.headers.get("user-agent") ?? "unknown",
      referer: request.headers.get("referer") ?? "unknown",
    };

    await client.lPush(VISITOR_LOG_KEY, JSON.stringify(logEntry));
    await client.lTrim(VISITOR_LOG_KEY, 0, MAX_LOG_LENGTH - 1);

    return NextResponse.json({ count });
  } catch (error) {
    console.error("来訪者数の更新に失敗しました", error);
    return NextResponse.json({ error: "来訪者数の更新に失敗しました" }, { status: 500 });
  }
}
