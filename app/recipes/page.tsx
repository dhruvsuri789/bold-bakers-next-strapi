import { Suspense } from "react";
import SearchRecipesParent from "../_components/SearchRecipesParent";

async function RecipesPage() {
  return (
    <main>
      <div className="max-w-[600px] mx-auto flex flex-col items-center py-24 gap-8">
        <h1 className="text-center text-4xl font-bold">
          Find all the best recipes in{" "}
          <span className="text-red-600">one single place</span>
        </h1>
      </div>
      <Suspense fallback={<SearchRecipesParent.Skeleton />}>
        <SearchRecipesParent />
      </Suspense>
    </main>
  );
}

export default RecipesPage;
