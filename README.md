# Maqnelson Backend

Backend de integracao entre dois canais:
- Super App (campo): profissional cria a avaliacao e consulta dados.
- Web Avaliar (escritorio): time acompanha, altera status e completa dados financeiros.

Este projeto tambem gerencia o formulario dinamico de checkin em `/adm/form`, usado como base da avaliacao.

## Visao de negocio

Este backend conecta o fluxo completo de avaliacao:
1. O profissional cria a avaliacao no Super App via `POST /app/rate`.
2. A avaliacao nasce com status `EM ANDAMENTO`.
3. O time no Web Avaliar acompanha e altera status via `PUT /web/rate/:id/status`.
4. O time no Web Avaliar preenche dados financeiros via `PUT /web/rate/:id/finance`.
5. O Super App consulta e visualiza, sem governanca de status/financeiro.

Regra importante:
- Governanca de status e financeiro e do Web Avaliar.
- O app e o ponto de criacao da avaliacao e de consulta operacional.

## Como iniciar o projeto

## Pre requisitos

- Node.js 18+
- Yarn
- Docker + Docker Compose
- PostgreSQL (via compose local)

## 1) Instalar dependencias

```bash
yarn install
```

## 2) Subir banco PostgreSQL local

```bash
docker compose -f docker-compose.postgres.yml up -d
```

## 3) Configurar ambiente

Copie `.env.example` para `.env` e preencha os campos:

```env
DATABASE_URL="postgresql://postgres:prisma@localhost:5432/postgres?schema=public"
JWT_SECRET=""
PASSWORD_SECRET=""
BANCKEND_URL=""
BUCKET_NAME=""
AWS_REGION=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
```


## 4) Rodar em desenvolvimento

Opcao unica (recomendada):

```bash
yarn run dev:full
```

Este comando executa:
- `yarn run db:push`
- `yarn run dev`

Opcao separada:

```bash
yarn run db:push
yarn run dev
```

## 5) Build e execucao de producao

```bash
yarn run build
yarn run start
```

Com PM2:

```bash
yarn run prod
```

## Inicializacao automatica

Quando o servidor sobe, executa:
- `initADM()`: cria usuarios padrao caso nao existam.
- `initMarkWheels()`: popula marcas de pneus iniciais.

## Arquitetura em camadas

- `src/routers`: define endpoints e middlewares.
- `src/controllers`: recebe request/response.
- `src/services`: regra de negocio.
- `src/models`: acesso ao banco.
- `prisma/schema.prisma`: modelos e relacoes do banco.

Fluxo padrao:

```text
Router -> Controller -> Service -> Model -> Prisma/PostgreSQL
```

## Estrutura do projeto e arquivos

Visao geral da estrutura principal:

```text
maqnelson-backend/
  prisma/
    schema.prisma
  src/
    server.ts
    config/
      app.ts
      cors.ts
      multerConfig.ts
      S3.ts
    controllers/
      auth/
      form/
      galery/
      markWheels/
      rate/
      user/
      versionForm/
    middleware/
      isAuthenticate.ts
      validatorRoler.ts
      validatorSchema.ts
      index.ts
    models/
      emun/
      form/
      galery/
      input/
      markWheels/
      model/
      rate/
      schema/
      user/
      versionForm/
    routers/
      index.ts
      auth/
      form/
      galery/
      markWheel/
      rate/
      user/
      versionForm/
    schemas/
      index.ts
      form/
      galery/
      markWheels/
      rate/
      user/
    services/
      auth/
      emun/
      form/
      galery/
      input/
      markWheels/
      model/
      rate/
      schema/
      user/
      versionForm/
    utils/
      formatObj.ts
      initAdmin.ts
      initMarkWheels.ts
  uploads/
    document/
    photo/
    video/
  docker-compose.postgres.yml
  package.json
  tsconfig.json
  schema.json
  README.md
```

Arquivos-chave por responsabilidade:
- `src/server.ts`: entrada da API, sobe servidor e executa inicializacao automatica.
- `src/routers/index.ts`: registra todas as rotas no app.
- `src/config/app.ts`: configuracao central do Express.
- `src/schemas/form/create.ts`: contrato Joi para criacao/edicao de formulario.
- `src/services/form/index.ts`: orquestracao de criacao do checkin e versionamento.
- `src/services/rate/index.ts`: fluxo de avaliacao e transicao de status.
- `src/services/galery/index.ts`: upload e vinculo de midias (foto/video/pdf).
- `src/utils/formatObj.ts`: gera objeto achatado usado no versionamento.
- `prisma/schema.prisma`: definicao de tabelas e relacoes do banco.
- `schema.json`: exemplo/base de estrutura de formulario usada no dominio.

