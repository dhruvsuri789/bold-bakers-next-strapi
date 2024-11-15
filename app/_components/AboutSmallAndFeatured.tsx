import { getHomepageSections } from "@/graphql/queries";
import {
  HomepageAboutSmallQuery,
  HomepageFeaturedQuery,
} from "@/graphql/types";
import HomepageAboutSmall from "./HomepageAboutSmall";
import HomepageFeatured from "./HomepageFeatured";

async function AboutSmallAndFeatured() {
  const {
    homepage: { Homepage: data },
  } = await getHomepageSections();

  return (
    <>
      {data.map((section, index) => {
        switch (section.sectionCategory.sectionCategory) {
          case "aboutSmall":
            const aboutSmallSection = section as HomepageAboutSmallQuery;
            return (
              <HomepageAboutSmall
                section={aboutSmallSection}
                key={aboutSmallSection.id || `aboutSmall-${index}`}
              />
            );
          case "featured":
            const featuredSection = section as HomepageFeaturedQuery;
            return (
              <HomepageFeatured
                section={featuredSection}
                key={featuredSection.id || `featured-${index}`}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default AboutSmallAndFeatured;
