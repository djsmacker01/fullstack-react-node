As you are learning to code, it is important to understand the big picture, how does
React connect to a backend application on Node, and how can we trace the CRUD (create - read - update - delete) actions all the way from Frontend to Backend.

This is the repository that helps you understand that, and we will cover this in detail on: [www.codehance.com](https://www.codehance.com)

## Backend Setup

Change directory into the backend folder

```
cd backend
```

Then run npm install command

```
npm install --save-dev
```

> Be sure to have postgresql already installed

Run this in your terminal:

```
psql
```

> Use below to create an example database, user, password.
> substitute details below to match your chosen credentials

```
CREATE USER fullstack_user WITH PASSWORD 'fullstack_user@*';
CREATE DATABASE fullstack_dev WITH OWNER fullstack_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO fullstack_user;
\q
```

Rename `.env-example` to `.env`

Update `.env` details to match those you created above e.g:

```
PORT=4000
NODE_ENV=development
DB_USER=fullstack_user
DB_PASSWORD=fullstack_user@*
DB_NAME=fullstack_dev
DB_HOST=localhost
DB_PORT=5432
```

Create a user database record within pgadmin

```
CREATE EXTENSION pgcrypto WITH SCHEMA public;

DROP TABLE IF EXISTS public."users";

CREATE TABLE IF NOT EXISTS public."users"
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    first_name character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."users"
    OWNER to fullstack_user;
```

Finally start your backend server with:

```
npm run start
```

## Frontend Setup

Change into the frontend project

```
cd frontend
```

Then run npm install command

```
npm install --save-dev
```

Start the server

```
npm run start
```
