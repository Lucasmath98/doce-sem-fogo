import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes, categories, recipesByCategorySlug } from "@/lib/recipes";
import { images } from "@/lib/recipe-images";
import { InstallButton } from "@/components/InstallButton";
import { Sparkles, ChevronRight } from "lucide-react";
import { MicrowaveCard } from "@/components/MicrowaveCard";
import { microwaveRecipes, microwaveCover } from "@/lib/microwave-recipes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Receita Sem Fogo — Recheios e Brigadeiros sem cozimento" },
      {
        name: "description",
        content:
          "Sua biblioteca de recheios e brigadeiros que não vão ao fogo, com os ebooks originais para baixar.",
      },
      { property: "og:title", content: "Receita Sem Fogo" },
      {
        property: "og:description",
        content: "Recheios e brigadeiros sem cozimento, na palma da sua mão.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const destaque = recipes[0];

  return (
    <MobileShell>
      <header className="bg-sweet-gradient rounded-b-[2rem] px-5 pb-8 pt-8">
        <p className="text-sm font-semibold text-cocoa/70">Olá, confeiteira 👋</p>
        <h1 className="mt-1 text-2xl font-extrabold text-cocoa">Receita Sem Fogo</h1>
        <p className="mt-1 text-sm text-cocoa/70">
          Doces incríveis sem precisar ligar o fogão.
        </p>
      </header>

      <main className="space-y-8 px-5 py-6">
        <InstallButton label="Baixar app" hideWhenInstalled />
        {destaque ? (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-gold" />
              <h2 className="text-base font-bold">Destaque de hoje</h2>
            </div>
            <Link
              to="/receita/$slug"
              params={{ slug: destaque.slug }}
              className="block overflow-hidden rounded-3xl shadow-soft"
            >
              <div className="relative">
                <img
                  src={images.hero}
                  alt={destaque.title}
                  width={1024}
                  height={768}
                  className="h-44 w-full object-cover"
                />
                <div className="absolute inset-0 bg-cocoa-gradient opacity-60" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-foreground">
                    {destaque.category}
                  </span>
                  <h3 className="mt-2 text-lg font-extrabold text-primary-foreground">
                    {destaque.title}
                  </h3>
                </div>
              </div>
            </Link>
          </section>
        ) : null}

        <section>
          <h2 className="mb-3 text-base font-bold">Categorias</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-card"
              >
                <img
                  src={c.slug === "recheios" ? images.recheios : images.brigadeiros}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-24 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {recipesByCategorySlug(c.slug).length} receitas
                  </p>
                </div>
              </Link>
            ))}
            <Link
              to="/micro-ondas"
              className="col-span-2 overflow-hidden rounded-3xl border border-border bg-card shadow-card"
            >
              <img src={microwaveCover} alt="Micro-ondas" loading="lazy" className="h-28 w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-bold">Micro-ondas</p>
                <p className="text-[11px] text-muted-foreground">
                  {microwaveRecipes.length} receitas em vídeo
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Receitas de Micro-ondas</h2>
            <Link to="/micro-ondas" className="flex items-center text-xs font-semibold text-muted-foreground">
              ver tudo <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
            {microwaveRecipes.map((r) => (
              <MicrowaveCard key={r.id} recipe={r} className="w-44 shrink-0" />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Todas as receitas</h2>
            <Link
              to="/categorias"
              className="flex items-center text-xs font-semibold text-muted-foreground"
            >
              ver tudo <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      </main>
    </MobileShell>
  );
}
