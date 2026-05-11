# NomeClaro

Projeto em Next.js para um hub SEO-friendly de significado de nomes.

## Requisitos

- Node.js 20.9 ou superior
- npm

O projeto inclui `.nvmrc`, então você pode usar:

```bash
nvm use
npm install
npm run dev
```

Depois acesse `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Onde adicionar nomes

Edite `src/data/names.json`.

Cada item precisa seguir o tipo `NameEntry`, definido em `src/types/name.ts`, com:

- `name`
- `slug`
- `gender`
- `origin`
- `meaning`
- `description`
- `curiosities`
- `variations`
- `relatedNames`
- `categories`
- `metaTitle`
- `metaDescription`

As rotas individuais são geradas em `/significado-do-nome/[slug]`.

As categorias ficam em `src/data/categories.json` e precisam usar slugs compatíveis
com os valores aceitos em `src/types/name.ts`.

## Onde adicionar sobrenomes

Edite `src/data/surnames.json`.

Cada item precisa seguir o tipo `SurnameEntry`, definido em `src/types/surname.ts`, com:

- `surname`
- `slug`
- `origin`
- `meaning`
- `description`
- `history`
- `curiosities`
- `variations`
- `relatedSurnames`
- `categories`
- `metaTitle`
- `metaDescription`

As rotas individuais são geradas em `/sobrenomes/[slug]`.

As categorias de sobrenomes ficam em `src/data/surname-categories.json` e geram
rotas em `/categorias/sobrenomes/[slug]`.