## Rotas principais

## Autenticacao e usuarios

- `POST /auths`
- `POST /users` (ADMIN)
- `GET /users` (ADMIN)
- `GET /web/users`
- `DELETE /users/:id` (ADMIN)

## Formulario dinamico (Super App)

- `POST /adm/form` (ADMIN, ANALYST)
- `PUT /adm/form/:id` (ADMIN, ANALYST)
- `GET /adm/form` (ADMIN, ANALYST)
- `GET /adm/form/:id` (ADMIN, ANALYST)
- `DELETE /adm/form/:id` (ADMIN)

## Roda de avaliar (Rate)

- `POST /app/rate`
  - Criacao da avaliacao pelo app (profissional).
- `GET /app/rate`
  - Consulta de avaliacoes no contexto app.
- `GET /web/rate`
  - Consulta para painel web.
- `GET /web/rate/countstatus`
  - Contagem por status no web.
- `PUT /web/rate/:id/status`
  - Alteracao de status no web.
- `PUT /web/rate/:id/finance`
  - Atualizacao financeira no web.
- `PUT /adm/rate/:id`
  - Atualizacao administrativa/operacional.
- `GET /adm/rate`
  - Listagem administrativa.

## Outras rotas

- `GET /mark-wheel`
- `POST /mark-wheel`
- `DELETE /adm/mark-wheel/:id`
- `POST /galery/image`
- `POST /galery/video`
- `POST /galery/pdf`
- `GET /galery/:id`
- `DELETE /galery/:id`
- `GET /version-form`

## Como enviar dados para analise de schema

Para o sistema analisar e usar os schemas do formulario:
- Envie o JSON do formulario em `POST /adm/form`.
- Envie anexos separadamente nas rotas de gallery (foto, video e pdf).

### 1) Enviar formulario (schema)

Endpoint:
- `POST /adm/form`

Formato:
- `Content-Type: application/json`
- Payload com `NAME`, `SCHEMAS`, `MODELS`, `INPUTS`, `EMUNS`.

Exemplo de chamada:

```bash
curl -X POST "http://localhost:3000/adm/form" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d @schema.json
```

### 2) Enviar fotos separadamente

Endpoint:
- `POST /galery/image?cEmail=<email_do_vendedor>`

Formato:
- `multipart/form-data`
- Arquivos no campo `photos`
- Metadados no campo `metadata` (JSON em texto)

Estrutura de metadata (array):

```json
[
  {
    "UUIDAPP": "uuid_da_galeria",
    "NAME": "photo_chassi",
    "URL": "",
    "RATE_UUIDAPP": "uuid_da_avaliacao"
  }
]
```

### 3) Enviar videos separadamente

Endpoint:
- `POST /galery/video?cEmail=<email_do_vendedor>`

Formato:
- `multipart/form-data`
- Arquivos no campo `videos`
- Metadados no campo `metadata` (mesmo padrao do upload de fotos)

### 4) Enviar PDF separadamente (web)

Endpoint:
- `POST /galery/pdf`

Formato:
- `multipart/form-data`
- Arquivo no campo `pdf`
- Metadados no campo `metadata` (JSON em texto)

Estrutura de metadata (array):

```json
[
  {
    "ID_RATE": 123,
    "NAME": "nf",
    "URL": "placeholder"
  }
]
```

Resumo da regra:
- Schema vai no `POST /adm/form`.
- Midias vao separadas pela gallery:
  - foto em `/galery/image`
  - video em `/galery/video`
  - pdf em `/galery/pdf`

### Configuracao de armazenamento de arquivos (S3)

O arquivo `src/config/S3.ts` e o ponto central de configuracao de armazenamento de arquivos do sistema.

Responsabilidades do `S3.ts`:
- Enviar fotos, videos e PDFs para o storage.
- Retornar a URL final do arquivo apos upload.
- Remover arquivo do storage quando necessario.

