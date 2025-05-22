FROM node:22-alpine AS builder

WORKDIR /app

# Copy root package files first (for workspace setup)
COPY package*.json ./

# Copy workspace package files
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies using workspace feature
RUN npm ci

# Copy source code
COPY . .

COPY ./backend/.env* ./backend/

# Build applications
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run frontend:build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy package files (keeping workspace structure)
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Build applications
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# server env variables needed at build time
ARG PORT
ARG JWT_SECRET
ARG JWT_EXPIRES_IN
ARG DATABASE_URL_CATS
ARG DATABASE_URL_CAFE

ENV PORT=${PORT}

ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
ENV DATABASE_URL_CATS=${DATABASE_URL_CATS}
ENV DATABASE_URL_CAFE=${DATABASE_URL_CAFE}

# Copy built files
COPY --from=builder /app/frontend/dist ./frontend/dist

# Install production dependencies only using workspace feature
RUN npm ci --omit=dev

# Expose server port
EXPOSE 3000

# Start the server using npm workspace
CMD ["npm", "run", "start"]