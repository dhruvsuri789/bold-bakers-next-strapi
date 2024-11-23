"use server";

import { getSearchRecipes } from "@/graphql/queries";

export async function getSearchData({
  author,
  category,
  course,
  name,
  sortBy,
  page,
}: {
  author: string[];
  category: string[];
  course: string[];
  name: string;
  sortBy: string;
  page: number;
}) {
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

  return { data };
}