No fluxo atual:
- As rotas de gallery fazem upload das midias.
- O service de gallery usa `src/config/S3.ts` para armazenar e salvar a URL.

Se precisar trocar o sistema de armazenamento (exemplo: sair do S3 para outro provedor),
o ponto principal da mudanca e `src/config/S3.ts`.

## Ciclo de status da avaliacao

Status inicial:
- A tabela `Rate` define default `STATUS = "EM ANDAMENTO"`.
- Na criacao em `createRate`, o service reforca `EM ANDAMENTO` no fluxo de update por `UUIDAPP`.

Evolucao:
1. App cria avaliacao.
2. Web altera status conforme analise.
3. Web preenche financeiro.

Regra de excecao implementada:
- Se status for `APROVADO` sem documentos obrigatorios (`cnd`/`nf`), o sistema troca para `PENDENTE` automaticamente.

## Seguranca e autorizacao

Middlewares usados:
- `isAuthenticate`: valida JWT e carrega usuario.
- `validatorRole`: bloqueia acesso fora dos perfis permitidos.
- `schemaValidator`: valida payload com Joi.

Roles do sistema:
- `ADMIN`
- `ANALYST`
- `FINANCIAL`
- `USER`

## Formulario /adm/form e schema dinamico

O endpoint `/adm/form` cria a estrutura de formulario que o ecossistema usa para checkin/avaliacao.

Hierarquia funcional:

```text
Checkin
  -> Schemas[]
    -> Models[]
      -> Inputs[]
        -> Emuns[]
```

## Padrao inicial obrigatorio do formulario

Regra funcional do produto:
- Todo formulario novo deve iniciar com o bloco base de Veiculo.
- Esse bloco garante compatibilidade com app, web e integracao de dados.

Observacao importante:
- Atualmente o backend ainda nao valida automaticamente esse padrao inicial.
- Mesmo assim, o time deve seguir esse contrato como obrigatorio ao criar formularios.

Contrato minimo esperado no inicio do payload:

```json
{
  "NAME": "{NOME_DO_TIPO_DE_VEICULO}",
  "SCHEMAS": [
    {
      "TITLE": "Veiculo",
      "MODELS": [
        {
          "NAME": "simple",
          "TITLE": "",
          "QUESTION": "",
          "INPUTS": [
            {
              "TYPE": "text",
              "NAME": "type_veiculo",
              "LABEL": "Tipo",
              "VALUE": "{NOME_DO_TIPO_DE_VEICULO}",
              "PLACEHOLDER": "",
              "REQUIRED": true,
              "MULTIPLE": false,
              "MAX": null,
              "MIN": null,
              "BONDTYPE": "",
              "EMUNS": []
            }
          ]
        },
        {
          "NAME": "simple",
          "TITLE": "",
          "QUESTION": "",
          "INPUTS": [
            {
              "TYPE": "select",
              "NAME": "mark_veiculo",
              "LABEL": "Marca",
              "VALUE": "",
              "PLACEHOLDER": "",
              "REQUIRED": true,
              "MULTIPLE": false,
              "MIN": null,
              "MAX": null,
              "BONDTYPE": "",
              "EMUNS": [
                {
                  "NAME": "marca",
                  "TITLE": "Marca"
                }
              ]
            }
          ]
        },
        {
          "NAME": "simple",
          "TITLE": "",
          "QUESTION": "",
          "INPUTS": [
            {
              "TYPE": "select",
              "NAME": "model_veiculo",
              "LABEL": "Modelo",
              "VALUE": "",
              "PLACEHOLDER": "",
              "REQUIRED": true,
              "MULTIPLE": false,
              "MIN": null,
              "MAX": null,
              "BONDTYPE": "",
              "EMUNS": [
                {
                  "NAME": "modelo",
                  "TITLE": "Modelo"
                }
              ]
            }
          ]
        },
        {
          "NAME": "simple",
          "TITLE": "",
          "QUESTION": "",
          "INPUTS": [
            {
              "TYPE": "text",
              "NAME": "chassi_veiculo",
              "LABEL": "Chassi | Serie",
              "VALUE": "",
              "PLACEHOLDER": "",
              "REQUIRED": true,
              "MULTIPLE": false,
              "MIN": null,
              "MAX": null,
              "BONDTYPE": "",
              "EMUNS": []
            }
          ]
        },
        {
          "NAME": "simple",
          "TITLE": "",
          "QUESTION": "",
          "INPUTS": [
            {
              "TYPE": "number",
              "NAME": "year_veiculo",
              "LABEL": "Ano de Fabricacao",
              "VALUE": "",
              "PLACEHOLDER": "",
              "REQUIRED": true,
              "MULTIPLE": false,
              "MIN": null,
              "MAX": null,
              "BONDTYPE": "",
              "EMUNS": []
            }
          ]
        },
        {
          "NAME": "simple",
          "TITLE": "",
          "QUESTION": "",
          "INPUTS": [
            {
              "TYPE": "number",
              "NAME": "horimetro_veiculo",
              "LABEL": "Horimetro",
              "VALUE": "",
              "PLACEHOLDER": "",
              "REQUIRED": true,
              "MULTIPLE": false,
              "MIN": null,
              "MAX": null,
              "BONDTYPE": "",
              "EMUNS": []
            }
          ]
        },
        {
          "NAME": "simple",
          "TITLE": "",
          "QUESTION": "",
          "INPUTS": [
            {
              "TYPE": "currency",
              "NAME": "value_veiculo",
              "LABEL": "Valor Esperado Pelo Cliente",
              "VALUE": "",
              "PLACEHOLDER": "Ex: 100,00",
              "REQUIRED": true,
              "MULTIPLE": false,
              "MIN": null,
              "MAX": null,
              "BONDTYPE": "",
              "EMUNS": []
            }
          ]
        }
      ]
    }
  ]
}
```

