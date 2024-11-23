import { getSearchRecipes } from "@/graphql/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { author, category, course, name, sortBy, page } = await req.json();
  const data = await getSearchRecipes({
    author,
    category,
    course,
    name,
    sortBy,
    page,
  });

  if (!data) {
    throw new Error("No data");
  }

  return NextResponse.json({ data });
}
