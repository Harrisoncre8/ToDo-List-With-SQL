CREATE TABLE todo(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (500) NOT NULL,
  "status" VARCHAR (80) DEFAULT 'In Progress'
);

INSERT INTO "todo" ("task", "status") VALUES ('Do homework', DEFAULT);
INSERT INTO "todo" ("task", "status") VALUES ('Go sleep at 10pm', DEFAULT);
INSERT INTO "todo" ("task", "status") VALUES ('Clean fridge', DEFAULT);
INSERT INTO "todo" ("task", "status") VALUES ('Clean bathroom', DEFAULT);
INSERT INTO "todo" ("task", "status") VALUES ('Wrap presents', DEFAULT);

SELECT * FROM todo;