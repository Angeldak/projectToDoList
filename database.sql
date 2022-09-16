CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY,
	"note" varchar(255) NOT NULL,
	"is-complete" boolean DEFAULT FALSE,
	"when-complete" date DEFAULT NULL
	);
	
SELECT * FROM "tasks";

INSERT INTO "tasks" ("note", "is-complete")
VALUES ('Test task 1', false),
('Test task 2', false),
('Test task 3', false);

DELETE FROM "tasks" WHERE "id"='2';

UPDATE "tasks" SET "is-complete"=(NOT "is-complete") WHERE "id"='3';