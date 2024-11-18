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
  nonNullAuthors,
  nonNullCategories,
  nonNullCourses,
  nonNullName,
  nonNullSortBy,
}: {
  nonNullAuthors: string[];
  nonNullCategories: string[];
  nonNullCourses: string[];
  nonNullName: string;
  nonNullSortBy: string;
}) {
  const query = `#graphql
    query Query($filters: RecipeFiltersInput, $sort: [String]) {
      recipes(filters: $filters, sort: $sort) {
        name
        documentId
        image {
          url
        }
      }
    }
  `;

  // Only add filters if any arrays have values
  const hasFilters =
    nonNullAuthors.length > 0 ||
    nonNullCategories.length > 0 ||
    nonNullCourses.length > 0;

  // const data = await strapiGQLQuery<RecipeSearchQuery>({
  //   query,
  //   variables: {
  //     filters:  {
  //       or: [
  //         {
  //           author: {
  //             name: {
  //               in: nonNullAuthors,
  //             },
  //           },
  //         },
  //         {
  //           categories: {
  //             name: {
  //               in: nonNullCategories,
  //             },
  //           },
  //         },
  //         {
  //           courses: {
  //             name: {
  //               in: nonNullCourses,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

  // const data = await strapiGQLQuery<RecipeSearchQuery>({
  //   query,
  //   variables: {
  //     filters: hasFilters
  //       ? {
  //           or: [
  //             ...(nonNullAuthors.length > 0
  //               ? [
  //                   {
  //                     author: {
  //                       name: {
  //                         in: nonNullAuthors,
  //                       },
  //                     },
  //                   },
  //                 ]
  //               : []),
  //             ...(nonNullCategories.length > 0
  //               ? [
  //                   {
  //                     categories: {
  //                       name: {
  //                         in: nonNullCategories,
  //                       },
  //                     },
  //                   },
  //                 ]
  //               : []),
  //             ...(nonNullCourses.length > 0
  //               ? [
  //                   {
  //                     courses: {
  //                       name: {
  //                         in: nonNullCourses,
  //                       },
  //                     },
  //                   },
  //                 ]
  //               : []),
  //           ],
  //           name: {
  //             contains: nonNullName,
  //           },
  //         }
  //       : {},
  //   },
  // });

  const data = await strapiGQLQuery<RecipeSearchQuery>({
    query,
    variables: {
      filters: {
        and: [
          // Name filter (if exists)
          ...(nonNullName
            ? [
                {
                  name: {
                    contains: nonNullName,
                  },
                },
              ]
            : []),
          // Other filters in OR condition (if any exist)
          ...(hasFilters
            ? [
                {
                  or: [
                    ...(nonNullAuthors.length > 0
                      ? [
                          {
                            author: {
                              name: {
                                in: nonNullAuthors,
                              },
                            },
                          },
                        ]
                      : []),
                    ...(nonNullCategories.length > 0
                      ? [
                          {
                            categories: {
                              name: {
                                in: nonNullCategories,
                              },
                            },
                          },
                        ]
                      : []),
                    ...(nonNullCourses.length > 0
                      ? [
                          {
                            courses: {
                              name: {
                                in: nonNullCourses,
                              },
                            },
                          },
                        ]
                      : []),
                  ],
                },
              ]
            : []),
        ],
      },
      sort: [nonNullSortBy],
    },
  });

  if (!data) {
    throw new Error("No data");
  }

  return data;
}

export async function getRecipesCount() {
  const query = `#graphql
    query RecipesCount {
      recipes {
        documentId
      }
    }
  `;

  const data = await strapiGQLQuery<RecipesCountQuery>({
    query,
    variables: {},
  });

  if (!data) {
    throw new Error("No data");
  }

  return data.recipes.length;
}
