ARG APPDIR=/usr/app
ARG BASEIMAGE=node:16-alpine

FROM $BASEIMAGE as prepare
ARG APPDIR
WORKDIR $APPDIR
COPY package-lock.json package.json ./
RUN npm ci --production --ignore-scripts


FROM $BASEIMAGE as build
ARG APPDIR
WORKDIR $APPDIR
COPY package-lock.json package.json tsconfig.json ./
RUN npm ci --ignore-scripts
COPY src src
RUN npm run build

FROM $BASEIMAGE
ARG APPDIR
WORKDIR $APPDIR
COPY --from=build $APPDIR/dist dist
COPY --from=prepare $APPDIR/node_modules node_modules

CMD ["node", "dist/index.js"]
