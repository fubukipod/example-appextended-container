FROM node:14-bullseye AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:14-bullseye

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src/server ./src/server
COPY --from=builder /app/static ./static

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "src/server/app.js"]
