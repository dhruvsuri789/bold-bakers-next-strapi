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
      {data.map((section) => {
        switch (section.sectionCategory.sectionCategory) {
          case "featured":
            const featuredSection = section as HomepageFeaturedQuery;
            return (
              <HomepageFeatured section={featuredSection} key={section.id} />
            );
          case "aboutSmall":
            const aboutSmallSection = section as HomepageAboutSmallQuery;
            return (
              <HomepageAboutSmall
                section={aboutSmallSection}
                key={section.id}
              />
            );
          case "recipeList":
            const recipeSection = section as HomepageRecipeQuery;
            return (
              <HomepageRecipeList section={recipeSection} key={section.id} />
            );
        }
      })}
    </>
  );
}

export default SectionsBuilder;