Regra de consistencia desse bloco inicial:
- `NAME` do formulario deve representar o tipo de veiculo.
- `type_veiculo.VALUE` deve carregar esse mesmo tipo de veiculo.
- Os campos `mark_veiculo` e `model_veiculo` devem manter os EMUNS padrao (`marca` e `modelo`).

## Padrao obrigatorio do bloco wheel (EXEMPLO: Pneus Traseiros)

Regra funcional do produto:
- O bloco `wheel` de Pneus tambem deve seguir o contrato padrao.
- Esse padrao garante montagem correta de layout por lado (`SINGLE LEFT`, `SINGLE RIGHT`, `DUPLO LEFT`, `DUPLO RIGHT`) no front-end.

Observacao importante:
- Atualmente o backend ainda nao valida automaticamente esse padrao `wheel`.
- Mesmo assim, o time deve seguir esse contrato como obrigatorio ao criar/editar formulario.

Contrato de referencia para `wheel` (Exemplo: Pneus Traseiros):

```json
{
  "NAME": "wheel",
  "TITLE": "Pneus Traseiros",
  "QUESTION": "",
  "INPUTS": [
    {
      "TYPE": "select",
      "NAME": "tipo_pneus_traseiro",
      "LABEL": "Tipo Pneus Traseiros",
      "VALUE": "Single",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "MIN": null,
      "MAX": null,
      "BONDTYPE": "",
      "EMUNS": [
        {
          "NAME": "Single",
          "TITLE": "Single"
        },
        {
          "NAME": "Duplo",
          "TITLE": "Duplo"
        }
      ]
    },
    {
      "TYPE": "select",
      "NAME": "marca_pneus_traseiro_single_left",
      "LABEL": "Marca",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "MIN": null,
      "MAX": null,
      "BONDTYPE": "SINGLE LEFT",
      "EMUNS": [
        {
          "NAME": "marca pneus",
          "TITLE": "Marca"
        }
      ]
    },
    {
      "TYPE": "number",
      "NAME": "medida_pneus_traseiro_single_left",
      "LABEL": "Medida",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "BONDTYPE": "SINGLE LEFT",
      "MIN": null,
      "MAX": null,
      "EMUNS": []
    },
    {
      "TYPE": "picker",
      "NAME": "dimensao_pneus_traseiro_single_left",
      "LABEL": "Dimensão",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "BONDTYPE": "SINGLE LEFT",
      "MIN": null,
      "MAX": null,
      "EMUNS": []
    },
    {
      "TYPE": "radio",
      "NAME": "vida_util_pneus_traseiro_single_left",
      "LABEL": "Vida útil",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "MIN": null,
      "MAX": null,
      "BONDTYPE": "SINGLE LEFT",
      "EMUNS": [
        {
          "NAME": "Liso",
          "TITLE": "Liso"
        },
        {
          "NAME": "25%",
          "TITLE": "25%"
        },
        {
          "NAME": "50%",
          "TITLE": "50%"
        },
        {
          "NAME": "75%",
          "TITLE": "75%"
        },
        {
          "NAME": "100%",
          "TITLE": "100%"
        }
      ]
    },
    {
      "TYPE": "select",
      "NAME": "marca_pneus_traseiro_single_right",
      "LABEL": "Marca",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "MIN": null,
      "MAX": null,
      "BONDTYPE": "SINGLE RIGHT",
      "EMUNS": [
        {
          "NAME": "marca pneus",
          "TITLE": "Marca"
        }
      ]
    },
    {
      "TYPE": "number",
      "NAME": "medida_pneus_traseiro_single_right",
      "LABEL": "Medida",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "MIN": null,
      "MAX": null,
      "BONDTYPE": "SINGLE RIGHT",
      "EMUNS": []
    },
    {
      "TYPE": "picker",
      "NAME": "dimensao_pneus_traseiro_single_right",
      "LABEL": "Dimensão",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "BONDTYPE": "SINGLE RIGHT",
      "MIN": null,
      "MAX": null,
      "EMUNS": []
    },
    {
      "TYPE": "radio",
      "NAME": "vida_util_pneus_traseiro_single_right",
      "LABEL": "Vida útil",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": true,
      "MULTIPLE": false,
      "MIN": null,
      "MAX": null,
      "BONDTYPE": "SINGLE RIGHT",
      "EMUNS": [
        {
          "NAME": "Liso",
          "TITLE": "Liso"
        },
        {
          "NAME": "25%",
          "TITLE": "25%"
        },
        {
          "NAME": "50%",
          "TITLE": "50%"
        },
        {
          "NAME": "75%",
          "TITLE": "75%"
        },
        {
          "NAME": "100%",
          "TITLE": "100%"
        }
      ]
    },
    {
      "TYPE": "select",
      "NAME": "marca_pneus_traseiro_duplo_left",
      "LABEL": "Marca",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": false,
      "MULTIPLE": false,
      "BONDTYPE": "DUPLO LEFT",
      "MIN": null,
      "MAX": null,
      "EMUNS": [
        {
          "NAME": "marca pneus",
          "TITLE": "marca"
        }
      ]
    },
    {
      "TYPE": "number",
      "NAME": "medida_pneus_traseiro_duplo_left",
      "LABEL": "Medida",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": false,
      "MULTIPLE": false,
      "BONDTYPE": "DUPLO LEFT",
      "MIN": null,
      "MAX": null,
      "EMUNS": []
    },
    {
      "TYPE": "picker",
      "NAME": "dimensao_pneus_traseiro_duplo_left",
      "LABEL": "Dimensão",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": false,
      "MULTIPLE": false,
      "BONDTYPE": "DUPLO LEFT",
      "MIN": null,
      "MAX": null,
      "EMUNS": []
    },
    {
      "TYPE": "radio",
      "NAME": "vida_util_pneus_traseiro_duplo_left",
      "LABEL": "Vida útil",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": false,
      "MULTIPLE": false,
      "BONDTYPE": "DUPLO LEFT",
      "MIN": null,
      "MAX": null,
      "EMUNS": [
        {
          "NAME": "Liso",
          "TITLE": "Liso"
        },
        {
          "NAME": "25%",
          "TITLE": "25%"
        },
        {
          "NAME": "50%",
          "TITLE": "50%"
        },
        {
          "NAME": "75%",
          "TITLE": "75%"
        },
        {
          "NAME": "100%",
          "TITLE": "100%"
        }
      ]
    },
    {
      "TYPE": "select",
      "NAME": "marca_pneus_traseiro_duplo_right",
      "LABEL": "Marca",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": false,
      "MULTIPLE": false,
      "MIN": null,
      "MAX": null,
      "BONDTYPE": "DUPLO RIGHT",
      "EMUNS": [
        {
          "NAME": "marca pneus",
          "TITLE": "Marca"
        }
      ]
    },
    {
      "TYPE": "number",
      "NAME": "medida_pneus_traseiro_duplo_right",
      "LABEL": "Medida",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": false,
      "MULTIPLE": false,
      "BONDTYPE": "DUPLO RIGHT",
      "MIN": null,
      "MAX": null,
      "EMUNS": []
    },
    {
      "TYPE": "picker",
      "NAME": "dimensao_pneus_traseiro_duplo_right",
      "LABEL": "Dimensão",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": false,
      "MULTIPLE": false,
      "MIN": null,
      "MAX": null,
      "BONDTYPE": "DUPLO RIGHT",
      "EMUNS": []
    },
    {
      "TYPE": "radio",
      "NAME": "vida_util_pneus_traseiro_duplo_right",
      "LABEL": "Vida útil",
      "VALUE": "",
      "PLACEHOLDER": "",
      "REQUIRED": false,
      "MULTIPLE": false,
      "BONDTYPE": "DUPLO RIGHT",
      "MIN": null,
      "MAX": null,
      "EMUNS": [
        {
          "NAME": "Liso",
          "TITLE": "Liso"
        },
        {
          "NAME": "25%",
          "TITLE": "25%"
        },
        {
          "NAME": "50%",
          "TITLE": "50%"
        },
        {
          "NAME": "75%",
          "TITLE": "75%"
        },
        {
          "NAME": "100%",
          "TITLE": "100%"
        }
      ]
    }
  ]
}
```

