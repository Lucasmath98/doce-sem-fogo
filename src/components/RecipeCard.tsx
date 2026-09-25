import { Link } from "@tanstack/react-router";
import { ChevronRight, Play } from "lucide-react";
import type { Recipe } from "@/lib/recipes";
import { recipeImage } from "@/lib/recipe-images";
import { getRecipeVideo } from "@/lib/recipe-videos";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const hasVideo = Boolean(getRecipeVideo(recipe.title));

  return (
    <Link
      to="/receita/$slug"
      params={{ slug: recipe.slug }}
      className="flex items-center gap-3 rounded-3xl border border-border bg-card p-3 shadow-card transition-transform active:scale-[0.99]"
    >
      <img
        src={recipeImage(recipe)}
        alt={recipe.title}
        loading="lazy"
        width={1024}
        height={768}
        className="size-[72px] shrink-0 rounded-2xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-bold leading-snug">{recipe.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{recipe.source_ebook}</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
            {recipe.category}
          </span>
          {hasVideo && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
              <Play className="size-2.5 fill-current" /> Vídeo
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
    </Link>
  );
}
