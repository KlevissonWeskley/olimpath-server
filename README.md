# 🧠 OlimPath - Backend

## Deploy da API
https://olimpath-server.onrender.com

Este é o **backend** do projeto **OlimPath**, feito com **Node.js**, **Fastify** e **TypeScript**. Ele fornece a API REST responsável por cadastro de usuários, vídeos, biblioteca de materiais, simulados, progresso dos alunos e mais.

---

## ⚙️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)**
- **[Fastify](https://www.fastify.io/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Prisma ORM](https://www.prisma.io/)**
- **[PostgreSQL](https://www.postgresql.org/)** (via Docker)
- **[Zod](https://zod.dev/)** – validação de dados
- **[Docker](https://www.docker.com/)** – ambiente do banco
- **[dotenv](https://www.npmjs.com/package/dotenv)** – variáveis de ambiente

---

## 🐳 Subindo o Banco com Docker

Certifica-te de ter o Docker instalado. Em seguida, roda:

```bash
docker-compose up -d
```

Isso vai iniciar um container PostgreSQL com as configurações do .env.

# 🔧 Instalação

## Pré-requisitos

- Node.js instalado

- Docker instalado


## Passos

```bash
# 1. Clone o repositório
git clone https://github.com/KlevissonWeskley/olimpath-server.git
cd olimpath-server

# Atenção: o arquivo .env que deixamos são de chaves de TESTE, que fizemos EXCLUSIVAMENTE para o uso no SEDUCKATHON, elas não comprometem de forma alguma a SEGURANÇA da aplicação.

# 2. Instale as dependências
npm install

# 3. Suba o banco
docker compose up -d

# 4. Crie o arquivo .env

# Variaveis que vai precisar para testar

# Url do banco local - Rodando com docker
DATABASE_URL=postgresql://admin:root@localhost:5432/olimpathdb?schema=public

# API Key do GEMINI (necessária pra IA)
API_KEY_GEMINI=

# 5. Configuração do Prisma ORM
npx prisma generate

npm run seed

# 6. Rodando o projeto
npm run dev

# A API estará disponível em https://localhost:3333 

# Baixe a extensão REST Client no VsCode que no arquivo api.http tem exemplos das rotas da aplicação
```
