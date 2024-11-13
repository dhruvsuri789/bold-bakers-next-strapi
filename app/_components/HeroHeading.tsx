import ButtonLink from "./ButtonLink";

function HeroHeading() {
  return (
    <div className="max-w-[600px] mx-auto flex flex-col items-center py-24 gap-8">
      <h1 className="text-center text-4xl font-bold">
        Find the best recipes and become a{" "}
        <span className="text-red-600">bolder baker</span>
      </h1>
      <div className="flex gap-4">
        <ButtonLink href="/recipes" varient="primary">
          Explore recipes
        </ButtonLink>
        <ButtonLink varient="secondary" href="#">
          Continue reading
        </ButtonLink>
      </div>
    </div>
  );
}

export default HeroHeading;
