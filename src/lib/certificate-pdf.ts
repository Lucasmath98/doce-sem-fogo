import certificateSerifUrl from "@/assets/CertificateSerif.ttf?url";

const PAGE_WIDTH = 297;
const PAGE_HEIGHT = 210;

function bufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function makeVerificationCode(date: Date) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = new Uint8Array(6);
  crypto.getRandomValues(values);
  const suffix = Array.from(values, (value) => alphabet[value % alphabet.length]).join("");
  return `RSF-${date.getFullYear()}-${suffix}`;
}

function safeFilename(name: string) {
  return name.replace(/[\\/:*?"<>|]/g, "").trim();
}

export async function createCertificatePdf(name: string) {
  const [{ jsPDF }, fontResponse] = await Promise.all([
    import("jspdf"),
    fetch(certificateSerifUrl),
  ]);
  if (!fontResponse.ok) throw new Error("Não foi possível carregar a fonte do certificado.");

  const fontBase64 = bufferToBase64(await fontResponse.arrayBuffer());
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  pdf.addFileToVFS("CertificateSerif.ttf", fontBase64);
  pdf.addFont("CertificateSerif.ttf", "CertificateSerif", "normal");

  const chocolate = [90, 46, 34] as const;
  const rose = [239, 211, 213] as const;
  const gold = [190, 143, 47] as const;
  const paper = [255, 251, 247] as const;
  const muted = [118, 91, 82] as const;

  pdf.setFillColor(...paper);
  pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");
  pdf.setDrawColor(...chocolate);
  pdf.setLineWidth(1.2);
  pdf.rect(8, 8, PAGE_WIDTH - 16, PAGE_HEIGHT - 16);
  pdf.setDrawColor(...gold);
  pdf.setLineWidth(0.45);
  pdf.rect(11, 11, PAGE_WIDTH - 22, PAGE_HEIGHT - 22);
  pdf.setFillColor(...rose);
  pdf.triangle(8, 8, 39, 8, 8, 39, "F");
  pdf.triangle(PAGE_WIDTH - 8, 8, PAGE_WIDTH - 39, 8, PAGE_WIDTH - 8, 39, "F");
  pdf.triangle(8, PAGE_HEIGHT - 8, 39, PAGE_HEIGHT - 8, 8, PAGE_HEIGHT - 39, "F");
  pdf.triangle(
    PAGE_WIDTH - 8,
    PAGE_HEIGHT - 8,
    PAGE_WIDTH - 39,
    PAGE_HEIGHT - 8,
    PAGE_WIDTH - 8,
    PAGE_HEIGHT - 39,
    "F",
  );

  const centerX = PAGE_WIDTH / 2;
  pdf.setFillColor(...gold);
  pdf.circle(centerX, 31, 10, "F");
  pdf.setDrawColor(...paper);
  pdf.setLineWidth(0.7);
  pdf.circle(centerX, 31, 7.3, "S");
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...paper);
  pdf.setFontSize(13);
  pdf.text("RSF", centerX, 32.5, { align: "center" });

  pdf.setTextColor(...chocolate);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("CERTIFICADO DE CONCLUSÃO", centerX, 55, { align: "center", charSpace: 1.2 });
  pdf.setDrawColor(...gold);
  pdf.setLineWidth(0.65);
  pdf.line(93, 61, 204, 61);

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...muted);
  pdf.setFontSize(12);
  pdf.text("Certificamos que", centerX, 75, { align: "center" });

  pdf.setFont("CertificateSerif", "normal");
  pdf.setTextColor(...chocolate);
  let nameSize = 30;
  pdf.setFontSize(nameSize);
  while (pdf.getTextWidth(name) > 235 && nameSize > 17) {
    nameSize -= 1;
    pdf.setFontSize(nameSize);
  }
  pdf.text(name, centerX, 97, { align: "center" });
  pdf.setDrawColor(...rose);
  pdf.setLineWidth(0.5);
  pdf.line(63, 104, 234, 104);

  const courseText =
    "concluiu com êxito o curso Receita Sem Fogo: Recheios, Brigadeiros e Doces de Micro-ondas, com carga horária de 20 horas.";
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...muted);
  pdf.setFontSize(11.5);
  const bodyLines = pdf.splitTextToSize(courseText, 205) as string[];
  pdf.text(bodyLines, centerX, 119, { align: "center", lineHeightFactor: 1.45 });

  const now = new Date();
  pdf.setFontSize(10.5);
  pdf.text(formatDate(now), centerX, 145, { align: "center" });

  pdf.setDrawColor(...chocolate);
  pdf.setLineWidth(0.4);
  pdf.line(108, 169, 189, 169);
  pdf.setFont("CertificateSerif", "normal");
  pdf.setTextColor(...chocolate);
  pdf.setFontSize(12);
  pdf.text("Receita Sem Fogo", centerX, 177, { align: "center" });

  const verificationCode = makeVerificationCode(now);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...muted);
  pdf.setFontSize(7.5);
  pdf.text(`Código de verificação: ${verificationCode}`, 17, 195);
  pdf.text("Carga horária: 20 horas", PAGE_WIDTH - 17, 195, { align: "right" });

  return {
    blob: pdf.output("blob"),
    filename: `Certificado - ${safeFilename(name)}.pdf`,
    verificationCode,
  };
}