Regras de consistencia do `wheel`:
- `NAME` deve ser `wheel`.
- `tipo_pneus_traseiro` deve manter opcoes `Single` e `Duplo`.
- Campos de marca no wheel devem usar EMUN padrao de integracao: `{"NAME":"marca pneus","TITLE":"Marca"}`.
- O `BONDTYPE` de cada campo deve respeitar o lado correto (`SINGLE LEFT`, `SINGLE RIGHT`, `DUPLO LEFT`, `DUPLO RIGHT`).

## Tabelas Prisma usadas no schema

### 1) Checkin
- Entidade raiz do formulario.
- Campos centrais: `ID`, `NAME`, datas.
- Relacao: `Checkin 1:N Schema`.

### 2) Schema
- Agrupa blocos/secoes do formulario.
- Campos centrais: `ID`, `TITLE`, `IDCHECKIN`.
- Relacao: `Schema 1:N Model`.

### 3) Model
- Define o tipo de bloco visual/funcional no front-end.
- Campos centrais: `ID`, `NAME`, `TITLE`, `QUESTION`, `IDSCHEMA`.
- Relacao: `Model 1:N Input`.

Regra critica de compatibilidade com front-end:
- `Model.NAME` precisa seguir valores aceitos no backend:
  - `simple`
  - `set`
  - `obs`
  - `wheel`
