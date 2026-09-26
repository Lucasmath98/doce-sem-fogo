import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Award, Download } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { createCertificatePdf } from "@/lib/certificate-pdf";

const STORAGE_KEY = "receita-sem-fogo-certificate-name";

export const Route = createFileRoute("/certificado")({
  head: () => ({
    meta: [
      { title: "Meu Certificado — Receita Sem Fogo" },
      {
        name: "description",
        content: "Personalize e baixe seu certificado de conclusão do Receita Sem Fogo.",
      },
      { property: "og:title", content: "Meu Certificado — Receita Sem Fogo" },
      {
        property: "og:description",
        content: "Personalize e baixe seu certificado de conclusão do Receita Sem Fogo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CertificatePage,
});

function hasMinimumLetters(value: string) {
  return (value.match(/\p{L}/gu) ?? []).length >= 3;
}

function CertificatePage() {
  const [name, setName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setName(localStorage.getItem(STORAGE_KEY) ?? "");
    } catch {
      // Storage may be unavailable in private browsing; the certificate still works.
    }
  }, []);

  const trimmedName = name.trim();
  const isValid = hasMinimumLetters(trimmedName);
  const previewName = trimmedName || "Seu nome completo";
  const nameSizeClass = useMemo(() => {
    if (previewName.length > 48) return "text-[clamp(8px,2.8vw,17px)]";
    if (previewName.length > 32) return "text-[clamp(14px,4.2vw,24px)]";
    return "text-[clamp(17px,5vw,29px)]";
  }, [previewName]);

  function updateName(value: string) {
    const nextName = value.slice(0, 60);
    setName(nextName);
    try {
      localStorage.setItem(STORAGE_KEY, nextName);
    } catch {
      // Keep the live form usable if storage is blocked.
    }
  }

  async function downloadCertificate() {
    if (!isValid || isGenerating) return;
    setIsGenerating(true);
    setError("");
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const iosWindow = isIOS ? window.open("", "_blank") : null;

    try {
      const { blob, filename } = await createCertificatePdf(trimmedName);
      const url = URL.createObjectURL(blob);
      if (isIOS && iosWindow) {
        iosWindow.location.href = url;
      } else {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      iosWindow?.close();
      setError("Não foi possível gerar o certificado. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <MobileShell>
      <header className="bg-sweet-gradient rounded-b-[2rem] px-5 pb-7 pt-6">
        <Link to="/perfil" className="inline-flex items-center gap-1 text-xs font-semibold text-cocoa/70">
          <ArrowLeft className="size-4" /> Voltar
        </Link>
        <div className="mt-5 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-card">
            <Award className="size-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-cocoa">Meu Certificado</h1>
            <p className="text-xs text-cocoa/70">Personalize e baixe sua conclusão</p>
          </div>
        </div>
      </header>

      <main className="space-y-6 px-5 py-6">
        <section>
          <label htmlFor="certificate-name" className="text-sm font-bold text-foreground">
            Seu nome completo
          </label>
          <input
            id="certificate-name"
            value={name}
            onChange={(event) => updateName(event.target.value)}
            maxLength={60}
            autoComplete="name"
            placeholder="Digite como deseja no certificado"
            className="mt-2 h-12 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
            <span>{name.length > 0 && !isValid ? "Digite pelo menos 3 letras" : "O nome aparece na prévia abaixo"}</span>
            <span>{name.length}/60</span>
          </div>
        </section>

        <section aria-label="Prévia do certificado">
          <h2 className="mb-3 text-sm font-bold">Prévia</h2>
          <div className="aspect-[297/210] w-full bg-card p-1.5 shadow-soft">
            <div className="relative flex size-full flex-col items-center justify-center overflow-hidden border-2 border-primary p-2 text-center">
              <div className="absolute inset-1 border border-gold" />
              <div className="absolute left-0 top-0 size-10 bg-secondary [clip-path:polygon(0_0,100%_0,0_100%)]" />
              <div className="absolute right-0 top-0 size-10 bg-secondary [clip-path:polygon(0_0,100%_0,100%_100%)]" />
              <div className="relative flex size-8 items-center justify-center rounded-full border border-card bg-gold text-[8px] font-extrabold text-gold-foreground">
                RSF
              </div>
              <p className="relative mt-2 text-[clamp(8px,2.4vw,13px)] font-extrabold text-cocoa">
                CERTIFICADO DE CONCLUSÃO
              </p>
              <div className="relative mt-1 h-px w-1/3 bg-gold" />
              <p className="relative mt-2 text-[clamp(6px,1.8vw,9px)] text-muted-foreground">Certificamos que</p>
              <p className={`relative mt-0.5 max-w-[92%] whitespace-nowrap font-serif text-cocoa ${nameSizeClass}`}>{previewName}</p>
              <p className="relative mt-1 max-w-[82%] text-[clamp(5px,1.55vw,8px)] leading-snug text-muted-foreground">
                concluiu com êxito o curso Receita Sem Fogo: Recheios, Brigadeiros e Doces de Micro-ondas, com carga horária de 20 horas.
              </p>
              <div className="relative mt-3 w-1/3 border-t border-primary pt-1 text-[clamp(5px,1.5vw,8px)] font-serif text-cocoa">
                Receita Sem Fogo
              </div>
            </div>
          </div>
        </section>

        <Button
          type="button"
          onClick={downloadCertificate}
          disabled={!isValid || isGenerating}
          className="h-12 w-full rounded-2xl font-bold shadow-soft"
        >
          <Download className="size-4" />
          {isGenerating ? "Gerando certificado..." : "Baixar certificado (PDF)"}
        </Button>
        {error ? <p role="alert" className="text-center text-xs font-semibold text-destructive">{error}</p> : null}
      </main>
    </MobileShell>
  );
}