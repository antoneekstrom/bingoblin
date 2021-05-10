FROM node:alpine

WORKDIR /usr/src/app

# EXPOSE 49153

ENV NODE_ENV=development

CMD yarn && yarn dev
