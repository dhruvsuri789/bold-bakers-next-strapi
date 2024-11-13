import "server-only";
import { strapiGQLQuery } from "./fetch";
import { AuthorsQuery, HomepageSectionsQuery } from "./types";

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
