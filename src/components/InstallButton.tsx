import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { Download, Share, PlusSquare, Check } from "lucide-react";

export function InstallButton({ label = "Instalar Receita Sem Fogo" }: { label?: string }) {
  const { install, isIOS, isInstalled, showIOSHelp, setShowIOSHelp } = usePwaInstall();

  if (isInstalled) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground">
        <Check className="size-4" /> App já instalado
      </div>
    );
  }

  return (
    <>
      <button
        onClick={install}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
      >
        <Download className="size-4" />
        {label}
      </button>

      <Dialog open={showIOSHelp} onOpenChange={setShowIOSHelp}>
        <DialogContent className="max-w-[360px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              Adicionar à Tela de Início
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              {isIOS
                ? "No iPhone, a instalação é feita pelo Safari em 3 passinhos:"
                : "Para instalar pelo seu navegador, siga os passos:"}
            </p>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <Share className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  Toque no botão <strong>Compartilhar</strong> na barra do navegador.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <PlusSquare className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  Escolha <strong>Adicionar à Tela de Início</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  Confirme em <strong>Adicionar</strong> e pronto, o app fica no seu celular.
                </span>
              </li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
