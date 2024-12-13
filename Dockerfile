FROM node:lts AS builder
WORKDIR /app
# Build argument to accept NODE_ENV from the docker build command
ARG NODE_ENV
# Set the environment variable based on the build argument
ENV NODE_ENV=$NODE_ENV

COPY package.json .
COPY package-lock.json .

RUN npm install --include=dev --legacy-peer-deps

COPY . .
RUN npm run build -- --mode=$NODE_ENV

FROM nginx:latest AS runner

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

