# Calculadora do SUS

Aplicação web em Angular que estima quanto da renda mensal de uma pessoa é convertida em financiamento do SUS, com base em faixas de tributação médias e em uma alocação aproximada da arrecadação pública para a saúde.

## Objetivo

O projeto tem foco educativo. A interface ajuda a visualizar:

- quanto da renda mensal é absorvido por impostos em diferentes faixas;
- qual parcela estimada desses impostos financia o SUS;
- como a carga tributária pode ser proporcionalmente mais pesada para faixas de renda mais baixas;
- a diferença entre a contribuição estimada do cidadão e o custo médio per capita do sistema.

## Funcionalidades

- entrada de renda mensal com máscara monetária em `pt-BR`;
- classificação automática por faixa de renda;
- cálculo estimado da contribuição mensal ao SUS;
- exibição da porcentagem da renda destinada ao financiamento da saúde pública;
- tabela comparativa por faixa de renda;
- conteúdo editorial explicativo sobre regressividade tributária e cobertura do SUS;
- renderização com Angular SSR.

## Stack

- Angular 21
- TypeScript
- Angular Material Icons
- Tailwind CSS 4
- Express para SSR

## Como executar localmente

### Pré-requisitos

- Node.js
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm start
```

A aplicação ficará disponível no endereço padrão informado pelo Angular CLI.

Se preferir usar o script alternativo de desenvolvimento:

```bash
npm run dev
```

## Scripts disponíveis

```bash
npm start        # sobe o servidor de desenvolvimento
npm run dev      # sobe o app em modo dev na porta 3000
npm run build    # gera o build de produção
npm run watch    # build contínuo para desenvolvimento
npm run test     # executa testes unitários
npm run lint     # executa lint
```

Após o build, o servidor SSR pode ser iniciado com:

```bash
npm run serve:ssr:app
```

## Estrutura do projeto

```text
src/
  app/
    app.ts                 # estado da aplicação e regras de cálculo
    app.html               # layout principal da interface
    app.css                # estilos do componente raiz
  styles.css               # Tailwind e estilos globais
  main.ts                  # bootstrap do app no browser
  main.server.ts           # bootstrap server-side
  server.ts                # servidor Express para SSR
public/
  favicon.ico
```

## Metodologia de cálculo

O cálculo atual é simplificado e segue a lógica implementada em `src/app/app.ts`:

1. A renda mensal informada é associada a uma faixa de tributação média.
2. O total estimado de impostos é calculado por `renda * aliquota_media`.
3. A parcela destinada ao SUS é estimada em 12% desse total.
4. A interface compara esse valor com um custo médio per capita do SUS de aproximadamente `R$ 115,00/mês`.

## Limitações

- Os valores são estimativas educativas, não cálculos fiscais oficiais.
- As faixas e percentuais são estáticos no código.
- O custo per capita do SUS está fixado na interface.
- O repositório ainda contém alguns vestígios do template original, como referências a `GEMINI_API_KEY` e AI Studio, que não fazem parte da regra atual da aplicação.

## Melhorias recomendadas

- externalizar faixas e percentuais para uma fonte versionada;
- citar bases públicas e ano de referência com mais precisão;
- transformar o custo per capita em dado configurável;
- adicionar testes unitários para a lógica de enquadramento e cálculo;
- remover dependências e configurações herdadas do template que não são usadas.

## Licença

Defina aqui a licença oficial do projeto antes de distribuição pública.
