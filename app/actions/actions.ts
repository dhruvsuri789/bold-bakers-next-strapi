"use server";

import { getSearchRecipes } from "@/graphql/queries";

export async function getSearchData({
  author,
  category,
  course,
  name,
}: {
  author: string[] | null;
  category: string[] | null;
  course: string[] | null;
  name: string | null;
}) {
  const nonNullAuthors = author?.length ? author : [];
  const nonNullCategories = category?.length ? category : [];
  const nonNullCourses = course?.length ? course : [];
  const nonNullName = name || "";

  const data = await getSearchRecipes({
    nonNullAuthors,
    nonNullCategories,
    nonNullCourses,
    nonNullName,
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}
