export type SurnameCategory =
  | "brasileiros"
  | "portugueses"
  | "italianos"
  | "espanhóis"
  | "japoneses"
  | "alemães"
  | "franceses"
  | "populares"
  | "raros"
  | "internacionais";

export type SurnameEntry = {
  surname: string;
  slug: string;
  origin: string;
  meaning: string;
  description: string;
  history: string;
  curiosities: string[];
  variations: string[];
  relatedSurnames: string[];
  categories: SurnameCategory[];
  metaTitle: string;
  metaDescription: string;
};

export type SurnameCategoryInfo = {
  slug: SurnameCategory;
  title: string;
  description: string;
};
