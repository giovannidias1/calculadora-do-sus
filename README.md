# Calculadora do SUS

Aplicacao web em Angular que estima quanto da renda mensal de uma pessoa e convertida em financiamento do SUS, com base em faixas de tributacao medias e em uma alocacao aproximada da arrecadacao publica para a saude.

## Objetivo

O projeto tem foco educativo. A interface ajuda a visualizar:

- quanto da renda mensal e absorvido por impostos em diferentes faixas;
- qual parcela estimada desses impostos financia o SUS;
- como a carga tributaria pode ser proporcionalmente mais pesada para faixas de renda mais baixas;
- a diferenca entre a contribuicao estimada do cidadao e o custo medio per capita do sistema.

## Funcionalidades

- entrada de renda mensal com mascara monetaria em `pt-BR`;
- classificacao automatica por faixa de renda;
- discriminacao estimada entre impostos sobre consumo e Imposto de Renda;
- calculo estimado da contribuicao mensal ao SUS;
- exibicao da porcentagem da renda destinada ao financiamento da saude publica;
- tabela comparativa por faixa de renda;
- conteudo editorial explicativo sobre regressividade tributaria e cobertura do SUS;
- renderizacao com Angular SSR;
- deploy automatizado no GitHub Pages.

## Stack

- Angular 21
- TypeScript
- Angular Material Icons
- Tailwind CSS 4
- Express para SSR

## Como executar localmente

### Pre-requisitos

- Node.js
- npm

### Instalacao

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm start
```

A aplicacao ficara disponivel no endereco padrao informado pelo Angular CLI.

Se preferir usar o script alternativo de desenvolvimento:

```bash
npm run dev
```

## Scripts disponiveis

```bash
npm start        # sobe o servidor de desenvolvimento
npm run dev      # sobe o app em modo dev na porta 3000
npm run build    # gera o build de producao
npm run build:pages
npm run watch    # build continuo para desenvolvimento
npm run test     # executa testes unitarios
npm run lint     # executa lint
```

Apos o build, o servidor SSR pode ser iniciado com:

```bash
npm run serve:ssr:app
```

## Estrutura do projeto

```text
src/
  app/
    app.ts                 # estado da aplicacao e regras de calculo
    app.html               # layout principal da interface
    app.css                # estilos do componente raiz
  styles.css               # Tailwind e estilos globais
  main.ts                  # bootstrap do app no browser
  main.server.ts           # bootstrap server-side
  server.ts                # servidor Express para SSR
public/
  favicon.ico
.github/
  workflows/
    deploy-pages.yml       # deploy do GitHub Pages
```

## Metodologia de calculo

O calculo atual e simplificado e segue a logica implementada em `src/app/app.ts`:

1. A renda mensal informada e associada a uma faixa de tributacao media.
2. A carga total da faixa e discriminada entre consumo e IR com percentuais medios aproximados.
3. O total estimado de impostos e calculado por `renda * aliquota_media`.
4. A parcela destinada ao SUS e estimada em 12% desse total.
5. A interface compara esse valor com um custo medio per capita do SUS de aproximadamente `R$ 115,00/mes`.

## Limitacoes

- Os valores sao estimativas educativas, nao calculos fiscais oficiais.
- As faixas e percentuais sao estaticos no codigo.
- A divisao entre consumo e IR e aproximada por faixa de renda.
- O custo per capita do SUS esta fixado na interface.
- O repositorio ainda contem alguns vestigios do template original, como referencias a `GEMINI_API_KEY` e AI Studio, que nao fazem parte da regra atual da aplicacao.

## Melhorias recomendadas

- externalizar faixas e percentuais para uma fonte versionada;
- citar bases publicas e ano de referencia com mais precisao;
- transformar o custo per capita em dado configuravel;
- adicionar testes unitarios para a logica de enquadramento e calculo;
- remover dependencias e configuracoes herdadas do template que nao sao usadas.

## Licenca

Defina aqui a licenca oficial do projeto antes de distribuicao publica.