- Se usar outro nome fora desse contrato, o front nao configura/renderiza como esperado.

Comportamento esperado por tipo de `Model.NAME`:
- `simple`: bloco com inputs simples, sem comportamento especial de composicao visual.
- `set`: bloco com comportamento orientado por `BONDTYPE` e, quando aplicavel, renderizacao por icones.
- `obs`: bloco de observacoes gerais (texto/foto de observacao).
- `wheel`: bloco de rodas e pneus com separacao por lado/configuracao (`SINGLE LEFT`, `SINGLE RIGHT`, `DUPLO LEFT`, `DUPLO RIGHT`).

### Regras obrigatorias para `set` e icones

Quando o modelo for `set`, o front-end depende da combinacao entre `TYPE`, `BONDTYPE` e nomes dos itens para decidir qual SVG/componente renderizar.

Para campos com `BONDTYPE: ICONS`, as chaves de opcao (EMUN.NAME) precisam ser exatamente estas para o mapeamento de icones funcionar:

```ts
const ICON_MAP = {
  intacto,
  'com avaria',
  faltante,
  'com vazamento',
  'sem vazamento',
  Sim,
  Nao,
  'Nao Funcionando',
  Funcionando,
  'Nivel normal',
  Normal,
  'Nivel baixo',
  Baixo,
} as const;
```

Se a chave vier com nome diferente (exemplo: acento, espaco ou caixa diferente), o front nao encontra o icone correto.

### Regras de `BONDTYPE` para layout/componente

No modelo `set`, `BONDTYPE` e obrigatorio para o front separar o contexto de renderizacao e escolher o comportamento correto.

