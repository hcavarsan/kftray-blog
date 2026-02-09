# ---- Dependencies stage ----
FROM node:20-alpine AS deps

# Enable corepack for pnpm (built into Node, no npm install needed)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only lockfile + package manifest for maximum layer cache hit rate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy files required by fumadocs-mdx postinstall hook
COPY source.config.ts ./
COPY content/ ./content/

# Install with BuildKit mount cache — reuses the pnpm store across builds
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---- Build stage ----
FROM deps AS build

# Copy source (deps layer is fully cached if only source code changed)
COPY . .

# Build with Next.js telemetry disabled
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

# ---- Runtime stage ----
FROM node:20-alpine AS runtime

WORKDIR /app

# Install sharp for Next.js production image optimization (standalone needs it)
RUN apk add --no-cache libc6-compat \
    && npm i -g sharp@0.33.5 \
    && npm cache clean --force

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy standalone build output
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

# Runtime config
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
# Tell Next.js where to find sharp
ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp

EXPOSE 3000

USER nextjs

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000/ || exit 1

# HOSTNAME must be set inline — Docker overrides ENV HOSTNAME with the container ID at runtime.
# See: https://github.com/vercel/next.js/issues/58657
CMD HOSTNAME=0.0.0.0 node server.js
