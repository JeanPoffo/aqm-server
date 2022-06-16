FROM node:16.15.1-alpine as node

FROM node as base
WORKDIR /aqm
COPY /package.json .
COPY /yarn.lock .
RUN yarn install

FROM base as build
COPY /src ./src
COPY /tsconfig.json .
RUN yarn global add typescript
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]