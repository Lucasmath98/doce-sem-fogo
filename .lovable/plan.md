# Certificado de conclusão

## O que será criado
- Nova tela **Meu Certificado** em `/certificado`, acessível pela Início e pelo Perfil.
- Campo para nome completo, com validação, limite de 60 caracteres e recuperação segura do último nome digitado.
- Prévia responsiva e ao vivo do certificado em formato paisagem.
- Download de um PDF A4 paisagem em alta qualidade, criado no próprio aparelho, com alternativa de abertura em nova aba no iPhone.

## Aparência e conteúdo
- Certificado nas cores atuais do app, com borda dupla, selo dourado, nome em fonte serifada e ajuste automático para nomes longos.
- Texto, data em português, assinatura e código curto de verificação conforme solicitado.
- Nenhuma alteração nas receitas, vídeos ou demais conteúdos.

## Detalhes técnicos
- Adicionar `jspdf` e incorporar uma fonte serifada no arquivo PDF.
- Desenhar o PDF diretamente no jsPDF para manter texto e ornamentos nítidos.
- Criar a miniatura com HTML/CSS usando os mesmos dados e proporções do PDF.
- Incluir metadados próprios da nova rota e manter a navegação compatível com o caminho do GitHub Pages.

## Verificação
- Gerar e inspecionar visualmente um PDF com nome de exemplo.
- Conferir a nova tela em tamanho de celular, os dois atalhos e a validação do botão.
- Confirmar a compilação final e o build para GitHub Pages.
