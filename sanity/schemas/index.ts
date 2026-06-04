import type { SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { category } from "./category";
import { gene } from "./gene";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, category, gene],
};
