import { getHomepageSections } from "@/graphql/queries";
import {
  HomepageAboutSmallQuery,
  HomepageFeaturedQuery,
  HomepageRecipeQuery,
} from "@/graphql/types";
import HomepageRecipeList from "./HomepageRecipeList";
import HomepageAboutSmall from "./HomepageAboutSmall";
import HomepageFeatured from "./HomepageFeatured";

async function SectionsBuilder() {
  const {
    homepage: { Homepage: data },
  } = await getHomepageSections();

  return (
    <>
      {data.map((section, index) => {
        switch (section.sectionCategory.sectionCategory) {
          case "featured":
            const featuredSection = section as HomepageFeaturedQuery;
            return (
              <HomepageFeatured
                section={featuredSection}
                key={featuredSection.id || `featured-${index}`}
              />
            );
          case "aboutSmall":
            const aboutSmallSection = section as HomepageAboutSmallQuery;
            return (
              <HomepageAboutSmall
                section={aboutSmallSection}
                key={aboutSmallSection.id || `aboutSmall-${index}`}
              />
            );
          case "recipeList":
            const recipeSection = section as HomepageRecipeQuery;
            return (
              <HomepageRecipeList
                section={recipeSection}
                key={recipeSection.id || `recipeList-${index}`}
              />
            );
        }
      })}
    </>
  );
}

export default SectionsBuilder;
