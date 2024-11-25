"use client";

import ButtonLink from "./_components/ButtonLink";

function error() {
  return (
    <main className="min-h-[60vh]">
      <div className="max-w-[600px] mx-auto flex flex-col items-center py-24 gap-8">
        <h1 className="text-center text-4xl font-bold">
          Something went <span className="text-red-600">wrong</span>
        </h1>
        <div className="flex gap-4">
          <ButtonLink href="/" varient="primary">
            Go back home
          </ButtonLink>
          <ButtonLink varient="secondary" href="/recipes">
            Go to recipes
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}

export default error;
