"use client";

import { getSearchData } from "@/app/actions/actions";
import { useQuery } from "@tanstack/react-query";
import RecipeItem from "./RecipeItem";
import { Skeleton } from "./ui/skeleton";
import { memo, useEffect } from "react";

interface SearchRecipesResultProps {
  category: string[];
  author: string[];
  course: string[];
  sortBy: string;
  name: string;
  page: number;
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
    throwOnError: true,
  });

  useEffect(() => {
    if (data?.recipes_connection) {
      setRecipeResults(data.recipes_connection.nodes.length);
      setRecipeResultsTotal(data.recipes_connection.pageInfo.total);
    }
  }, [data?.recipes_connection, setRecipeResults, setRecipeResultsTotal]);

  if (isPending) {
    console.log("isPending");
    return <SkeletonRecipes />;
  }

  // TODO Add Error page for recipes
  if (error) {
    return <p>{error.message}</p>;
  }

  // TODO Add Empty page for recipes
  if (!data) {
    return <p>Empty page</p>;
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

export default memo(SearchRecipesResult);
