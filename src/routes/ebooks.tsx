import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { ebooks } from "@/lib/ebooks";

export const Route = createFileRoute("/ebooks")({
  head: () => ({
    meta: [
      { title: "Meus Ebooks — Receita Sem Fogo" },
      {
        name: "description",
        content: "Baixe os 5 ebooks originais de recheios e brigadeiros sem fogo.",
      },
      { property: "og:title", content: "Meus Ebooks — Receita Sem Fogo" },
      {
        property: "og:description",
        content: "Baixe os 5 ebooks originais de recheios e brigadeiros sem fogo.",
      },
    ],
  }),
  component: Ebooks,
});

function Ebooks() {
  return (
    <MobileShell>
      <header className="bg-sweet-gradient rounded-b-[2rem] px-5 pb-7 pt-8">
        <h1 className="text-2xl font-extrabold text-cocoa">Meus Ebooks</h1>
        <p className="mt-1 text-sm text-cocoa/70">
          Baixe os arquivos originais do seu pacote.
        </p>
      </header>

      <main className="space-y-4 px-5 py-6">
        {ebooks.map((e) => (
          <div
            key={e.file}
            className="flex gap-4 rounded-3xl border border-border bg-card p-3 shadow-card"
          >
            <img
              src={e.cover}
              alt={e.title}
              loading="lazy"
              width={768}
              height={1024}
              className="h-[120px] w-[90px] shrink-0 rounded-2xl object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <h2 className="text-[15px] font-bold leading-snug">{e.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{e.subtitle}</p>
              <a
                href={e.file}
                download
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-transform active:scale-[0.98]"
              >
                <Download className="size-4" /> Baixar PDF
              </a>
            </div>
          </div>
        ))}
      </main>
    </MobileShell>
  );
}
