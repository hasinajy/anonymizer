FROM node:22.12.0-alpine

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Create a non-root user
RUN addgroup -S appgroup \
    && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /usr/src/app
USER appuser

EXPOSE 5000

CMD ["npm", "run", "dev"]