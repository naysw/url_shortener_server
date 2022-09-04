# URL Shortener

## Table of Contents

- [Overview](#overview)
- [Installation and Setup Server](#installation-and-setup-server)
- [Installation and Setup Client](#installation-and-setup-client)

## Overview

URL shortern application, build with React (Frontend) and NestJS (Backend) MYSQL (Database). Working demo [Demo Link](https://xdea.lyr.id) is here. If you setup on your local machine, please make sure you clone both `server` and `client` since we are not combine them.

## Installation and Setup Server

```bash
git@github.com:naysw/url_shortener_server.git
```

```bash
cd your project folder
```

```bash
yarn install

or

npm install
```

Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

open `.env` file and replace with your database crenditials on `DATABASE_URL` and `ACCESS_TOKEN_SECRET`

```bash
DATABASE_URL="mysql://<user>:<password>@localhost:3306/<database>"

ACCESS_TOKEN_SECRET=
```

start application with localhost

```bash
yarn dev

or

npm run dev
```

Migrate database and Seed dummy data

```bash
yarn prisma migrate reset

or

npm run prisma migrate reset

// enter Y/y and press Enter to cofirm reset database
```

if you want to go with `docker` container

```bash
// build docker image
docker build -t url_shortener_server .

// start docker container
docker run -d -p 4000:4000 --env-file ./evn url_shortener_server
```

## Installation and Setup Server

```bash
git@github.com:naysw/url_shortener_client.git
```

```bash
cd your project folder
```

```bash
yarn install

or

npm install
```

start application with localhost

```bash
yarn start

or

npm run start
```

once your application is up and running, you can start play around with provided features.

First, you may need to login to perform certain tasks.you could use below demo crenditials

```
Admin,
username: "admin"
password: "password"

User
username: "user"
password: "password"
```

Note:: if you have loggedin with `user` , you will not able to see admin dashboard `localhost:3000/admin` that can check link statictis, deleting link and so on.
