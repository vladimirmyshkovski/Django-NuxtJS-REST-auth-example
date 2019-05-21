FROM node:10.0.0-alpine

ENV HOST 0.0.0.0

COPY ./compose/local/nuxt/start /start-nuxt
RUN sed -i 's/\r//' /start-nuxt
RUN chmod +x /start-nuxt

COPY ./.envs/.local/.nuxt /app/frontend/.env

COPY ./frontend /app/frontend
COPY ./frontend/package.json /app/frontend/package.json
COPY ./frontend/package-lock.json /app/frontend/package-lock.json

WORKDIR /app/frontend

RUN npm install

EXPOSE 3000