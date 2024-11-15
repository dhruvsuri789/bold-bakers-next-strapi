interface SearchRecipesResultProps {
  searchParams: { [key: string]: string | undefined };
}

function SearchRecipesResult({ searchParams }: SearchRecipesResultProps) {
  console.log(searchParams);
  return <div></div>;
}

export default SearchRecipesResult;
