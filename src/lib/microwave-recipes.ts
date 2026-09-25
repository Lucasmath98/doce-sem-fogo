export interface MicrowaveRecipe {
  id: number;
  slug: string;
  title: string;
  videoId: string;
  duration: string;
  channel: string;
}

const raw: [string, string, string, string][] = [
  ["Bolo de Caneca de Chocolate", "lHzyqCG6GAU", "2:53", "Receitas Para Iniciantes"],
  ["Bolo de Chocolate de Micro-ondas", "S-X0y0PKREg", "6:13", "Cozinhando Do Zero - Com Laura Lopez"],
  ["Bolo de Cenoura de Micro-ondas", "1Di-83qjVQM", "8:22", "Receitas"],
  ["Pudim de Micro-ondas", "wtcjg6LM58E", "4:31", "Manual do Mundo"],
  ["Brownie de Micro-ondas", "eGJht1WFbQQ", "4:49", "Marcela Maia"],
  ["Cookie de Micro-ondas", "cOSphjcZe50", "5:46", "Marcela Maia"],
  ["Doce de Leite de Micro-ondas", "qqePvCTsyKY", "1:52", "Panelaterapia"],
  ["Cocada de Micro-ondas", "xzYB7M9Pr9Q", "3:29", "Cozinha da Cátia"],
  ["Pão de Mel Fit de Micro-ondas", "Y_3cEaQZXkY", "3:53", "Gabriela Zamboni"],
  ["Palha Italiana de Micro-ondas", "CeN1lpH4wK8", "4:52", "Mexeu Tá Pronto by Silvia Branconaro"],
  ["Brigadeirão de Micro-ondas", "PttCXzK-EFM", "4:15", "Cozinha do Bom Gosto - Gabriela Rossi"],
  ["Quindim de Micro-ondas", "hUstiC-o7hI", "4:50", "Cozinha da Cátia"],
  ["Pé de Moleque de Micro-ondas", "SR5Sh3I-X9o", "5:32", "Cozinha da Cátia"],
  ["Cheesecake de Micro-ondas", "uAf-smriW5I", "4:35", "Jess Carter"],
  ["Arroz Doce de Micro-ondas", "u74ZHPTzsf0", "5:28", "Receitas Da Cris"],
  ["Curau de Micro-ondas", "EJwrTZEn660", "3:27", "Aline Fernandes Nogueira dos Santos"],
  ["Doce de Abóbora de Micro-ondas", "Xd5l1X1dEu4", "0:59", "Receitas de Minuto por Chef Gi Souza"],
  ["Mousse de Chocolate de Micro-ondas", "9aGq_u6Ip7Y", "1:42", "by Monaco"],
  ["Beijinho de Micro-ondas", "YkAlZFmkZxI", "14:25", "Manual do Mundo"],
  ["Brigadeiro de Colher de Micro-ondas", "2u-ue_P66z4", "3:56", "Marcela Maia"],
  ["Bolo de Banana de Caneca", "FS6CyuMlMZs", "5:15", "Ari Guzela"],
  ["Bolo de Fubá de Micro-ondas", "KJTve-gkHZE", "7:39", "Projeto Cabelão 90 dias"],
  ["Palha Italiana de Paçoca de Micro-ondas", "Y8rYa0olDeE", "5:22", "Luiz Gustavo"],
];

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const microwaveRecipes: MicrowaveRecipe[] = raw.map(([title, videoId, duration, channel], i) => ({
  id: i + 1,
  slug: slugify(title),
  title,
  videoId,
  duration,
  channel,
}));

export const microwaveCover = "https://i.ytimg.com/vi/wtcjg6LM58E/hqdefault.jpg";
export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const getMicrowaveBySlug = (slug: string) => microwaveRecipes.find((r) => r.slug === slug);
