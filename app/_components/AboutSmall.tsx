interface AboutSmallProps {
  categories: {
    name: string;
  }[];
}

function AboutSmall({ categories }: AboutSmallProps) {
  /* // Assuming `data` is the response from your GraphQL query
  const uniqueRecipes = [];
  const recipeIds = new Set();

  data.categories.forEach((category) => {
    category.recipes.forEach((recipe) => {
      if (!recipeIds.has(recipe.documentId)) {
        recipeIds.add(recipe.documentId);
        uniqueRecipes.push(recipe);
      }
    });
  });

  console.log(uniqueRecipes); */

  return <div></div>;
}

export default AboutSmall;
