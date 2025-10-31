import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type VisitorData = {
  count: number;
};

const DATA_FILE = path.join(process.cwd(), "data", "visitor-count.json");

async function readCount(): Promise<VisitorData> {
  try {
    const file = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(file) as VisitorData;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { count: 0 };
    }
    throw error;
  }
}

async function writeCount(data: VisitorData) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const data = await readCount();
    return NextResponse.json({ count: data.count });
  } catch (error) {
    console.error("Failed to read visitor count", error);
    return NextResponse.json({ error: "Failed to fetch visitor count" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const data = await readCount();
    const nextCount = data.count + 1;
    await writeCount({ count: nextCount });
    return NextResponse.json({ count: nextCount });
  } catch (error) {
    console.error("Failed to update visitor count", error);
    return NextResponse.json({ error: "Failed to update visitor count" }, { status: 500 });
  }
}
