import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { MicrowaveCard } from "@/components/MicrowaveCard";
import { microwaveRecipes } from "@/lib/microwave-recipes";

export const Route = createFileRoute("/micro-ondas/")({
  head: () => ({
    meta: [
      { title: "Receitas de Micro-ondas — Receita Sem Fogo" },
      { name: "description", content: "23 doces práticos feitos no micro-ondas, em vídeo." },
      { property: "og:title", content: "Receitas de Micro-ondas — Receita Sem Fogo" },
      { property: "og:description", content: "23 doces práticos feitos no micro-ondas, em vídeo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MicroondasPage,
});

function MicroondasPage() {
  const [query, setQuery] = useState("");
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? microwaveRecipes.filter((r) => r.title.toLowerCase().includes(q)) : microwaveRecipes;
  }, [query]);

  return (
    <MobileShell>
      <header className="bg-sweet-gradient rounded-b-[2rem] px-5 pb-6 pt-6">
        <Link to="/categorias" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-cocoa/70">
          <ArrowLeft className="size-4" /> Voltar
        </Link>
        <h1 className="text-2xl font-extrabold text-cocoa">Receitas de Micro-ondas</h1>
        <p className="mt-1 text-sm text-cocoa/70">{microwaveRecipes.length} receitas em vídeo</p>
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
      <main className="px-5 py-6">
        {list.length === 0 ? (
          <p className="pt-10 text-center text-sm text-muted-foreground">Nenhuma receita encontrada.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {list.map((r) => <MicrowaveCard key={r.id} recipe={r} />)}
          </div>
        )}
      </main>
    </MobileShell>
  );
}
