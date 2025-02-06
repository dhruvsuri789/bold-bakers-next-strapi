/* eslint-disable @typescript-eslint/no-unused-vars */
import AboutSmallAndFeatured from "@/app/_components/AboutSmallAndFeatured";
import ButtonLink from "@/app/_components/ButtonLink";
import RecipeImageComponent from "@/app/_components/RecipeImageComponent";
import RelatedRecipes from "@/app/_components/RelatedRecipes";
import { getRecipe, getRecipesIds } from "@/graphql/queries";
// import { BASE_URL } from "@/utils/constants";
// import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RecipePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const { recipes } = await getRecipesIds();

  if (recipes.length === 0) {
    return [];
  }

  return recipes.map((recipe) => ({
    id: recipe.documentId,
  }));
}

async function RecipePage({ params }: RecipePageProps) {
  const { recipes } = await getRecipe(params.id);

  if (recipes.length === 0) {
    return notFound();
  }

  const {
    documentId,
    name,
    description,
    prepTime,
    cookTime,
    restTime,
    settingTime,
    servings,
    calories,
    image,
    video,
    categories,
    courses,
    ingredients,
    instructions,
    recipeNotes,
    videoId,
    author,
    createdAt,
    updatedAt,
    publishedAt,
  } = recipes[0];

  const categoriesLength = categories.length;
  const coursesLength = courses.length;
  const totalTime =
    (prepTime ?? 0) + (cookTime ?? 0) + (restTime ?? 0) + (settingTime ?? 0);

  const stats = [
    { label: "Prep time", value: prepTime, unit: "time" },
    { label: "Cook time", value: cookTime, unit: "time" },
    { label: "Rest time", value: restTime, unit: "time" },
    { label: "Setting time", value: settingTime, unit: "time" },
    { label: "Total time", value: totalTime, unit: "time" },
    { label: "Servings", value: servings, unit: "servings" },
    { label: "Calories", value: calories, unit: "calories" },
  ];

  return (
    <main>
      <div className="flex flex-col gap-4 py-8">
        <div className="text-red-600 text-sm font-bold flex gap-4">
          {categories.map((category, index) => (
            <span className="flex gap-4" key={`${category.name}-${index}`}>
              <Link
                href={`/recipes?category=${encodeURIComponent(category.name)}`}
                className="hover:text-red-500 transition-colors"
              >
                {category.name}
              </Link>
              {index < categoriesLength - 1 && <span>•</span>}
            </span>
          ))}
        </div>
        <div className="grid lg:grid-cols-[2fr,auto] grid-cols-1 gap-8 justify-items-start">
          <div className="max-w-[600px] flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{name}</h1>
            <p>{description}</p>
            <span className="text-sm text-neutral-600">
              By{" "}
              {
                <Link
                  className="font-semibold text-red-600 hover:text-red-500 transition-colors"
                  href={`/recipes?author=${encodeURIComponent(author.name)}`}
                >
                  {author.name}
                </Link>
              }{" "}
              |{"  Published on "}
              {new Date(publishedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              |{" Updated on "}
              {new Date(updatedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 self-end">
            <ButtonLink varient="secondary" href="#ingredients">
              Jump to recipe
            </ButtonLink>
            <ButtonLink varient="primary" href="#video">
              Jump to video
            </ButtonLink>
          </div>
        </div>
        <div className="aspect-video relative rounded-3xl overflow-hidden mt-4">
          <RecipeImageComponent url={image.url} name={name} />
          {/* <Image
            fill
            className="object-cover"
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`}
            alt={name}
            placeholder="blur"
            blurDataURL=""
          /> */}
        </div>
        <div className="grid lg:grid-cols-[2.5fr,1fr] grid-cols-1 gap-8 mt-4">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold" id="stats">
                Stats
              </h2>
              <div className="flex flex-wrap gap-4 gap-y-8 divide-x-2">
                {stats.map((stat, index) => {
                  if (!stat.value) return null; // Skip if value is not present

                  const paddingClass = index === 0 ? "pr-4" : "pl-7 pr-4";

                  return (
                    <div key={stat.label} className={paddingClass}>
                      {StatsInfo(stat.label, stat.value, stat.unit)}
                    </div>
                  );
                })}
              </div>
            </div>
            {videoId && (
              <div className="flex flex-col gap-4 ">
                <h2 className="text-3xl font-bold" id="video">
                  Video
                </h2>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`} // Ensure videoId is the correct YouTube video ID
                  title={name}
                  className="aspect-video rounded-3xl"
                  allowFullScreen
                />
              </div>
            )}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold" id="ingredients">
                Ingredients
              </h2>
              <Markdown remarkPlugins={[remarkGfm]}>{ingredients}</Markdown>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold" id="instructions">
                Instructions
              </h2>
              <Markdown remarkPlugins={[remarkGfm]}>{instructions}</Markdown>
            </div>
            {recipeNotes && (
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold" id="recipeNotes">
                  Recipe Notes
                </h2>
                <Markdown remarkPlugins={[remarkGfm]}>{recipeNotes}</Markdown>
              </div>
            )}
          </div>
        </div>
        <Suspense fallback={<RelatedRecipes.Skeleton />}>
          <RelatedRecipes categories={categories} recipeID={documentId} />
        </Suspense>
        <Suspense fallback={<AboutSmallAndFeatured.Skeleton />}>
          <AboutSmallAndFeatured />
        </Suspense>
      </div>
    </main>
  );
}

function StatsInfo(heading: string, value: number, type: string) {
  return (
    <div className="flex flex-col gap-1 items-start">
      <span className="text-sm text-neutral-600">{heading}</span>
      <span className="font-bold">
        {value} {type === "time" && "mins"}
        {type === "calories" && "kcal"}
      </span>
    </div>
  );
}

export default RecipePage;
