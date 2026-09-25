import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { categories, recipesByCategorySlug } from "@/lib/recipes";
import { images } from "@/lib/recipe-images";
import { microwaveRecipes, microwaveCover } from "@/lib/microwave-recipes";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias — Receita Sem Fogo" },
      {
        name: "description",
        content: "Escolha entre recheios e brigadeiros sem cozimento.",
      },
      { property: "og:title", content: "Categorias — Receita Sem Fogo" },
      {
        property: "og:description",
        content: "Escolha entre recheios e brigadeiros sem cozimento.",
      },
    ],
  }),
  component: Categorias,
});

function Categorias() {
  return (
    <MobileShell>
      <header className="bg-sweet-gradient rounded-b-[2rem] px-5 pb-7 pt-8">
        <h1 className="text-2xl font-extrabold text-cocoa">Categorias</h1>
        <p className="mt-1 text-sm text-cocoa/70">Escolha o que você quer fazer hoje.</p>
      </header>

      <main className="space-y-4 px-5 py-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/categoria/$slug"
            params={{ slug: c.slug }}
            className="block overflow-hidden rounded-3xl shadow-soft"
          >
            <div className="relative">
              <img
                src={c.slug === "recheios" ? images.recheios : images.brigadeiros}
                alt={c.name}
                loading="lazy"
                width={1024}
                height={768}
                className="h-40 w-full object-cover"
              />
              <div className="absolute inset-0 bg-cocoa-gradient opacity-55" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h2 className="text-xl font-extrabold text-primary-foreground">{c.name}</h2>
                <p className="text-xs text-primary-foreground/80">{c.description}</p>
                <span className="mt-2 inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-gold-foreground">
                  {recipesByCategorySlug(c.slug).length} receitas
                </span>
              </div>
            </div>
          </Link>
        ))}
        <Link to="/micro-ondas" className="block overflow-hidden rounded-3xl shadow-soft">
          <div className="relative">
            <img src={microwaveCover} alt="Micro-ondas" loading="lazy" className="h-40 w-full object-cover" />
            <div className="absolute inset-0 bg-cocoa-gradient opacity-55" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h2 className="text-xl font-extrabold text-primary-foreground">Micro-ondas</h2>
              <p className="text-xs text-primary-foreground/80">Doces práticos, receitas em vídeo.</p>
              <span className="mt-2 inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-gold-foreground">
                {microwaveRecipes.length} receitas em vídeo
              </span>
            </div>
          </div>
        </Link>
      </main>
    </MobileShell>
  );
}
