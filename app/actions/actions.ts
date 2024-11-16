"use server";

import { getSearchRecipes } from "@/graphql/queries";

export async function getSearchData({
  author,
  category,
  course,
}: {
  author: string[];
  category: string[];
  course: string[];
}) {
  const data = await getSearchRecipes({
    author,
    category,
    course,
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}
