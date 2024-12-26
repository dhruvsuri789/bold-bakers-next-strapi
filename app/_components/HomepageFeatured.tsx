import { HomepageFeaturedQuery } from "@/graphql/types";
// import { BASE_URL } from "@/utils/constants";
import Image from "next/image";

interface HomepageFeaturedProps {
  section: HomepageFeaturedQuery;
}

function HomepageFeatured({ section }: HomepageFeaturedProps) {
  const { heading, logoImages } = section;

  return (
    <div className="flex flex-col py-16 gap-4 items-center">
      <h2 className="text-3xl font-bold self-start">{heading}</h2>
      <div className="flex justify-between w-full flex-wrap space-x-6 space-y-6">
        {logoImages.map((image) => {
          return (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`}
              alt={image.name}
              key={image.name}
              width={160}
              height={40}
              // className="grayscale"
              style={{ maxWidth: "80px" }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomepageFeatured;
