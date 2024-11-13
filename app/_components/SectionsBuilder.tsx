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
            return (
              <HomepageFeatured section={section as HomepageFeaturedQuery} />
            );
          case "aboutSmall":
            return (
              <HomepageAboutSmall
                section={section as HomepageAboutSmallQuery}
              />
            );
          case "recipeList":
            return (
              <HomepageRecipeList section={section as HomepageRecipeQuery} />
            );
        }
      })}
    </>
  );
}

export default SectionsBuilder;
