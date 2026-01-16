# Estágio 1: Builder
FROM python:3.13-slim AS builder

# Instalar uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uv/bin/uv

WORKDIR /app

# Configurar uv
ENV UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=never \
    UV_PROJECT_ENVIRONMENT=/opt/venv

# Copiar arquivos de dependência
COPY pyproject.toml uv.lock ./

# Sincronizar dependências
# --frozen: usa o lockfile estritamente
# --no-dev: sem dependências de dev
# --no-install-project: não instala o próprio projeto (apenas deps)
RUN /uv/bin/uv sync --frozen --no-dev --no-install-project

# Estágio 2: Runner
FROM python:3.13-slim AS runner

WORKDIR /app

# Copiar o ambiente virtual para um local fora de /app para evitar conflitos com bind mounts
COPY --from=builder /opt/venv /opt/venv

# Copiar o código da aplicação
COPY . .

# Configurar variáveis de ambiente
ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Expor a porta
EXPOSE 8000

# Script de entrada
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
