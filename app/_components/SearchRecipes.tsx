"use client";

import { Input } from "@/app/_components/ui/input";
import { CategoryCoursesAuthorsQuery } from "@/graphql/types";
import { debounce } from "lodash";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import SearchRecipesResult from "./SearchRecipesResult";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

/* 
{
  category: [ 'Cheesecakes', "Emma's Best Recipes" ],
  author: [ 'Emily', 'Emma' ],
  course: [ 'Desserts', 'Breakfast' ],
}
to ->
{
  category: { 'Cheesecakes', "Emma's Best Recipes" },
  author: { 'Emily', 'Emma' },
  course: { 'Desserts', 'Breakfast' },
}
*/

const debounceSearch = debounce(
  async (searchText: string, setter: (name: string) => void) => {
    console.log(searchText);
    if (!searchText || searchText.length < 3) {
      setter("");
      return;
    }
    setter(searchText);
  },
  500
);

interface SearchRecipesProps {
  filters: CategoryCoursesAuthorsQuery;
  totalRecipes: number;
}

function SearchRecipes({ filters, totalRecipes }: SearchRecipesProps) {
  const { authors, categories, courses } = filters;
  const [inputValue, setInputValue] = useState("");
  const [recipeSearch, setRecipeSearch] = useState(0);

  const [category, setCategory] = useQueryState(
    "category",
    parseAsArrayOf<string>(parseAsString)
  );

  const [author, setAuthor] = useQueryState(
    "author",
    parseAsArrayOf<string>(parseAsString)
  );

  const [course, setCourse] = useQueryState(
    "course",
    parseAsArrayOf<string>(parseAsString)
  );

  const [sortBy, setSortBy] = useQueryState("sortby");
  const [name, setName] = useQueryState("name");

  // Function to toggle categories
  const toggleCategory = (value: string) => {
    if (!category) {
      setCategory([value]);
      return;
    }
    const updatedCategory = category.includes(value)
      ? category.filter((cat) => cat !== value)
      : [...category, value];
    setCategory(updatedCategory); // Updates URL to reflect selected categories
  };

  // Function to toggle authors
  const toggleAuthor = (value: string) => {
    if (!author) {
      setAuthor([value]);
      return;
    }
    const updatedAuthor = author.includes(value)
      ? author.filter((auth) => auth !== value)
      : [...author, value];
    setAuthor(updatedAuthor); // Updates URL to reflect selected authors
  };

  // Function to toggle courses
  const toggleCourse = (value: string) => {
    if (!course) {
      setCourse([value]);
      return;
    }
    const updatedCourse = course.includes(value)
      ? course.filter((cours) => cours !== value)
      : [...course, value];
    setCourse(updatedCourse); // Updates URL to reflect selected courses
  };

  function handleReset() {
    setCategory([]);
    setAuthor([]);
    setCourse([]);
    setSortBy(null);
    setName(null);
  }

  return (
    <div className="grid grid-cols-[300px,1fr] gap-8">
      <div className="border-slate-200 border rounded-xl flex flex-col gap-4 p-6 divide-y-2">
        <Input
          type="search"
          placeholder="Search recipes... (min. 3 characters)"
          className="w-full"
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
            debounceSearch(value, setName);
          }}
        />
        <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
          <p className="max-w-40">
            Got <span className="font-bold text-red-600">{recipeSearch}</span>{" "}
            results of{" "}
            <span className="font-bold text-red-600">{totalRecipes}</span> total
            recipes
          </p>
          <button
            className="underline text-red-600 hover:text-red-500 transition-colors"
            onClick={handleReset}
          >
            Reset all
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
            <span className="font-bold text-xl">Categories</span>
            <button
              className="underline text-neutral-600 hover:text-red-500 transition-colors"
              onClick={() => {
                setCategory([]);
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => {
              return (
                <div key={cat.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={cat.name}
                    checked={category?.includes(cat.name)}
                    onChange={() => toggleCategory(cat.name)}
                    className="accent-red-600 w-4 h-4"
                  />
                  <label htmlFor={cat.name}>{cat.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
            <span className="font-bold text-xl">Authors</span>
            <button
              className="underline text-neutral-600 hover:text-red-500 transition-colors"
              onClick={() => {
                setAuthor([]);
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {authors.map((auth) => {
              return (
                <div key={auth.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={auth.name}
                    checked={author?.includes(auth.name)}
                    onChange={() => toggleAuthor(auth.name)}
                    className="accent-red-600 w-4 h-4"
                  />
                  <label htmlFor={auth.name}>{auth.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
            <span className="font-bold text-xl">Courses</span>
            <button
              className="underline text-neutral-600 hover:text-red-500 transition-colors"
              onClick={() => {
                setCourse([]);
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {courses.map((cour) => {
              return (
                <div key={cour.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={cour.name}
                    checked={course?.includes(cour.name)}
                    onChange={() => toggleCourse(cour.name)}
                    className="accent-red-600 w-4 h-4"
                  />
                  <label htmlFor={cour.name}>{cour.name}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[1fr,auto] p-4 border border-slate-200 rounded-xl">
          <div className="grid grid-cols-[auto,1fr] items-center">
            <span className="text-sm text-neutral-600">Filtered by:</span>
            <div className="flex gap-2 items-center flex-wrap">
              {name && (
                <span className="font-semibold ml-2 bg-violet-600 px-4 py-2 text-neutral-50 rounded-full">
                  Name: {name}
                </span>
              )}
              {category && category.length > 0 && (
                <span className="font-semibold ml-2 bg-red-500 px-4 py-2 text-neutral-50 rounded-full">
                  Categories: {category.join(", ")}
                </span>
              )}
              {author && author.length > 0 && (
                <span className="font-semibold ml-2 bg-green-700 px-4 py-2 text-neutral-50 rounded-full">
                  {" "}
                  Authors: {author.join(", ")}
                </span>
              )}
              {course && course.length > 0 && (
                <span className="font-semibold ml-2 bg-blue-700 px-4 py-2 text-neutral-50 rounded-full">
                  {" "}
                  Courses: {course.join(", ")}
                </span>
              )}
            </div>
          </div>
          <Select
            onValueChange={(value) => setSortBy(value)}
            value={sortBy || ""}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by:</SelectLabel>
                <SelectItem value="name:asc">Name: A - Z</SelectItem>
                <SelectItem value="name:desc">Name: Z - A</SelectItem>
                <SelectItem value="publishedAt:asc">Published: Asc</SelectItem>
                <SelectItem value="publishedAt:desc">
                  Published: Desc
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SearchRecipesResult
          category={category}
          author={author}
          course={course}
          sortBy={sortBy}
          name={name}
          setRecipeSearch={setRecipeSearch}
        />
      </div>
    </div>
  );
}

export default SearchRecipes;
