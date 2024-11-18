import { getFilters, getRecipesCount } from "@/graphql/queries";
import SearchRecipesWrapper from "./SearchRecipesWrapper";

async function SearchRecipesParent() {
  const [filters, totalRecipes] = await Promise.all([
    getFilters(),
    getRecipesCount(),
  ]);

  return <SearchRecipesWrapper filters={filters} totalRecipes={totalRecipes} />;
}

export default SearchRecipesParent;
