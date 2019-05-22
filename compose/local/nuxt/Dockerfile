FROM node:10.0.0-alpine

ENV HOST 0.0.0.0

COPY ./compose/local/nuxt/start /start-nuxt
RUN sed -i 's/\r//' /start-nuxt
RUN chmod +x /start-nuxt

COPY ./.envs/.local/.nuxt /app/frontend/.env

ADD ./frontend/package.json /app/frontend/
ADD ./frontend/package-lock.json /app/frontend/

WORKDIR /app/frontend

RUN npm install

ADD ./frontend /app/frontend/
