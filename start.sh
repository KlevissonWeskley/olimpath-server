#!/bin/bash

# Garante que o Prisma esteja atualizado no ambiente de produção
npx prisma generate
npx prisma migrate deploy

# Depois roda o servidor
npx tsx src/server.ts