Principais casos usados no sistema:
- `ICONS`: usa mapeamento de icones por chave de EMUN.
- `PHOTO` e `BONDPHOTO`: campos de foto com regras de exibicao/captura.
- `LOCATION`: campo de localizacao textual.
- `VALUES`: campo numerico de quantidade/valor.
- `NOTES`: observacoes.
- `FORM`: campo de formulario textual guiado.
- `SINGLE LEFT`, `SINGLE RIGHT`, `DUPLO LEFT`, `DUPLO RIGHT`: separacao por lado no contexto de pneus/rodas.

### Regra de `BONDPHOTO` e fotos padrao

Quando usar `BONDPHOTO`, os nomes de fotos padrao precisam existir no objeto final para manter compatibilidade com o app/web:

```ts
'photo_frente';
'photo_esquerda';
'photo_direita';
'photo_pneus_dianteiros';
'photo_cabine';
'photo_horimetro';
'photo_chassi';
'photo_traseira';
'photo_pneus_traseiros';
```

Se os nomes nao seguirem esse padrao, o front-end nao vincula corretamente os pontos de foto esperados.

### 4) Input
- Campos reais de preenchimento.
- Campos centrais: `TYPE`, `NAME`, `LABEL`, `VALUE`, `REQUIRED`, `MULTIPLE`, `MIN`, `MAX`, `BONDTYPE`, `IDMODEL`.
- Relacao: `Input 1:N Emun`.

Regra obrigatoria de unicidade:
- `INPUT.NAME` nao pode repetir no formulario.
- Cada `INPUT.NAME` deve ser unico em toda a estrutura enviada.

Motivo tecnico:
- O sistema usa `INPUT.NAME` como chave de referencia para montar, salvar e ler os dados.
- Se repetir, pode ocorrer sobrescrita de valor, conflito de leitura e erro quando o usuario for usar o formulario.

Tipos aceitos em `TYPE`:
- `text`, `number`, `phone`, `email`, `currency`, `cpfcnpj`, `cpf`, `picker`, `radio`, `file`, `select`

Valores relevantes em `BONDTYPE`:
- `ICONS`, `PHOTO`, `BONDPHOTO`, `LOCATION`, `VALUES`, `NOTES`, `FORM`, `SINGLE LEFT`, `SINGLE RIGHT`, `DUPLO RIGHT`, `DUPLO LEFT`, `""`

### 5) Emun
- Opcoes de lista para inputs (ex.: radio/select).
- Campos centrais: `ID`, `NAME`, `TITLE`, `IDINPUT`.

Padroes de `EMUN` usados em `select` no sistema (integracao com APIs do Super App):

```json
{ "NAME": "marca", "TITLE": "Marca" }
```

```json
{ "NAME": "modelo", "TITLE": "Modelo" }
```

```json
{ "NAME": "marca pneus", "TITLE": "Marca" }
```

Esses nomes sao padroes consumidos no ecossistema. Se mudar o `NAME`, o app pode deixar de buscar/preencher as listas corretas.

## Versionamento do formulario

A cada criacao/edicao de formulario:
  - O backend salva em dois lugares:
  - Separado no Checkin (estrutura principal do formulario).
  - Consolidado no VersionCheckin (snapshot da versao usada pelo sistema de avaliacao).

No VersionCheckin ficam os campos:
- `ID`
- `IDCHECKIN`
- `NAME`
- `VERSION`
- `JSON_CHECKIN`
- `OBJECT_CHECKIN`
- `VIDEO`
- `PHOTO`
- `ATIVE`
- `CREATEDAT`
- `UPDATEDAT`
- `RATES`

Como funciona o vinculo com avaliacao:
- O Rate referencia `IDVERSIONCHECKIN`.
- Isso garante que cada avaliacao fique ligada a uma versao especifica de formulario.
- Na pratica, o formulario e enviado junto para o VersionCheckin e depois vinculado nas avaliacoes (Rate).

Regra de atualizacao de versao:
- Ao atualizar o checkin, a versao atual recebe `ATIVE = false`.
- Uma nova versao e criada com `VERSION + 1` e `ATIVE = true`.
- A versao antiga nao e excluida, ela permanece para historico e rastreabilidade.

Regra de exclusao:
- A inativacao de versao durante update nao remove historico.

