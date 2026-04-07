import { NextResponse } from "next/server";
import { getSearchSuggestions } from "@/features/search/lib/get-search-suggestions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  return NextResponse.json({
    suggestions: getSearchSuggestions(query),
  });
}
