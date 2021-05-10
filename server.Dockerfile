FROM arm64v8/node:12-alpine

WORKDIR /usr/src/app

COPY package.json tsconfig.server.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn server-build

ENV NODE_ENV=production

CMD ["yarn", "server-start"]