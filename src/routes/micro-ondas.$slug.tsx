import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Play } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { RecipeVideo } from "@/components/RecipeVideo";
import { getMicrowaveBySlug } from "@/lib/microwave-recipes";

export const Route = createFileRoute("/micro-ondas/$slug")({
  loader: ({ params }) => {
    const recipe = getMicrowaveBySlug(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.recipe.title ?? "Receita";
    const description = loaderData ? `${title} — receita de micro-ondas em vídeo.` : "Receita indisponível.";
    return {
      meta: [
        { title: `${title} — Receita Sem Fogo` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — Receita Sem Fogo` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: MicroondasDetail,
});

function MicroondasDetail() {
  const { recipe } = Route.useLoaderData();
  return (
    <MobileShell>
      <header className="bg-sweet-gradient rounded-b-[2rem] px-5 pb-6 pt-6">
        <Link to="/micro-ondas" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-cocoa/70">
          <ArrowLeft className="size-4" /> Micro-ondas
        </Link>
        <h1 className="text-2xl font-extrabold leading-tight text-cocoa">{recipe.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
            <Play className="size-3 fill-current" /> Receita em vídeo
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1 text-[11px] font-bold">
            <Clock className="size-3 text-gold" /> {recipe.duration}
          </span>
        </div>
      </header>
      <main className="px-5 pb-4">
        <RecipeVideo key={recipe.videoId} videoId={recipe.videoId} title={recipe.title} />
        <p className="mt-3 text-xs text-muted-foreground">Vídeo: {recipe.channel}</p>
      </main>
    </MobileShell>
  );
}
