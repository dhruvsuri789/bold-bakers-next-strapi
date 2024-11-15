import { getFilters } from "@/graphql/queries";
import Container from "../_components/Container";
import Nav from "../_components/Nav";
import SearchRecipes from "../_components/SearchRecipes";

interface RecipesPageProps {
  searchParams: { [key: string]: string | undefined };
}

async function RecipesPage({ searchParams }: RecipesPageProps) {
  const filters = await getFilters();
  console.log(searchParams);

  return (
    <Container>
      <Nav />
      <main>
        <div className="max-w-[600px] mx-auto flex flex-col items-center py-24 gap-8">
          <h1 className="text-center text-4xl font-bold">
            Find all the best recipes in{" "}
            <span className="text-red-600">one single place</span>
          </h1>
        </div>
        <SearchRecipes filters={filters} />
      </main>
    </Container>
  );
}

export default RecipesPage;
