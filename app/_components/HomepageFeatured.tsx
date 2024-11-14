import { HomepageFeaturedQuery } from "@/graphql/types";
import { BASE_URL } from "@/utils/constants";
import Image from "next/image";

interface HomepageFeaturedProps {
  section: HomepageFeaturedQuery;
}

function HomepageFeatured({ section }: HomepageFeaturedProps) {
  const { heading, logoImages } = section;

  return (
    <div className="flex flex-col py-24 gap-14 items-center">
      <h2 className="text-3xl font-bold self-start">{heading}</h2>
      <div className="flex justify-between w-full flex-wrap space-x-6 space-y-6">
        {logoImages.map((image) => {
          return (
            <Image
              src={`${BASE_URL}${image.url}`}
              alt={image.name}
              key={image.name}
              width={80}
              height={20}
              // className="grayscale"
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomepageFeatured;
