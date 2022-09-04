# URL Shortener

## Table of Contents

- [Overview](#overview)
- [Installation and Setup Server](#installation-and-setup-server)
- [Installation and Setup Client](#installation-and-setup-client)

## Overview

URL shortern application, build with React (Frontend) and NestJS (Backend) MYSQL (Database). You can find working demo [Demo Link](https://xdea.lyr.id) here. If you are trying to setup on your local machine, please make sure you clone both `server` and `client` and setup correclty since we are not combine them.

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

once everything setup correctly, you can start application by running

```bash
yarn dev

or

npm run dev
```

To be able to use demo users, roles, and any others, you will nee to run migration and seed database.

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

## Installation and Setup Client

Clone react repo

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

Once your application is up and running, you can start play around. First, you may need to login to perform certain tasks. you could use below demo credentials

```
Admin,
username: "admin"
password: "password"

User
username: "user"
password: "password"
```

Note:: Please login with `admin` user to be able to see admin dashboard `localhost:3000/admin` that can checking link statistics, deleting link and so on.

- If you follow and seed dummy data as above step, and when you try to make short this `https://google.com`, you will get error response

```bash
Sorry! URL with "https://google.com" is not allowed, please try another one
```

- When you try to access link that already expired, you will got `Gone Exception`

```bash
{
    "statusCode": 410,
    "message": "Link is expired",
    "error": "Gone"
}

```
