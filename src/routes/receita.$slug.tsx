import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Scale, BookOpen } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { RecipeVideo } from "@/components/RecipeVideo";
import { getRecipeBySlug } from "@/lib/recipes";
import { recipeImage } from "@/lib/recipe-images";
import { getRecipeVideo } from "@/lib/recipe-videos";

export const Route = createFileRoute("/receita/$slug")({
  loader: ({ params }) => {
    const recipe = getRecipeBySlug(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.recipe.title ?? "Receita";
    const description = loaderData
      ? `${title} — receita sem fogo do ebook ${loaderData.recipe.source_ebook}.`
      : "Receita indisponível.";
    return {
      meta: [
        { title: `${title} — Receita Sem Fogo` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — Receita Sem Fogo` },
        { property: "og:description", content: description },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ReceitaPage,
});

function ReceitaPage() {
  const { recipe } = Route.useLoaderData();
  const videoId = getRecipeVideo(recipe.title);

  return (
    <MobileShell>
      <div className="relative">
        <img
          src={recipeImage(recipe)}
          alt={recipe.title}
          width={1024}
          height={768}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-cocoa-gradient opacity-45" />
        <Link
          to="/"
          className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-card/90 shadow-card"
        >
          <ArrowLeft className="size-5" />
        </Link>
      </div>

      <main className="-mt-8 rounded-t-[2rem] bg-background px-5 pt-6">
        <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
          {recipe.category}
        </span>
        <h1 className="mt-3 text-2xl font-extrabold leading-tight">{recipe.title}</h1>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <BookOpen className="size-3.5" /> {recipe.source_ebook}
        </p>

        {(recipe.yield || recipe.validity) && (
          <div className="mt-4 space-y-2">
            {recipe.yield && (
              <div className="flex items-start gap-2 rounded-2xl bg-muted p-3 text-sm">
                <Scale className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{recipe.yield}</span>
              </div>
            )}
            {recipe.validity && (
              <div className="flex items-start gap-2 rounded-2xl bg-muted p-3 text-sm">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{recipe.validity}</span>
              </div>
            )}
          </div>
        )}

        {videoId && <RecipeVideo videoId={videoId} title={recipe.title} />}

        <section className="mt-7">
          <h2 className="text-lg font-bold">Ingredientes</h2>
          <ul className="mt-3 space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3 text-sm"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-rose" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7 pb-4">
          <h2 className="text-lg font-bold">Modo de preparo</h2>
          <ol className="mt-3 space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </MobileShell>
  );
}
