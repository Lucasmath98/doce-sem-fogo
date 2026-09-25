import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { RecipeCard } from "@/components/RecipeCard";
import { categories, recipesByCategorySlug } from "@/lib/recipes";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { name: cat.name, description: cat.description };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Categoria";
    return {
      meta: [
        { title: `${name} — Receita Sem Fogo` },
        {
          name: "description",
          content: loaderData?.description ?? "Receitas sem cozimento.",
        },
        { property: "og:title", content: `${name} — Receita Sem Fogo` },
        {
          property: "og:description",
          content: loaderData?.description ?? "Receitas sem cozimento.",
        },
      ],
    };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { slug } = Route.useParams();
  const { name } = Route.useLoaderData();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const all = recipesByCategorySlug(slug);
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((r) => r.title.toLowerCase().includes(q));
  }, [slug, query]);

  return (
    <MobileShell>
      <header className="bg-sweet-gradient rounded-b-[2rem] px-5 pb-6 pt-6">
        <Link
          to="/categorias"
          className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-cocoa/70"
        >
          <ArrowLeft className="size-4" /> Voltar
        </Link>
        <h1 className="text-2xl font-extrabold text-cocoa">{name}</h1>
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar receita pelo nome..."
            className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none ring-ring/40 focus:ring-2"
          />
        </div>
      </header>

      <main className="space-y-3 px-5 py-6">
        {list.length === 0 ? (
          <p className="pt-10 text-center text-sm text-muted-foreground">
            Nenhuma receita encontrada.
          </p>
        ) : (
          list.map((r) => <RecipeCard key={r.id} recipe={r} />)
        )}
      </main>
    </MobileShell>
  );
}
