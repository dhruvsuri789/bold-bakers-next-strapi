"use client";

import { Input } from "@/app/_components/ui/input";
import { CategoryCoursesAuthorsQuery } from "@/graphql/types";
import { useRouter, useSearchParams } from "next/navigation";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import qs from "query-string";

/* 
{
  category: [ 'Cheesecakes', "Emma's Best Recipes" ],
  author: [ 'Emily', 'Emma' ],
  course: [ 'Desserts', 'Breakfast' ],
}

*/

interface SearchRecipesProps {
  filters: CategoryCoursesAuthorsQuery;
  children: React.ReactNode;
}

function SearchRecipes({ filters, children }: SearchRecipesProps) {
  const router = useRouter();
  const params = useSearchParams();
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

  // Function to toggle categories
  const toggleCategory = async (value: string) => {
    try {
      if (!category) {
        await setCategory([value]);
      } else {
        const updatedCategory = category.includes(value)
          ? category.filter((cat) => cat !== value)
          : [...category, value];
        await setCategory(updatedCategory);
      }

      // Get the latest params after state update
      const currentQuery = qs.parse(params.toString());
      const url = qs.stringifyUrl(
        {
          url: "/recipes",
          query: currentQuery,
        },
        { skipNull: true }
      );
      router.replace(url, { scroll: false });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Function to toggle authors
  const toggleAuthor = async (value: string) => {
    try {
      if (!author) {
        await setAuthor([value]);
      } else {
        const updatedAuthor = author.includes(value)
          ? author.filter((auth) => auth !== value)
          : [...author, value];
        await setAuthor(updatedAuthor);
      }

      // Get the latest params after state update
      const currentQuery = qs.parse(params.toString());
      const url = qs.stringifyUrl(
        {
          url: "/recipes",
          query: currentQuery,
        },
        { skipNull: true }
      );
      router.replace(url, { scroll: false });
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  // Function to toggle courses
  const toggleCourse = async (value: string) => {
    try {
      if (!course) {
        await setCourse([value]);
      } else {
        const updatedCourse = course.includes(value)
          ? course.filter((cours) => cours !== value)
          : [...course, value];
        await setCourse(updatedCourse);
      }

      // Get the latest params after state update
      const currentQuery = qs.parse(params.toString());
      const url = qs.stringifyUrl(
        {
          url: "/recipes",
          query: currentQuery,
        },
        { skipNull: true }
      );
      router.replace(url, { scroll: false });
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await setName(e.target.value || null);

      // Get the latest params after state update
      const currentQuery = qs.parse(params.toString());
      const url = qs.stringifyUrl(
        {
          url: "/recipes",
          query: currentQuery,
        },
        { skipNull: true }
      );
      router.replace(url, { scroll: false });
    } catch (error) {
      console.error("Error updating search:", error);
    }
  };

  async function handleReset() {
    try {
      await Promise.all([
        setCategory([]),
        setAuthor([]),
        setCourse([]),
        setSortBy(null),
        setName(null),
      ]);

      // Get the latest params after state update
      const currentQuery = qs.parse(params.toString());
      const url = qs.stringifyUrl(
        {
          url: "/recipes",
          query: currentQuery,
        },
        { skipNull: true }
      );
      router.replace(url, { scroll: false });
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  }

  return (
    <div className="grid grid-cols-[300px,1fr] gap-8">
      <div className="border-slate-200 border rounded-xl flex flex-col gap-4 p-6 divide-y-2">
        <Input
          type="text"
          placeholder="Search recipes by name"
          value={name || ""}
          onChange={handleSearchChange}
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
                handleReset();
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
                handleReset();
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
                handleReset();
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
        {children}
      </div>
    </div>
  );
}

export default SearchRecipes;
