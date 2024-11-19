import { getFilters } from "@/graphql/queries";
import SearchRecipes from "./SearchRecipes";
import { Skeleton } from "./ui/skeleton";

async function SearchRecipesParent() {
  const filters = await getFilters();

  return <SearchRecipes filters={filters} />;
}

function SkeletonSearchRecipesParent() {
  return (
    <div className="grid grid-cols-[300px,1fr] gap-8">
      <div className="border-slate-200 border rounded-xl flex flex-col gap-4 p-6 divide-y-2">
        <Skeleton className="h-10 w-full rounded-xl" />
        <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-[60px] rounded-xl" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
            <span className="font-bold text-xl">Categories</span>
            <Skeleton className="h-10 w-[60px] rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            {[...Array(10)].map((_, index) => {
              return (
                <Skeleton key={index} className="h-10 w-full rounded-xl" />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
            <span className="font-bold text-xl">Authors</span>
            <Skeleton className="h-10 w-[60px] rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, index) => {
              return (
                <Skeleton key={index} className="h-10 w-full rounded-xl" />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
            <span className="font-bold text-xl">Courses</span>
            <Skeleton className="h-10 w-[60px] rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, index) => {
              return (
                <Skeleton key={index} className="h-10 w-full rounded-xl" />
              );
            })}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

SearchRecipesParent.Skeleton = SkeletonSearchRecipesParent;

export default SearchRecipesParent;
