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
  author: string[] | null;
  category: string[] | null;
  course: string[] | null;
  name: string | null;
  sortBy: string | null;
  page: number | null;
}) {
  const nonNullAuthors = author?.length ? author : [];
  const nonNullCategories = category?.length ? category : [];
  const nonNullCourses = course?.length ? course : [];
  const nonNullName = name || "";
  const nonNullSortBy = sortBy || "";
  const nonNullPage = page || 1;

  const data = await getSearchRecipes({
    nonNullAuthors,
    nonNullCategories,
    nonNullCourses,
    nonNullName,
    nonNullSortBy,
    nonNullPage,
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}
