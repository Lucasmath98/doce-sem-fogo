import hero from "@/assets/hero-recheio.jpg";
import recheios from "@/assets/cat-recheios.jpg";
import brigadeiros from "@/assets/cat-brigadeiros.jpg";
import type { Recipe } from "./recipes";

export const images = { hero, recheios, brigadeiros };

export function recipeImage(recipe: Pick<Recipe, "title" | "category">): string {
  if (recipe.category === "Brigadeiro") return brigadeiros;
  const t = recipe.title.toLowerCase();
  if (t.includes("branco") || t.includes("morango") || t.includes("frutas") || t.includes("pistache")) {
    return recheios;
  }
  return hero;
}
