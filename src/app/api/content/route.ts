import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "site-content.json");

function getInitialData() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading site-content.json:", err);
  }

  // Fallback defaults if file doesn't exist
  return {
    projects: [],
    upcoming: [],
    offers: [],
    testimonials: [],
  };
}

function saveData(data: any) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing site-content.json:", err);
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = getInitialData();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type && data[type]) {
      return NextResponse.json({ success: true, data: data[type] });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = getInitialData();

    if (body.type && body.data) {
      current[body.type] = body.data;
      saveData(current);
      return NextResponse.json({ success: true, message: `${body.type} updated successfully`, data: current[body.type] });
    }

    // Full replacement
    if (body.projects || body.upcoming || body.offers || body.testimonials) {
      const merged = { ...current, ...body };
      saveData(merged);
      return NextResponse.json({ success: true, message: "Site content updated successfully", data: merged });
    }

    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  } catch (err) {
    console.error("Content POST error:", err);
    return NextResponse.json({ success: false, error: "Failed to save content" }, { status: 500 });
  }
}
