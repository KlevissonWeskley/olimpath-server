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

# 2. Instale as dependências
npm install

# 3. Crie o arquivo .env

# Url do banco local
DATABASE_URL=postgresql://admin:root@localhost:5432/olimpathdb?schema=public
# Url do banco em produção (se não quiser rodar o banco com docker)
DATABASE_URL=postgresql://olimpath_db_user:QoixWAkgwemesamd3A0MHDAd2cDVvUNP@dpg-d147piogjchc73ffbbu0-a.oregon-postgres.render.com/olimpath_db

# API Key do GEMINI (necessária pra IA)
API_KEY_GEMINI=AIzaSyAuyrcTcl6HE8CIxaj3jskqEZb5J4TELhg

#  4. Configuração do Prisma ORM
npx prisma generate

# 5. Rodando o projeto
npm run dev

# A API estará disponível em https://localhost:3333 
```
