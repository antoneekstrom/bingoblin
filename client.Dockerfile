FROM arm64v8/node:12-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY . .

RUN yarn

RUN yarn build

CMD yarn start
