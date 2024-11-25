import ButtonLink from "./ButtonLink";

function HeroHeading() {
  return (
    <div className="max-w-[600px] mx-auto flex flex-col items-center py-24 gap-8">
      <h1 className="text-center text-4xl font-bold">
        Find the best recipes and become a{" "}
        <span className="text-red-600">bolder baker</span>
      </h1>
      <ButtonLink href="/recipes" varient="primary">
        Explore recipes
      </ButtonLink>
    </div>
  );
}

export default HeroHeading;
