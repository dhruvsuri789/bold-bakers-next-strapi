"use server";

import { getSearchRecipes } from "@/graphql/queries";

export async function getSearchData({
  authors,
  categories,
  courses,
}: {
  authors: string[] | null;
  categories: string[] | null;
  courses: string[] | null;
}) {
  const nonNullAuthors = authors || [];
  const nonNullCategories = categories || [];
  const nonNullCourses = courses || [];

  const data = await getSearchRecipes({
    nonNullAuthors,
    nonNullCategories,
    nonNullCourses,
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}
