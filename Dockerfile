FROM node:lts AS builder
WORKDIR /app
ARG NODE_ENV
ENV NODE_ENV=development

COPY package.json .
COPY package-lock.json .

RUN npm install --include=dev

COPY . .
RUN npm run build

FROM nginx:latest AS runner

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

