FROM arm64v8/node:12-alpine as deps
WORKDIR /usr/src/app
COPY package.json tsconfig.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM arm64v8/node:12-alpine as builder
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN yarn build

FROM arm64v8/node:12-alpine as run
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .

ENV NODE_ENV=production
CMD ["yarn", "start"]
