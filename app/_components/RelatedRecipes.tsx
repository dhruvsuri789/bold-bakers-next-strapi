import { getRelatedRecipes } from "@/graphql/queries";
import RecipeItem from "./RecipeItem";

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

export default RelatedRecipes;
