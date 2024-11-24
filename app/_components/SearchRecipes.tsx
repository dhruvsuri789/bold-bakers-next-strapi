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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";

import { PAGE_SIZE } from "@/utils/constants";
import { X } from "lucide-react";
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
}

function SearchRecipes({ filters }: SearchRecipesProps) {
  const { authors, categories, courses } = filters;
  const [inputValue, setInputValue] = useState("");
  const [recipeResults, setRecipeResults] = useState(0);
  const [recipeResultsTotal, setRecipeResultsTotal] = useState(0);
  const [page, setPage] = useQueryState("page", parseAsString.withDefault(""));
  const currentPage = page ? parseInt(page) : 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [category, setCategory] = useQueryState(
    "category",
    parseAsArrayOf<string>(parseAsString).withDefault([])
  );

  const [author, setAuthor] = useQueryState(
    "author",
    parseAsArrayOf<string>(parseAsString).withDefault([])
  );

  const [course, setCourse] = useQueryState(
    "course",
    parseAsArrayOf<string>(parseAsString).withDefault([])
  );

  const [sortBy, setSortBy] = useQueryState(
    "sortby",
    parseAsString.withDefault("")
  );
  const [name, setName] = useQueryState("name", parseAsString.withDefault(""));

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
    setInputValue("");
    setName("");
    setPage("");
  }

  return (
    <div className="grid grid-cols-[300px,1fr] gap-8 items-start">
      <div className="border-slate-200 border rounded-xl grid grid-template-rows-[auto,1fr] gap-4 p-6 divide-y-2 h-[800px] overflow-y-scroll bg-neutral-50">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Search</span>
          <Input
            type="search"
            placeholder="Search recipes (min. 3 char)"
            className="w-full h-12 rounded-lg"
            value={inputValue || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (page && parseInt(page) > 1) {
                handlePageChange(1);
              }
              setInputValue(value);
              debounceSearch(value, setName);
            }}
          />
        </div>
        <div className="grid grid-cols-[1fr,auto] gap-2 pt-4">
          <p className="max-w-40">
            Showing{" "}
            <span className="font-bold text-red-600">{recipeResults}</span>{" "}
            results of{" "}
            <span className="font-bold text-red-600">{recipeResultsTotal}</span>{" "}
            total recipes
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
                setPage("");
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => {
              return (
                <div
                  key={cat.name}
                  className="flex items-center gap-2 min-h-[24px]"
                >
                  <div className="w-4 h-4 flex-shrink-0">
                    <input
                      type="checkbox"
                      id={cat.name}
                      checked={category?.includes(cat.name)}
                      onChange={() => {
                        setPage("1");
                        toggleCategory(cat.name);
                      }}
                      className="accent-red-600 w-4 h-4"
                    />
                  </div>
                  <label htmlFor={cat.name} className="flex-1">
                    {cat.name}
                  </label>
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
                setPage("");
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {authors.map((auth) => {
              return (
                <div
                  key={auth.name}
                  className="flex items-center gap-2 min-h-[24px]"
                >
                  <div className="w-4 h-4 flex-shrink-0">
                    <input
                      type="checkbox"
                      id={auth.name}
                      checked={author?.includes(auth.name)}
                      onChange={() => {
                        setPage("1");
                        toggleAuthor(auth.name);
                      }}
                      className="accent-red-600 w-4 h-4"
                    />
                  </div>
                  <label htmlFor={auth.name} className="flex-1">
                    {auth.name}
                  </label>
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
                setPage("");
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {courses.map((cour) => {
              return (
                <div
                  key={cour.name}
                  className="flex items-center gap-2 min-h-[24px]"
                >
                  <div className="w-4 h-4 flex-shrink-0">
                    <input
                      type="checkbox"
                      id={cour.name}
                      checked={course?.includes(cour.name)}
                      onChange={() => {
                        setPage("1");
                        toggleCourse(cour.name);
                      }}
                      className="accent-red-600 w-4 h-4"
                    />
                  </div>
                  <label htmlFor={cour.name} className="flex-1">
                    {cour.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[auto,1fr,auto] gap-6 mb-12">
        <div className="grid grid-cols-[1fr,auto] gap-6 p-4 border border-slate-200 rounded-xl bg-neutral-50">
          <div className="grid grid-cols-[auto,1fr] items-center">
            <span className="text-sm text-neutral-600">Filtered by:</span>
            <div className="flex gap-2 items-center flex-wrap">
              {name && (
                <button
                  className="font-semibold ml-2 bg-violet-600 px-4 py-2 text-neutral-50 rounded-full hover:bg-violet-500 transition-colors cursor-pointer grid grid-cols-[1fr,auto] items-center gap-2"
                  onClick={() => {
                    setName("");
                    setPage("");
                    setInputValue("");
                  }}
                >
                  <span>Name: {name}</span>
                  <X className="w-4 h-4" />
                </button>
              )}
              {category && category.length > 0 && (
                <button
                  className="font-semibold ml-2 bg-red-500 px-4 py-2 text-neutral-50 rounded-full hover:bg-red-400 transition-colors cursor-pointer grid grid-cols-[1fr,auto] items-center gap-2"
                  onClick={() => {
                    setCategory([]);
                    setPage("");
                  }}
                >
                  <span>Categories: {category.join(", ")}</span>
                  <X className="w-4 h-4" />
                </button>
              )}

              {author && author.length > 0 && (
                <button
                  className="font-semibold ml-2 bg-green-700 px-4 py-2 text-neutral-50 rounded-full hover:bg-green-600 transition-colors cursor-pointer grid grid-cols-[1fr,auto] items-center gap-2"
                  onClick={() => {
                    setAuthor([]);
                    setPage("");
                  }}
                >
                  <span>Authors: {author.join(", ")}</span>
                  <X className="w-4 h-4" />
                </button>
              )}

              {course && course.length > 0 && (
                <button
                  className="font-semibold ml-2 bg-blue-700 px-4 py-2 text-neutral-50 rounded-full hover:bg-blue-600 transition-colors cursor-pointer grid grid-cols-[1fr,auto] items-center gap-2"
                  onClick={() => {
                    setCourse([]);
                    setPage("");
                  }}
                >
                  <span>Courses: {course.join(", ")}</span>
                  <X className="w-4 h-4" />
                </button>
              )}

              {sortBy && (
                <button
                  className="font-semibold ml-2 bg-yellow-600 px-4 py-2 text-neutral-50 rounded-full hover:bg-yellow-500 transition-colors cursor-pointer grid grid-cols-[1fr,auto] items-center gap-2"
                  onClick={() => {
                    setSortBy("");
                    setPage("");
                  }}
                >
                  <span>
                    Sort by:{" "}
                    {sortBy
                      .split(":")
                      .join(" ")
                      .replace("publishedAt", "Published")
                      .replace("name", "Name")
                      .replace("asc", "Ascending")
                      .replace("desc", "Descending")}
                  </span>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <Select
            onValueChange={(value) => {
              setPage("1");
              setSortBy(value);
            }}
            value={sortBy || ""}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by:</SelectLabel>
                <SelectItem value="name:asc" className="cursor-pointer">
                  Name: A - Z
                </SelectItem>
                <SelectItem value="name:desc" className="cursor-pointer">
                  Name: Z - A
                </SelectItem>
                <SelectItem value="publishedAt:asc" className="cursor-pointer">
                  Published: Asc
                </SelectItem>
                <SelectItem value="publishedAt:desc" className="cursor-pointer">
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
          page={currentPage}
          setRecipeResults={setRecipeResults}
          setRecipeResultsTotal={setRecipeResultsTotal}
        />
        {recipeResultsTotal > PAGE_SIZE && (
          <Pagination className="justify-center">
            <PaginationContent className="list-none flex gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className={`border border-red-600 text-red-600 transition-colors ${
                    currentPage > 1
                      ? "hover:bg-red-600 hover:text-neutral-50"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage <= 1}
                />
              </PaginationItem>

              {(() => {
                const totalPages = Math.ceil(recipeResultsTotal / PAGE_SIZE);
                const pages = [];

                // Always show first page
                pages.push(
                  <PaginationItem key={1}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === 1}
                      onClick={() => handlePageChange(1)}
                      disabled={totalPages < 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                );

                // Show ellipsis and some middle pages
                if (totalPages > 1) {
                  if (currentPage > 3) {
                    pages.push(
                      <PaginationItem key="ellipsis1">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  // Show current page and surrounding pages
                  for (
                    let i = Math.max(2, currentPage - 1);
                    i <= Math.min(totalPages - 1, currentPage + 1);
                    i++
                  ) {
                    pages.push(
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i}
                          onClick={() => handlePageChange(i)}
                        >
                          {i}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  if (currentPage < totalPages - 2) {
                    pages.push(
                      <PaginationItem key="ellipsis2">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  // Always show last page if there is more than one page
                  if (totalPages > 1) {
                    pages.push(
                      <PaginationItem key={totalPages}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === totalPages}
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                }

                return pages;
              })()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  className={`border border-red-600 text-red-600 transition-colors ${
                    currentPage < Math.ceil(recipeResultsTotal / PAGE_SIZE)
                      ? "hover:bg-red-600 hover:text-neutral-50"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    currentPage < Math.ceil(recipeResultsTotal / PAGE_SIZE) &&
                    handlePageChange(currentPage + 1)
                  }
                  disabled={
                    currentPage >= Math.ceil(recipeResultsTotal / PAGE_SIZE)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default SearchRecipes;
