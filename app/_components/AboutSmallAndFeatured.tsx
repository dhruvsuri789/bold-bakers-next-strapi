import { getHomepageSections } from "@/graphql/queries";
import {
  HomepageAboutSmallQuery,
  HomepageFeaturedQuery,
} from "@/graphql/types";
import HomepageAboutSmall from "./HomepageAboutSmall";
import HomepageFeatured from "./HomepageFeatured";
import { Skeleton } from "./ui/skeleton";

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

function AboutSmallAndFeaturedSkeleton() {
  return (
    <>
      <div className="flex flex-col py-16 gap-4 items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
          <div className="flex flex-col gap-4 items-start">
            <Skeleton className="h-10 w-full rounded-3xl" />
            <Skeleton className="h-10 w-[80%] rounded-3xl" />
            <Skeleton className="h-10 w-[60%] rounded-3xl" />
            <Skeleton className="h-10 w-[40%] rounded-3xl" />
          </div>
          <div className="aspect-video relative rounded-3xl overflow-hidden border border-red-200">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}

AboutSmallAndFeatured.Skeleton = AboutSmallAndFeaturedSkeleton;

export default AboutSmallAndFeatured;
