"use server";

import { getSearchRecipes } from "@/graphql/queries";

export async function getSearchData({
  author,
  category,
  course,
}: {
  author: string[] | null;
  category: string[] | null;
  course: string[] | null;
}) {
  const nonNullAuthors = author?.length ? author : [];
  const nonNullCategories = category?.length ? category : [];
  const nonNullCourses = course?.length ? course : [];

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
