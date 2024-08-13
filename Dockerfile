FROM node:20.16-alpine3.19

COPY . /opt/app
WORKDIR /opt/app

RUN yarn install
CMD yarn run dev
