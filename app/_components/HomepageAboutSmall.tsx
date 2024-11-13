import { HomepageAboutSmallQuery } from "@/graphql/types";

interface HomepageAboutSmallProps {
  section: HomepageAboutSmallQuery;
}

function HomepageAboutSmall({ section }: HomepageAboutSmallProps) {
  const { heading, description } = section;

  return (
    <div className="flex flex-col py-24 gap-4 items-center">
      <h2 className="text-3xl font-bold self-start">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <p>{JSON.stringify(description)}</p>
      </div>
    </div>
  );
}

export default HomepageAboutSmall;
