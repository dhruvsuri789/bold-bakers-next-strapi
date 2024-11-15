import { HomepageRecipeQuery } from "@/graphql/types";
import ButtonLink from "./ButtonLink";
import RecipeItem from "./RecipeItem";

interface HomepageRecipeListProps {
  section: HomepageRecipeQuery;
}

function HomepageRecipeList({ section }: HomepageRecipeListProps) {
  const { heading, ctaNonNullable, recipes } = section;

  return (
    <div className="flex flex-col py-12 gap-6 items-center">
      <h2 className="text-3xl font-bold self-start">{heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-8 w-full">
        {recipes.map((recipe) => {
          return <RecipeItem key={recipe.documentId} recipe={recipe} />;
        })}
      </div>

      {ctaNonNullable && (
        <ButtonLink varient="primary" href={ctaNonNullable}>
          See all recipes
        </ButtonLink>
      )}
    </div>
  );
}

export default HomepageRecipeList;
