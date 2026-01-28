# ==========================================
# Build Stage
# ==========================================
FROM node:22-alpine AS builder

# Build arguments
ARG BUILDTIME
ARG VERSION
ENV BUILDTIME=$BUILDTIME
ENV VERSION=$VERSION

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# ==========================================
# Production Stage
# ==========================================
FROM node:22-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxtjs -u 1001

# Copy built application from builder
COPY --from=builder --chown=nuxtjs:nodejs /app/.output /app/.output

# Set user
USER nuxtjs

# Expose port (Note: K8s will use ConfigMap PORT if provided)
EXPOSE 3002

# Health check - Dynamic port detection
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3002) + '/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", ".output/server/index.mjs"]
