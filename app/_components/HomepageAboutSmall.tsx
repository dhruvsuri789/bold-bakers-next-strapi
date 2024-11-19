import { HomepageAboutSmallQuery } from "@/graphql/types";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import ButtonLink from "./ButtonLink";
import Image from "next/image";
import { BASE_URL } from "@/utils/constants";

interface HomepageAboutSmallProps {
  section: HomepageAboutSmallQuery;
}

function HomepageAboutSmall({ section }: HomepageAboutSmallProps) {
  const {
    heading,
    description,
    image: { url, name },
  } = section;

  return (
    <div className="flex flex-col py-16 gap-4 items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-3xl font-bold self-start">{heading}</h2>
          <BlocksRenderer content={description as BlocksContent} />
          <ButtonLink varient="primary" href="/about">
            Read more
          </ButtonLink>
        </div>
        <div className="aspect-video relative rounded-3xl overflow-hidden border border-red-200">
          <Image
            fill
            className="object-cover"
            src={`${BASE_URL}${url}`}
            alt={name}
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
      </div>
    </div>
  );
}

export default HomepageAboutSmall;
