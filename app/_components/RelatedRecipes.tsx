import { getRelatedRecipes } from "@/graphql/queries";
import RecipeItem from "./RecipeItem";
import { Skeleton } from "./ui/skeleton";

interface RelatedRecipesProps {
  categories: {
    name: string;
  }[];
  recipeID: string;
}

async function RelatedRecipes({ categories, recipeID }: RelatedRecipesProps) {
  const { recipes } = await getRelatedRecipes(
    categories.map((category) => category.name)
  );

  //Dont show the recipe itself
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.documentId !== recipeID
  );

  if (filteredRecipes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col py-12 gap-6 items-center">
      <h2 className="text-3xl font-bold self-start">Explore similar recipes</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-8 w-full">
        {filteredRecipes.map((recipe) => {
          return <RecipeItem key={recipe.documentId} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

function RelatedRecipesSkeleton() {
  return (
    <div className="flex flex-col py-12 gap-6 items-center">
      <h2 className="text-3xl font-bold self-start">Explore similar recipes</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-8 w-full">
        {[...Array(5)].map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-2 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[3/4] relative rounded-3xl overflow-hidden border border-red-200">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-full rounded-3xl" />
                <Skeleton className="h-10 w-[50%] rounded-3xl" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

RelatedRecipes.Skeleton = RelatedRecipesSkeleton;

export default RelatedRecipes;
