import { NextResponse } from "next/server";
import { getProvider } from "../../../lib/db/provider";

export const revalidate = 0; // Prevent caching so we get live data

export async function GET() {
  try {
    const provider = getProvider();
    const toys = await provider.getAllToys();
    return NextResponse.json({ ok: true, toys });
  } catch (error) {
    console.error("GET /api/toys error:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const provider = getProvider();
    
    // In a real app, validate the body here
    const newToy = await provider.addToy(body.toy);
    return NextResponse.json({ ok: true, toy: newToy });
  } catch (error) {
    console.error("POST /api/toys error:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
