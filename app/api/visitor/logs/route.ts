import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

export const runtime = "nodejs";

const VISITOR_LOG_KEY = "hibiki:visitor-log";
const MAX_RETURNED_LOGS = 200;

type VisitorLogEntry = {
  timestamp: string;
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  userAgent?: string;
  referer?: string;
};

export async function GET(request: NextRequest) {
  const providedPassword =
    request.headers.get("x-dashboard-key") ?? request.nextUrl.searchParams.get("password") ?? "";
  const expectedPassword = process.env.VISITOR_DASHBOARD_PASSWORD;

  if (!expectedPassword || providedPassword !== expectedPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await getRedisClient();
    const rawLogs = await client.lRange(VISITOR_LOG_KEY, 0, MAX_RETURNED_LOGS - 1);
    const entries: VisitorLogEntry[] = rawLogs
      .map((entry) => {
        try {
          return JSON.parse(entry) as VisitorLogEntry;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is VisitorLogEntry => entry !== null);

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Failed to fetch visitor logs", error);
    return NextResponse.json({ error: "Failed to fetch visitor logs" }, { status: 500 });
  }
}
