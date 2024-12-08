FROM node:lts AS builder
WORKDIR /app
ARG NODE_ENV
ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest as runner

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

