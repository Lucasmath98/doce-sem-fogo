import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, BookOpen, User } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/categorias", label: "Categorias", icon: LayoutGrid },
  { to: "/ebooks", label: "Ebooks", icon: BookOpen },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function MobileShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-24 shadow-[0_0_60px_rgba(90,46,34,0.08)]">
        {children}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40">
        <div className="mx-auto flex max-w-[430px] items-stretch justify-around border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur">
          {tabs.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-accent" : ""
                  }`}
                >
                  <Icon className="size-[18px]" />
                </span>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
