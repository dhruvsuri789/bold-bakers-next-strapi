interface SearchRecipesResultProps {
  category: string[] | null;
  author: string[] | null;
  course: string[] | null;
  sortBy: string | null;
  name: string | null;
}

function SearchRecipesResult({
  category,
  author,
  course,
  sortBy,
  name,
}: SearchRecipesResultProps) {
  console.log(category, author, course, sortBy, name);

  return <div></div>;
}

export default SearchRecipesResult;
