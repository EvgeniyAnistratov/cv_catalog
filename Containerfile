# BUILDER STAGE
FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install all dependencies
RUN npm install --legacy-peer-deps

COPY . .

# Build
RUN npm run build

# =================================
# RUNNER STAGE
FROM node:26-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/dist ./dist

CMD npm run start:prod
