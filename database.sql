
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" character varying(80) NOT NULL UNIQUE,
    "password" character varying(1000) NOT NULL,
    "user_email" character varying(255),
    "user_location" character varying(80),
    "user_date" date DEFAULT CURRENT_DATE,
    "create_date" date
);

CREATE TABLE post (
    "post_id" integer DEFAULT nextval('toys_id_seq'::regclass) PRIMARY KEY,
    "post_name" character varying(240),
    "post_body" character varying(360),
    "post_image" character varying(1000),
    "post_date" character varying(80),
    "user_id" character varying(80),
    FOREIGN KEY (user_id) REFERENCES "user"(id),
);

CREATE TABLE message (
    "id" integer DEFAULT nextval('messages_id_seq'::regclass) PRIMARY KEY,
    "first_name" character varying(80),
    "email" character varying(200),
    "message_body" character varying(500),
    "create_date" date
);

CREATE TABLE message_recipient (
    "id" SERIAL PRIMARY KEY,
    "user_id" character varying(80),
    "message_id" integer
);

CREATE TABLE user_cart_toy (
    "id" SERIAL PRIMARY KEY,
    "user_id" character varying(80),
    "toys_id" character varying(1000)
);