/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiGQLQueryProps {
  query: string;
  variables?: any;
  tags?: string[];
  preview?: boolean;
  revalidate?: number;
}

export async function strapiGQLQuery<T>({
  query,
  variables = {},
  tags = [],
  preview = false,
  revalidate,
}: StrapiGQLQueryProps): Promise<T | undefined> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { tags, ...{ revalidate } },
  });

  const { data, errors } = await res.json();

  if (errors) {
    // Assuming 'errors' is an object with more details
    // Convert the error object to a formatted string
    const errorDetails = JSON.stringify(errors, null, 2);
    const errorMessage = `An error occurred: ${errorDetails}`;
    throw new Error(errorMessage);
  }

  return data as T;
}
