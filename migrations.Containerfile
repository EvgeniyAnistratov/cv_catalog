FROM node:26-alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies
RUN npm install --legacy-peer-deps

COPY . .

# Apply migrations and seeds
CMD npm run db:migrate_deploy && npm run db:seed
