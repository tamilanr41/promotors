import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "site-content.json");
const TMP_FILE_PATH = path.join(os.tmpdir(), "aaa-site-content.json");

// Persistent warm in-memory cache across serverless function invocations
let memoryStore: Record<string, any> | null = null;
let lastModifiedServer: number = Date.now();

function getInitialData(): Record<string, any> {
  if (memoryStore) {
    return memoryStore;
  }

  // 1. Try reading from /tmp (writable in serverless Lambda/Netlify)
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const fileData = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      if (parsed && typeof parsed === "object") {
        memoryStore = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read from /tmp cache:", err);
  }

  // 2. Try reading bundled seed data
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      if (parsed && typeof parsed === "object") {
        memoryStore = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read bundled site-content.json:", err);
  }

  // 3. Fallback defaults
  const defaults = {
    projects: [],
    upcoming: [],
    offers: [],
    testimonials: [],
    leads: [],
    settings: {
      companyName: "AAA Promoterz & Builders",
      email: "admin@aaapromoterz.com",
      phone: "+91 91767 83332",
      address: "No. 12, Gandhi Road, Near New Bus Stand, Arakkonam - 631001",
      website: "https://aaapromoterz.com",
    },
  };
  memoryStore = defaults;
  return defaults;
}

function saveData(data: Record<string, any>): boolean {
  memoryStore = data;
  lastModifiedServer = Date.now();
  let success = false;

  // 1. Always write to /tmp (100% writable in Netlify / AWS Lambda)
  try {
    fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    success = true;
  } catch (tmpErr) {
    console.warn("Error writing to /tmp site-content:", tmpErr);
  }

  // 2. Also try writing to project root if filesystem allows (e.g. local dev, Node server)
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    success = true;
  } catch {
    // Read-only filesystem in serverless, expected and handled by /tmp & memoryStore
  }

  return success;
}

export async function GET(req: NextRequest) {
  try {
    const data = getInitialData();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type && data[type]) {
      return NextResponse.json({
        success: true,
        data: data[type],
        updatedAt: lastModifiedServer,
      });
    }

    return NextResponse.json({
      success: true,
      data,
      updatedAt: lastModifiedServer,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = getInitialData();

    if (body.type && body.data !== undefined) {
      current[body.type] = body.data;
      saveData(current);
      return NextResponse.json({
        success: true,
        message: `${body.type} updated successfully`,
        data: current[body.type],
        updatedAt: lastModifiedServer,
      });
    }

    // Full replacement / bulk update
    if (
      body.projects ||
      body.upcoming ||
      body.offers ||
      body.testimonials ||
      body.leads ||
      body.settings
    ) {
      const merged = { ...current, ...body };
      saveData(merged);
      return NextResponse.json({
        success: true,
        message: "Site content updated successfully",
        data: merged,
        updatedAt: lastModifiedServer,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  } catch (err) {
    console.error("Content POST error:", err);
    return NextResponse.json({ success: false, error: "Failed to save content" }, { status: 500 });
  }
}
