"use client";

import { RecipeSearchQuery } from "@/graphql/types";
import RecipeItem from "./RecipeItem";
import { Skeleton } from "./ui/skeleton";
import { PAGE_SIZE } from "@/utils/constants";

// These now can be set without null options
// But I am leaving them in for now
interface SearchRecipesResultProps {
  status: string;
  fetchStatus: string;
  data: RecipeSearchQuery | undefined;
  error: Error | null;
}

function SearchRecipesResult({
  status,
  fetchStatus,
  data,
  error,
}: SearchRecipesResultProps) {
  /* useEffect(() => {
    if (data?.recipes_connection.nodes.length) {
      setRecipeResults(data.recipes_connection.nodes.length);
    }
  }, [data?.recipes_connection.nodes.length, setRecipeResults]);

  useEffect(() => {
    if (data?.recipes_connection.pageInfo.total) {
      setRecipeResultsTotal(data.recipes_connection.pageInfo.total);
    }
  }, [data?.recipes_connection.pageInfo.total, setRecipeResultsTotal]); */

  if (status === "pending") {
    if (fetchStatus === "fetching") {
      return <SkeletonRecipes />;
    }
  }

  // Add Error page for recipes
  if (error) {
    // handleReset();
    console.error("Search error:", error);
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-red-600 font-semibold text-xl">
          Error loading recipes
        </p>
        <p className="text-sm text-gray-600">
          Please try again or adjust your search criteria
        </p>
      </div>
    );
  }

  // Add Empty page for recipes
  if (!data || !data.recipes_connection.nodes.length) {
    // handleReset();
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="font-semibold text-xl">No recipes found</p>
        <p className="text-sm text-gray-600">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {data.recipes_connection.nodes.map((recipe) => {
          return <RecipeItem key={recipe.documentId} recipe={recipe} />;
        })}
      </div>
    );
  }
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
      {[...Array(PAGE_SIZE)].map((_, index) => {
        return <InnerSkeleton key={index} />;
      })}
    </div>
  );
}

SearchRecipesResult.Skeleton = SkeletonRecipes;

export default SearchRecipesResult;