## Exemplo de payload para POST /adm/form

```json
{
  "NAME": "CHECKIN MAQNELSON V1",
  "SCHEMAS": [
    {
      "TITLE": "DADOS GERAIS",
      "MODELS": [
        {
          "NAME": "simple",
          "TITLE": "",
          "QUESTION": "",
          "INPUTS": [
            {
              "TYPE": "text",
              "NAME": "modelo",
              "LABEL": "Modelo",
              "VALUE": "",
              "PLACEHOLDER": "Digite o modelo",
              "REQUIRED": true,
              "MULTIPLE": false,
              "MIN": null,
              "MAX": null,
              "BONDTYPE": "",
              "EMUNS": []
            },
            {
              "TYPE": "radio",
              "NAME": "estado",
              "LABEL": "Estado",
              "VALUE": "",
              "REQUIRED": true,
              "MULTIPLE": false,
              "BONDTYPE": "ICONS", // precisa ter icons no frontend porque ele vai esperar o nome precisa ser o mesmo no frontend
              "EMUNS": [
                { "TITLE": "Bom", "NAME": "bom" },
                { "TITLE": "Regular", "NAME": "regular" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Exemplo de fluxo da avaliacao (Super App + Web)

1. Profissional cria no app (`POST /app/rate`) com os dados da avaliacao.
2. Sistema registra `EM ANDAMENTO`.
3. Time web acompanha em `GET /web/rate`.
4. Time web altera status em `PUT /web/rate/:id/status`.
5. Time financeiro web complementa em `PUT /web/rate/:id/finance`.
6. App acompanha o resultado por consulta.

## Troubleshooting rapido

- Erro `400` em `/adm/form`:
  - Verifique contrato Joi, principalmente `Model.NAME`, `Input.TYPE` e `BONDTYPE`.
- Front nao renderiza bloco corretamente:
  - Verifique se `Model.NAME` esta em `simple|set|obs|wheel`.
- Permissao negada (`403`):
  - Verifique role do token e roles exigidos na rota.
- Falha de banco:
  - Verifique `DATABASE_URL` e container do postgres.

## Referencias de codigo

- `prisma/schema.prisma`
- `src/routers/form/index.ts`
- `src/routers/rate/index.ts`
- `src/services/form/index.ts`
- `src/services/rate/index.ts`
- `src/schemas/form/create.ts`
- `src/schemas/rate/create.ts`
- `src/schemas/rate/putStatus.ts`
- `src/schemas/rate/putFinance.ts`
- `src/server.ts`

## Equipe e Responsaveis

O desenvolvimento deste projeto foi realizado pela Donuts Tech, responsavel pela implementacao, arquitetura e documentacao da aplicacao.

### Responsaveis

| Responsavel | Funcao |
|-------------|--------|
| Fanini | Chefe de Desenvolvimento |
| Karina | Responsavel pelo projeto por parte da Maqnelson |
| Donuts Tech | Desenvolvimento do sistema |

### Transferencia do Projeto

A transferencia do projeto inclui:
- Entrega do codigo-fonte e da documentacao tecnica (README).
- Mapeamento das rotas, fluxos de formulario, avaliacao e versionamento.
- Orientacao sobre configuracoes de ambiente e execucao do sistema.
- Orientacao sobre ponto de manutencao de storage em `src/config/S3.ts`.

Status da transferencia:
- Projeto estruturado para continuidade de manutencao, evolucao de features e suporte operacional pelo time responsavel.

## Pendencias do Projeto

Ate a data de **30/06/2026**, as seguintes atividades permanecem pendentes para a conclusao do projeto:

### 1. Testes da Aplicacao

- Executar bateria completa de testes do fluxo ponta a ponta (formulario, avaliacao, gallery e versionamento).
- Validar cenarios de erro e regressao para publicacao com seguranca.

## Observacoes

As pendencias descritas acima nao impedem a continuidade do desenvolvimento. Elas dependem de etapas adicionais de implementacao, validacao ou de definicoes tecnicas ainda nao disponibilizadas durante o desenvolvimento do projeto.

## Contato

- **Organizacao**: DonutsTech
- **Site**: https://www.donutstech.com.br/
- **Telefone**: (11) 95219-2009 - Milena

---
Desenvolvido com carinho pela equipe DonutsTech para a Maqnelson
