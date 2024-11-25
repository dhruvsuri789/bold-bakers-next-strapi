import ButtonLink from "./_components/ButtonLink";

function NotFoundPage() {
  return (
    <main>
      <div className="max-w-[600px] mx-auto flex flex-col items-center py-24 gap-8">
        <h1 className="text-center text-4xl font-bold">
          The page you are looking for{" "}
          <span className="text-red-600">does not exist</span>
        </h1>
        <div className="flex gap-4">
          <ButtonLink href="/" varient="primary">
            Go back home
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
