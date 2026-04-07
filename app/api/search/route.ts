import { NextResponse } from "next/server";
import { searchContent } from "@/features/search/lib/search-content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const results = query ? searchContent(query) : [];

  return NextResponse.json({
    query,
    count: results.length,
    results,
  });
}
