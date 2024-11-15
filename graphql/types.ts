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
  children: { type: string; text: string }[];
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

export type RecipesQuery = {
  recipes: {
    documentId: string;
    name: string;
    description: string;
    prepTime: number | null;
    cookTime: number | null;
    restTime: number | null;
    settingTime: number | null;
    servings: number | null;
    calories: number | null;
    image: {
      url: string;
    };
    video: string | null;
    categories: {
      name: string;
    }[];
    courses: {
      name: string;
    }[];
    ingredients: string;
    instructions: string;
    recipeNotes: string | null;
    videoId: string | null;
    author: {
      name: string;
      documentId: string;
    };
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  }[];
};

export type RelatedRecipesQuery = {
  recipes: {
    documentId: string;
    name: string;
    image: {
      url: string;
    };
  }[];
};

export type CategoriesQuery = {
  categories: {
    name: string;
    documentId: string;
  }[];
};

export type CoursesQuery = {
  courses: {
    name: string;
    documentId: string;
  }[];
};

export type AuthorsQuery = {
  authors: {
    name: string;
    documentId: string;
  }[];
};

export type CategoryCoursesAuthorsQuery = CoursesQuery &
  AuthorsQuery &
  CategoriesQuery;
