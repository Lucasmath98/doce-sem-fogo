import { Link } from "@tanstack/react-router";
import { Clock, Play } from "lucide-react";
import { ytThumb, type MicrowaveRecipe } from "@/lib/microwave-recipes";

export function MicrowaveCard({ recipe, className = "" }: { recipe: MicrowaveRecipe; className?: string }) {
  return (
    <Link
      to="/micro-ondas/$slug"
      params={{ slug: recipe.slug }}
      className={`block overflow-hidden rounded-3xl border border-border bg-card shadow-card ${className}`}
    >
      <div className="relative">
        <img src={ytThumb(recipe.videoId)} alt={recipe.title} loading="lazy" className="aspect-video w-full object-cover" />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
          <Play className="size-2.5 fill-current" /> Vídeo
        </span>
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-bold text-card-foreground">
          <Clock className="size-2.5" /> {recipe.duration}
        </span>
      </div>
      <p className="line-clamp-2 p-3 text-sm font-bold leading-snug">{recipe.title}</p>
    </Link>
  );
}
