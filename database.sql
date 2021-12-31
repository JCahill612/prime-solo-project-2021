
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"user_role" varchar(255) NOT NULL DEFAULT 'regular',
	"user_email" varchar(255) UNIQUE NOT NULL,
	"user_address" varchar(255) UNIQUE NOT NULL,
	"zip_code" INTEGER NOT NULL,
	"phone_no" varchar(255) UNIQUE NOT NULL
);


CREATE TABLE "toys" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
	"description" VARCHAR (80) NOT NULL,
	"toy_image_url" varchar(1000),
	"toy_image_name" varchar(255),
	"status" varchar(255) NOT NULL DEFAULT 'available',
	"toys_userid" bigint NOT NULL,
	FOREIGN KEY ("toys_userid") REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE "trade" (
    "id" SERIAL PRIMARY KEY,
    "offering_userid" bigint NOT NULL,
	"requested_userid" bigint NOT NULL,
	"offered_toyid" bigint NOT NULL,
	"requested_toyid" bigint NOT NULL,
	"status" varchar(255) NOT NULL DEFAULT 'incomplete',
	"message" varchar(255),
	FOREIGN KEY ("offering_userid") REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ("requested_userid") REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ("offered_toyid") REFERENCES "toys"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ("requested_toyid") REFERENCES "toys"(id) ON DELETE CASCADE ON UPDATE CASCADE
);



