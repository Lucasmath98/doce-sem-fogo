import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, LayoutGrid, CakeSlice, GraduationCap, ChevronRight } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { InstallButton } from "@/components/InstallButton";
import { recipes, categories } from "@/lib/recipes";
import { ebooks } from "@/lib/ebooks";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Receita Sem Fogo" },
      {
        name: "description",
        content: "Suas estatísticas e a instalação do app na tela de início.",
      },
      { property: "og:title", content: "Perfil — Receita Sem Fogo" },
      {
        property: "og:description",
        content: "Suas estatísticas e a instalação do app na tela de início.",
      },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const stats = [
    { icon: CakeSlice, label: "Receitas", value: recipes.length },
    { icon: LayoutGrid, label: "Categorias", value: categories.length },
    { icon: BookOpen, label: "Ebooks", value: ebooks.length },
  ];

  return (
    <MobileShell>
      <header className="bg-sweet-gradient rounded-b-[2rem] px-5 pb-8 pt-8 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-card text-3xl shadow-soft">
          🧁
        </div>
        <h1 className="mt-3 text-xl font-extrabold text-cocoa">Minha conta</h1>
        <p className="text-sm text-cocoa/70">Acesso vitalício ao pacote</p>
      </header>

      <main className="space-y-8 px-5 py-6">
        <section className="grid grid-cols-3 gap-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-3xl border border-border bg-card p-3 text-center shadow-card"
            >
              <Icon className="mx-auto size-5 text-gold" />
              <p className="mt-1.5 text-xl font-extrabold">{value}</p>
              <p className="text-[11px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </section>

        <Link
          to="/certificado"
          className="flex items-center gap-3 rounded-3xl border border-gold bg-card p-4 shadow-card transition-transform active:scale-[0.98]"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
            <GraduationCap className="size-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-extrabold text-cocoa">Meu Certificado</span>
            <span className="block text-xs text-muted-foreground">Personalize e baixe em PDF</span>
          </span>
          <ChevronRight className="size-5 text-muted-foreground" />
        </Link>

        <section className="rounded-3xl bg-muted p-5 text-center">
          <h2 className="text-base font-bold">Tenha o app no seu celular</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Instale na tela de início e abra suas receitas até sem internet.
          </p>
          <div className="mt-4">
            <InstallButton label="Baixar app" hideWhenInstalled />
          </div>
        </section>
      </main>
    </MobileShell>
  );
}
