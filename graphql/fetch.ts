import { GQL_URL } from "@/utils/constants";

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
  const res = await fetch(`${GQL_URL}`, {
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
