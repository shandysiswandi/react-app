# ---- Builder stage ----
FROM oven/bun:1.2.21-alpine AS builder
LABEL stage="builder"

WORKDIR /app

# Copy dependencies first for better caching
COPY package.json bun.lock ./
RUN bun ci

# Copy source code
COPY . .

# Build the React app
RUN bun run build


# ---- Runtime stage ----
FROM nginx:1.29.0-alpine
LABEL maintainer="shandysiswandi@gmail.com"
LABEL description="Production image for React frontend application."

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy custom Nginx config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default html
RUN rm -rf /usr/share/nginx/html/*

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Runtime env injection (build once, run anywhere)
# Copy env template script
COPY ./env.template.js /usr/share/nginx/html/env.template.js
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Set permissions
RUN chown -R appuser:appgroup /var/cache/nginx \
    && touch /var/run/nginx.pid \
    && chown -R appuser:appgroup /var/run/nginx.pid \
    && chown -R appuser:appgroup /usr/share/nginx/html

# Run as non-root user
USER appuser

EXPOSE 80

# Add healthcheck for orchestrators
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
