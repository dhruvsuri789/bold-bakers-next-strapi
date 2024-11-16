import { Suspense } from "react";
import Container from "../_components/Container";
import Nav from "../_components/Nav";
import SearchRecipesParent from "../_components/SearchRecipesParent";

export interface RecipesPageProps {
  searchParams: {
    category?: string;
    author?: string;
    course?: string;
    sortBy?: string;
    name?: string;
  };
}

async function RecipesPage({ searchParams }: RecipesPageProps) {
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
        <Suspense fallback={<SearchRecipesParent.Skeleton />}>
          <SearchRecipesParent searchParams={searchParams} />
        </Suspense>
      </main>
    </Container>
  );
}

export default RecipesPage;
