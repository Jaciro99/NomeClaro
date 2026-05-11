export type NameGender = "masculino" | "feminino" | "unissex";

export type NameCategory =
  | "masculinos"
  | "femininos"
  | "biblicos"
  | "curtos"
  | "diferentes"
  | "classicos"
  | "internacionais";

export type NameEntry = {
  name: string;
  slug: string;
  gender: NameGender;
  origin: string;
  meaning: string;
  description: string;
  curiosities: string[];
  variations: string[];
  relatedNames: string[];
  categories: NameCategory[];
  metaTitle: string;
  metaDescription: string;
};

export type CategoryInfo = {
  slug: NameCategory;
  title: string;
  description: string;
};
