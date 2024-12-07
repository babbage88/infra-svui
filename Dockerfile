FROM node:lts AS builder
WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM nginx:latest as runner

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

