import cover1 from "@/assets/ebook-1.jpg";
import cover2 from "@/assets/ebook-2.jpg";
import cover3 from "@/assets/ebook-3.jpg";
import cover4 from "@/assets/ebook-4.jpg";
import cover5 from "@/assets/ebook-5.jpg";

export type Ebook = {
  title: string;
  file: string;
  cover: string;
  subtitle: string;
};

export const ebooks: Ebook[] = [
  {
    title: "Recheios Lucrativos que Não Vão ao Fogo",
    file: import.meta.env.BASE_URL + "ebooks/recheios-lucrativos-1.pdf",
    cover: cover1,
    subtitle: "Ganaches, cremes e mousses sem cozimento",
  },
  {
    title: "Recheios Rentáveis Que Não Precisam de Cozimento",
    file: import.meta.env.BASE_URL + "ebooks/recheios-rentaveis.pdf",
    cover: cover2,
    subtitle: "Receitas rápidas com alto lucro",
  },
  {
    title: "Brigadeiro Sem Fogo",
    file: import.meta.env.BASE_URL + "ebooks/brigadeiro-sem-fogo.pdf",
    cover: cover3,
    subtitle: "O clássico feito sem panela",
  },
  {
    title: "Receitas de Brigadeiros",
    file: import.meta.env.BASE_URL + "ebooks/receitas-brigadeiros.pdf",
    cover: cover4,
    subtitle: "Sabores gourmet para vender",
  },
  {
    title: "Recheios Lucrativos (linha Moça)",
    file: import.meta.env.BASE_URL + "ebooks/recheios-moca.pdf",
    cover: cover5,
    subtitle: "Cremes cremosos com leite condensado",
  },
];
