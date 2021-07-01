ARG PROJECT_NAME

# setup base image

FROM node:16 AS base

ARG PROJECT_NAME

WORKDIR /usr/src/${PROJECT_NAME}

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends bash git \
    && rm -rf /var/lib/apt/lists/*

COPY tsconfig.json ./
COPY package.json ./
COPY yarn.lock ./

COPY src ./src

# install packages

FROM base AS packager

ARG PROJECT_NAME

WORKDIR /usr/src/${PROJECT_NAME}

RUN yarn --frozen-lockfile

# lint app

FROM packager AS lint

ARG PROJECT_NAME

WORKDIR /usr/src/${PROJECT_NAME}

COPY .eslintignore ./
COPY .eslintrc.js ./

COPY --from=base /usr/src/${PROJECT_NAME}/src ./src

RUN yarn run lint-es

# test app

FROM packager AS test

ARG PROJECT_NAME

WORKDIR /usr/src/${PROJECT_NAME}

COPY jest.config.ts ./

COPY --from=base /usr/src/${PROJECT_NAME}/src ./src

RUN yarn run test

# build app

FROM packager AS build

ARG PROJECT_NAME

WORKDIR /usr/src/${PROJECT_NAME}

COPY --from=base /usr/src/${PROJECT_NAME}/src ./src

RUN yarn run build

# validate app

FROM packager AS validate

ARG PROJECT_NAME

WORKDIR /usr/src/${PROJECT_NAME}

COPY .eslintignore ./
COPY .eslintrc.js ./
COPY jest.config.ts ./

COPY --from=base /usr/src/${PROJECT_NAME}/src ./src

RUN yarn run lint-es \
    && yarn run test \
    && yarn run build

# serve app and watch files

FROM packager AS start-local

ARG PROJECT_NAME

WORKDIR /usr/src/${PROJECT_NAME}

COPY .env ./

COPY --from=base /usr/src/${PROJECT_NAME}/src ./src

EXPOSE 5000

ENTRYPOINT ["yarn", "start:local"]

# create final, lean, deployable docker image

FROM base AS final

ARG PROJECT_NAME

RUN yarn --frozen-lockfile --production \
    && yarn cache clean

COPY --from=build /usr/src/${PROJECT_NAME}/dist ./dist

EXPOSE 5000

ENTRYPOINT ["yarn", "start"]
