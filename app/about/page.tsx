import { getAboutPage } from "@/graphql/queries";
// import { BASE_URL } from "@/utils/constants";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

async function AboutPage() {
  const { about } = await getAboutPage();
  const { body, heading, highlight, image } = about;

  return (
    <main>
      <div className="max-w-[600px] mx-auto pt-24 pb-16">
        <h1 className="text-center text-4xl font-bold">
          {heading} <span className="text-red-600">{highlight}</span>
        </h1>
      </div>
      <div className="aspect-video max-w-[900px] mx-auto relative rounded-3xl overflow-hidden mt-4">
        <Image
          fill
          className="object-cover"
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`}
          alt={heading}
        />
      </div>
      <div className="max-w-[600px] mx-auto py-16">
        <Markdown remarkPlugins={[remarkGfm]} className="markdown">
          {body}
        </Markdown>
      </div>
    </main>
  );
}

export default AboutPage;
