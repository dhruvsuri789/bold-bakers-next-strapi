import { getSearchRecipes } from "@/graphql/queries";
import { RecipesPageProps } from "../recipes/page";
import RecipeItem from "./RecipeItem";
import { Skeleton } from "./ui/skeleton";

async function SearchRecipesResult({ searchParams }: RecipesPageProps) {
  const {
    author: authors,
    category: categories,
    course: courses,
  } = searchParams;

  const author = Array.isArray(authors) ? authors.split(",") : [];
  const category = Array.isArray(categories) ? categories.split(",") : [];
  const course = Array.isArray(courses) ? courses.split(",") : [];

  const data = await getSearchRecipes({ author, category, course });

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
