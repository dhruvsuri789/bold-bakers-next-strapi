"use client";

import { getSearchData } from "@/app/actions/actions";
import { useQuery } from "@tanstack/react-query";
import RecipeItem from "./RecipeItem";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";

interface SearchRecipesResultProps {
  category: string[] | null;
  author: string[] | null;
  course: string[] | null;
  sortBy: string | null;
  name: string | null;
  setRecipeSearch: (count: number) => void;
}

function SearchRecipesResult({
  category,
  author,
  course,
  sortBy,
  name,
  setRecipeSearch,
}: SearchRecipesResultProps) {
  const { isPending, error, data } = useQuery({
    queryKey: ["recipesData", author, category, course, sortBy, name],
    queryFn: async () => {
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 2000);
      // });
      // console.log({ author, category, course, name, sortBy });
      return await getSearchData({ author, category, course, name, sortBy });
    },
  });

  useEffect(() => {
    if (data?.recipes?.length) {
      setRecipeSearch(data.recipes.length);
    }
  }, [data?.recipes?.length, setRecipeSearch]);

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
      {data.recipes.map((recipe) => {
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
