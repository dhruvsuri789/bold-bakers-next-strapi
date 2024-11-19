"use client";

import { getSearchData } from "@/app/actions/actions";
import { useQuery } from "@tanstack/react-query";
import RecipeItem from "./RecipeItem";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";

// These now can be set without null options
// But I am leaving them in for now
interface SearchRecipesResultProps {
  category: string[] | null;
  author: string[] | null;
  course: string[] | null;
  sortBy: string | null;
  name: string | null;
  page: number | null;
  setRecipeResults: (count: number) => void;
  setRecipeResultsTotal: (count: number) => void;
}

function SearchRecipesResult({
  category,
  author,
  course,
  sortBy,
  name,
  page,
  setRecipeResults,
  setRecipeResultsTotal,
}: SearchRecipesResultProps) {
  const { isPending, error, data } = useQuery({
    queryKey: ["recipesData", author, category, course, sortBy, name, page],
    queryFn: async () => {
      console.log({
        author,
        category,
        course,
        sortBy,
        name,
        page,
      });
      return await getSearchData({
        author,
        category,
        course,
        name,
        sortBy,
        page,
      });
    },
  });

  useEffect(() => {
    if (data?.recipes_connection.nodes.length) {
      setRecipeResults(data.recipes_connection.nodes.length);
    }
  }, [data?.recipes_connection.nodes.length, setRecipeResults]);

  useEffect(() => {
    if (data?.recipes_connection.pageInfo.total) {
      setRecipeResultsTotal(data.recipes_connection.pageInfo.total);
    }
  }, [data?.recipes_connection.pageInfo.total, setRecipeResultsTotal]);

  if (isPending) {
    return <SkeletonRecipes />;
  }

  // TODO Add Error page for recipes
  if (error) {
    return null;
  }

  // TODO Add Empty page for recipes
  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
      {data?.recipes_connection.nodes.map((recipe) => {
        return <RecipeItem key={recipe.documentId} recipe={recipe} />;
      })}
    </div>
  );
}

function InnerSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-[3/4] rounded-3xl" />
      <div className="space-y-2 pr-8">
        <Skeleton className="h-10 w-full rounded-3xl" />
      </div>
    </div>
  );
}

function SkeletonRecipes() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 w-full">
      {[...Array(12)].map((_, index) => {
        return <InnerSkeleton key={index} />;
      })}
    </div>
  );
}

SearchRecipesResult.Skeleton = SkeletonRecipes;

export default SearchRecipesResult;
