import { HomepageFeaturedQuery } from "@/graphql/types";

interface HomepageFeaturedProps {
  section: HomepageFeaturedQuery;
}

function HomepageFeatured({ section }: HomepageFeaturedProps) {
  const { heading } = section;

  return (
    <div className="flex flex-col py-24 gap-4 items-center">
      <h2 className="text-3xl font-bold self-start">{heading}</h2>
    </div>
  );
}

export default HomepageFeatured;
