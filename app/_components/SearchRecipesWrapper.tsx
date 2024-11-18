"use client";

import { CategoryCoursesAuthorsQuery } from "@/graphql/types";
import SearchRecipes from "./SearchRecipes";
import { useEffect, useState } from "react";

interface SearchRecipesWrapperProps {
  filters: CategoryCoursesAuthorsQuery;
  totalRecipes: number;
}

function SearchRecipesWrapper({
  filters,
  totalRecipes,
}: SearchRecipesWrapperProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Set opacity to 1 after component mounts
    setOpacity(1);
  }, []);

  return (
    <div
      className="contents"
      style={{
        opacity,
        transition: "opacity 0.1s ease-in",
      }}
    >
      <SearchRecipes filters={filters} totalRecipes={totalRecipes} />
    </div>
  );
}

export default SearchRecipesWrapper;
