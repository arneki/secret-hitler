FROM node:lts

WORKDIR /app
COPY . ./
RUN yarn
RUN yarn run build
ENTRYPOINT node bin/dev.js