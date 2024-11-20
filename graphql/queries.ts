import "server-only";
import { strapiGQLQuery } from "./fetch";
import {
  AuthorsQuery,
  CategoryCoursesAuthorsQuery,
  HomepageSectionsQuery,
  RecipesCountQuery,
  RecipeSearchQuery,
  RecipesQuery,
  RelatedRecipesQuery,
} from "./types";
import { PAGE_SIZE } from "@/utils/constants";

export async function getAuthors() {
  const query = `#graphql
    query Recipes {
      authors {
        name
      }
    }`;

  const data = await strapiGQLQuery<AuthorsQuery>({ query });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}

export async function getHomepageSections() {
  const query = `#graphql
    query Query {
      homepage {
        Homepage {
          ... on ComponentSectionsRecipeList {
            id
            ctaNullable: cta  # Alias for the nullable version
            ctaNonNullable: cta  # Alias for the non-nullable version
            heading
            recipes {
              name
              documentId
              image {
                url
                width
                name
                height
              }
            }
            sectionCategory {
              sectionCategory
            }
          }
          ... on ComponentSectionsFeatured {
            heading
            logoImages {
              height
              url
              width
              name
            }
            sectionCategory {
              sectionCategory
            }
          }
          ... on ComponentSectionsAboutSmall {
            heading
            description
            cta
            image {
              height
              url
              width
              name
            }
            sectionCategory {
              sectionCategory
            }
          }
        }
      }
    }
  `;

  const data = await strapiGQLQuery<HomepageSectionsQuery>({ query });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}

export async function getRecipe(documentId: string) {
  const query = `#graphql
    query Query($filters: RecipeFiltersInput) {
      recipes(filters: $filters) {
        documentId
        name
        description
        prepTime
        cookTime
        restTime
        servings
        settingTime
        calories
        image {
          url
        }
        video
        categories {
          name
        }
        courses {
          name
        }
        ingredients
        instructions
        recipeNotes
        videoId
        author {
          name
          documentId
        }
        createdAt
        updatedAt
        publishedAt
      }
    }
  `;

  const data = await strapiGQLQuery<RecipesQuery>({
    query,
    variables: { filters: { documentId: { eq: documentId } } },
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}

export async function getRelatedRecipes(categories: string[]) {
  const query = `#graphql
    query Query($filters: RecipeFiltersInput, $pagination: PaginationArg) {
      recipes(filters: $filters, pagination: $pagination) {
        documentId
        name
        image {
          url
        }
      }
    }
  `;

  const data = await strapiGQLQuery<RelatedRecipesQuery>({
    query,
    variables: {
      filters: { categories: { name: { in: categories } } },
      pagination: { limit: 5 },
    },
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}

export async function getFilters() {
  const query = `#graphql
    query Categories {
      authors {
        name
        documentId
      }
      courses {
        name
        documentId
      }
      categories {
        name
        documentId
      }
    }
  `;

  const data = await strapiGQLQuery<CategoryCoursesAuthorsQuery>({
    query,
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}

export async function getSearchRecipes({
  author,
  category,
  course,
  name,
  sortBy,
  page = 1,
  pageSize = PAGE_SIZE,
}: {
  author: string[];
  category: string[];
  course: string[];
  name: string;
  sortBy: string;
  page: number;
  pageSize?: number;
}) {
  const query = `#graphql
    query RecipeSearch($sort: [String], $pagination: PaginationArg, $filters: RecipeFiltersInput) {
      recipes_connection(sort: $sort, pagination: $pagination, filters: $filters) {
        nodes {
          documentId
          image {
            url
          }
          name
        }
        pageInfo {
          total
          pageSize
          page
          pageCount
        }
      }
    }
  `;

  console.log("Server-Only:", {
    author,
    category,
    course,
    name,
    sortBy,
    page,
    pageSize,
  });

  // Only add filters if any arrays have values
  const hasFilters =
    author.length > 0 || category.length > 0 || course.length > 0;

  const filtersV1 =
    name !== "" || hasFilters
      ? {
          and: [
            //Name filter (if exists)
            ...(name
              ? [
                  {
                    name: {
                      contains: name,
                    },
                  },
                ]
              : []),
            // Other filters in OR condition (if any exist)
            ...(hasFilters
              ? [
                  {
                    or: [
                      {
                        author: {
                          name: {
                            in: author,
                          },
                        },
                      },
                      {
                        categories: {
                          name: {
                            in: category,
                          },
                        },
                      },
                      {
                        courses: {
                          name: {
                            in: course,
                          },
                        },
                      },
                    ],
                  },
                ]
              : []),
          ],
        }
      : undefined;
  // const filtersV3 = {
  //   and: [
  //     // Name filter (if exists)
  //     ...(name
  //       ? [
  //           {
  //             name: {
  //               contains: name,
  //             },
  //           },
  //         ]
  //       : []),
  //     // Other filters in OR condition (if any exist)
  //     ...(hasFilters
  //       ? [
  //           {
  //             or: [
  //               ...(author.length > 0
  //                 ? [
  //                     {
  //                       author: {
  //                         name: {
  //                           in: author,
  //                         },
  //                       },
  //                     },
  //                   ]
  //                 : []),
  //               ...(category.length > 0
  //                 ? [
  //                     {
  //                       categories: {
  //                         name: {
  //                           in: category,
  //                         },
  //                       },
  //                     },
  //                   ]
  //                 : []),
  //               ...(course.length > 0
  //                 ? [
  //                     {
  //                       courses: {
  //                         name: {
  //                           in: course,
  //                         },
  //                       },
  //                     },
  //                   ]
  //                 : []),
  //             ],
  //           },
  //         ]
  //       : []),
  //   ],
  // };

  // const filtersV2 = {
  //   or: [
  //     // Name filter (if exists)
  //     ...(nonNullName
  //       ? [
  //           {
  //             name: {
  //               contains: nonNullName,
  //             },
  //           },
  //         ]
  //       : []),
  //     // Author filters
  //     ...(nonNullAuthors.length > 0
  //       ? [
  //           {
  //             author: {
  //               name: {
  //                 in: nonNullAuthors,
  //               },
  //             },
  //           },
  //         ]
  //       : []),
  //     // Category filters
  //     ...(nonNullCategories.length > 0
  //       ? [
  //           {
  //             categories: {
  //               name: {
  //                 in: nonNullCategories,
  //               },
  //             },
  //           },
  //         ]
  //       : []),
  //     // Course filters
  //     ...(nonNullCourses.length > 0
  //       ? [
  //           {
  //             courses: {
  //               name: {
  //                 in: nonNullCourses,
  //               },
  //             },
  //           },
  //         ]
  //       : []),
  //   ],
  // };

  console.log("filtersV1:", filtersV1);

  const data = await strapiGQLQuery<RecipeSearchQuery>({
    query,
    variables: {
      filters: filtersV1,
      sort: sortBy ? [sortBy] : undefined,
      pagination: {
        page: Math.max(1, page), // Ensure page is never less than 1,
        pageSize,
      },
    },
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}

export async function getRecipesCount() {
  // const query = `#graphql
  //   query RecipesCount {
  //     recipes {
  //       documentId
  //     }
  //   }
  // `;

  const query = `#graphql
    query RecipeSearch {
      recipes_connection {
        pageInfo {
          total
        }
      }
    }
  `;

  const data = await strapiGQLQuery<RecipesCountQuery>({
    query,
  });

  if (!data) {
    throw new Error("No data");
  }

  return data.recipes_connection.pageInfo.total;
}
