# Memory

## Resumo do projeto

- Nome: `Calculadora do SUS`
- Tipo: aplicação Angular com SSR e deploy estático no GitHub Pages
- Objetivo: mostrar, de forma educativa, uma estimativa de quanto da renda mensal financia o SUS via impostos

## Estado atual

- O produto está funcional como landing page calculadora de página única.
- A lógica principal está concentrada em [`src/app/app.ts`](E:/Projetos/calculadora-do-sus/src/app/app.ts).
- A interface inteira está em [`src/app/app.html`](E:/Projetos/calculadora-do-sus/src/app/app.html).
- O repositório parece ter sido iniciado a partir de um template e ainda carrega algumas sobras de bootstrap.

## Regras de negócio implementadas

- Entrada do usuário: renda mensal com máscara monetária `pt-BR`.
- Enquadramento: feito por comparação sequencial com `taxBrackets`.
- Imposto estimado total: `renda * avgTaxPercent / 100`.
- Discriminação da carga: `renda * consumptionTaxPercent / 100` para consumo e `renda * incomeTaxPercent / 100` para IR.
- Parcela atribuída ao SUS: `12%` do imposto estimado total.
- Percentual da renda destinado ao SUS: `avgTaxPercent * 0.12`.
- Custo per capita do SUS exibido na UI: valor fixo aproximado de `R$ 115,00/mês`.

## Pontos técnicos importantes

- Stack principal: Angular 21, TypeScript, Tailwind CSS 4, Angular Material Icons, Express SSR.
- O projeto usa `signal` e `computed`, sem gerenciamento de estado externo.
- `src/styles.css` importa Tailwind e define a animação `fade-in`.
- `src/app/app.css` está vazio no estado atual.
- O deploy de Pages está automatizado em `.github/workflows/deploy-pages.yml`.

## Pendências e inconsistências conhecidas

- Há sinais de encoding incorreto em alguns textos exibidos no código-fonte.
- A divisão entre consumo e IR é aproximada por faixa de renda, não por regra fiscal individual real.

## Próximos passos recomendados

- corrigir encoding dos arquivos de texto para UTF-8 consistente;
- remover configurações herdadas que não são utilizadas;
- revisar e versionar a metodologia com fontes e ano de referência;
- cobrir a lógica de cálculo com testes unitários adicionais;
- ajustar metadados do projeto para refletirem o nome real da aplicação.
