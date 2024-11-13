export type AuthorsQuery = {
  authors: {
    name: string;
  }[];
};

export type HomepageRecipeQuery = {
  id: string;
  ctaNullable: string | null;
  ctaNonNullable: string;
  heading: string;
  recipes: {
    name: string;
    documentId: string;
    image: {
      url: string;
      width: number;
      name: string;
      height: number;
    };
  }[];
  sectionCategory: {
    sectionCategory: string;
  };
};

export type HomepageFeaturedQuery = {
  id: string;
  heading: string;
  logoImages: {
    height: number;
    url: string;
    width: number;
    name: string;
  }[];
  sectionCategory: {
    sectionCategory: string;
  };
};

export type JSONBlockMarkdownType = {
  type: string;
  children: [{ type: string; text: string }];
}[];

export type HomepageAboutSmallQuery = {
  id: string;
  heading: string;
  description: JSONBlockMarkdownType;
  cta: string;
  image: {
    height: number;
    url: string;
    width: number;
    name: string;
  };
  sectionCategory: {
    sectionCategory: string;
  };
};

export type HomepageSectionsQuery = {
  homepage: {
    Homepage: [
      HomepageAboutSmallQuery | HomepageFeaturedQuery | HomepageRecipeQuery
    ];
  };
};

// Homepage: {HomepageAboutSmallQuery | HomepageFeaturedQuery | HomepageRecipeQuery}[];
