"use client";

import { Input } from "@/app/_components/ui/input";
import { CategoryCoursesAuthorsQuery } from "@/graphql/types";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useRef } from "react";
import SearchRecipesResult from "./SearchRecipesResult";
import { useQueryClient } from "@tanstack/react-query";

/* 
{
  category: [ 'Cheesecakes', "Emma's Best Recipes" ],
  author: [ 'Emily', 'Emma' ],
  course: [ 'Desserts', 'Breakfast' ],
}

*/

interface SearchRecipesProps {
  filters: CategoryCoursesAuthorsQuery;
}

function SearchRecipes({ filters }: SearchRecipesProps) {
  const queryClient = useQueryClient();
  const { authors, categories, courses } = filters;

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

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Function to toggle categories
  const toggleCategory = (value: string) => {
    if (!category) {
      setCategory([value]);
      queryClient.invalidateQueries({ queryKey: ["recipesData"] });
      return;
    }
    const updatedCategory = category.includes(value)
      ? category.filter((cat) => cat !== value)
      : [...category, value];
    setCategory(updatedCategory); // Updates URL to reflect selected categories
    queryClient.invalidateQueries({ queryKey: ["recipesData"] });
  };

  // Function to toggle authors
  const toggleAuthor = (value: string) => {
    if (!author) {
      setAuthor([value]);
      queryClient.invalidateQueries({ queryKey: ["recipesData"] });
      return;
    }
    const updatedAuthor = author.includes(value)
      ? author.filter((auth) => auth !== value)
      : [...author, value];
    setAuthor(updatedAuthor); // Updates URL to reflect selected authors
    queryClient.invalidateQueries({ queryKey: ["recipesData"] });
  };

  // Function to toggle courses
  const toggleCourse = (value: string) => {
    if (!course) {
      setCourse([value]);
      queryClient.invalidateQueries({ queryKey: ["recipesData"] });
      return;
    }
    const updatedCourse = course.includes(value)
      ? course.filter((cours) => cours !== value)
      : [...course, value];
    setCourse(updatedCourse); // Updates URL to reflect selected courses
    queryClient.invalidateQueries({ queryKey: ["recipesData"] });
  };

  function handleReset() {
    setCategory([]);
    setAuthor([]);
    setCourse([]);
    setSortBy(null);
    setName(null);

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    queryClient.invalidateQueries({ queryKey: ["recipesData"] });
  }

  return (
    <div className="grid grid-cols-[300px,1fr] gap-8">
      <div className="border-slate-200 border rounded-xl flex flex-col gap-4 p-6 divide-y-2">
        <Input
          type="text"
          placeholder="Search recipes by name"
          onChange={(e) => setName(e.target.value)}
          ref={searchInputRef}
        />
        <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
          <p className="max-w-40">
            Showing <span className="font-bold text-red-600">36</span> results
            of <span className="font-bold text-red-600">36</span> items
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
                queryClient.invalidateQueries({ queryKey: ["recipesData"] });
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
                queryClient.invalidateQueries({ queryKey: ["recipesData"] });
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
                queryClient.invalidateQueries({ queryKey: ["recipesData"] });
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
      <div className="">
        <div>Filterby and sort</div>
        <SearchRecipesResult
          categories={category}
          authors={author}
          courses={course}
          sortBy={sortBy}
          name={name}
        />
      </div>
    </div>
  );
}

export default SearchRecipes;
