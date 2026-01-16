# Estágio 1: Builder
FROM oven/bun:1 AS builder

WORKDIR /app

# Copiar arquivos de dependência
COPY package.json bun.lock ./

# Instalar dependências
RUN bun install --frozen-lockfile

# Copiar o código fonte
COPY . .

# Build da aplicação
RUN bun run build

# Estágio 2: Runner
FROM oven/bun:1-slim AS runner

WORKDIR /app

# Copiar apenas os artefatos de build
COPY --from=builder /app/.output /app/.output

# Configurações de ambiente
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Iniciar o servidor Nuxt
CMD ["bun", ".output/server/index.mjs"]
