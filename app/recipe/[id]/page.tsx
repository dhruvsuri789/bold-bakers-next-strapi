interface RecipePageProps {
  params: {
    id: string;
  };
}

function RecipePage({ params }: RecipePageProps) {
  return <h1>{params.id}</h1>;
}

export default RecipePage;
