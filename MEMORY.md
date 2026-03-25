# Memory

## Resumo do projeto

- Nome: `Calculadora do SUS`
- Tipo: aplicacao Angular com SSR e deploy estatico no GitHub Pages
- Objetivo: mostrar, de forma educativa, uma estimativa de quanto da renda mensal financia o SUS via impostos

## Estado atual

- O produto esta funcional como landing page calculadora de pagina unica.
- A logica principal esta concentrada em [`src/app/app.ts`](E:/Projetos/calculadora-do-sus/src/app/app.ts).
- A interface inteira esta em [`src/app/app.html`](E:/Projetos/calculadora-do-sus/src/app/app.html).
- O repositorio parece ter sido iniciado a partir de um template de AI Studio e ainda carrega sobras desse bootstrap.

## Regras de negocio implementadas

- Entrada do usuario: renda mensal com mascara monetaria `pt-BR`.
- Enquadramento: feito por comparacao sequencial com `taxBrackets`.
- Imposto estimado total: `renda * avgTaxPercent / 100`.
- Discriminacao da carga: `renda * consumptionTaxPercent / 100` para consumo e `renda * incomeTaxPercent / 100` para IR.
- Parcela atribuida ao SUS: `12%` do imposto estimado total.
- Percentual da renda destinado ao SUS: `avgTaxPercent * 0.12`.
- Custo per capita do SUS exibido na UI: valor fixo aproximado de `R$ 115,00/mes`.

## Pontos tecnicos importantes

- Stack principal: Angular 21, TypeScript, Tailwind CSS 4, Angular Material Icons, Express SSR.
- O projeto usa `signal` e `computed`, sem gerenciamento de estado externo.
- `src/styles.css` importa Tailwind e define a animacao `fade-in`.
- `src/app/app.css` esta vazio no estado atual.
- O deploy de Pages esta automatizado em `.github/workflows/deploy-pages.yml`.

## Pendencias e inconsistencias conhecidas

- Ha sinais de encoding incorreto em alguns textos exibidos no codigo-fonte.
- `metadata.json` e `.env.example` ainda citam template/AI Studio/Gemini.
- `angular.json` ainda define `GEMINI_API_KEY`, embora a aplicacao atual nao use essa variavel.
- A divisao entre consumo e IR e aproximada por faixa de renda, nao por regra fiscal individual real.

## Proximos passos recomendados

- corrigir encoding dos arquivos de texto para UTF-8 consistente;
- remover configuracoes herdadas que nao sao utilizadas;
- revisar e versionar a metodologia com fontes e ano de referencia;
- cobrir a logica de calculo com testes unitarios adicionais;
- ajustar metadados do projeto para refletirem o nome real da aplicacao.
