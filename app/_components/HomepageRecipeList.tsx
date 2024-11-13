import { HomepageRecipeQuery } from "@/graphql/types";
import ButtonLink from "./ButtonLink";
import Image from "next/image";
import { BASE_URL } from "@/utils/constants";
import Link from "next/link";

interface HomepageRecipeListProps {
  section: HomepageRecipeQuery;
}

type Recipe = {
  name: string;
  documentId: string;
  image: {
    url: string;
    width: number;
    name: string;
    height: number;
  };
};

function RecipeItem({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      className="flex flex-col gap-2 group"
      href={`/recipe/${recipe.documentId}`}
    >
      <div className="aspect-[3/4] relative rounded-3xl overflow-hidden group-hover:shadow-md transition-shadow border border-red-200">
        <Image
          fill
          className="object-cover"
          src={`${BASE_URL}${recipe.image.url}`}
          alt={recipe.name}
        />
      </div>
      <p className="text-sm px-4 font-medium group-hover:text-slate-700 transition-colors">
        {recipe.name}
      </p>
    </Link>
  );
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
