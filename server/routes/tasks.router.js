const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// Setup GET to pull from database
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "tasks";`;

  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows).status(200);
    })
    .catch((error) => {
      console.log("error caught in get :>> ", error);
      res.sendStatus(500);
    });
});

// Setup POST to insert to database
router.post("/", (req, res) => {
  const { note } = req.body;
  const queryText = `INSERT INTO "tasks" ("note")
  VALUES ($1)`;

  pool
    .query(queryText, [note])
    .then(() => {
      res.send("Received new task").status(201);
    })
    .catch((error) => {
      console.log("error in post :>> ", error);
      res.send("Error in post").status(500);
    });
});

// Setup DELETE to remove from database
router.delete("/:taskid", (req, res) => {
  const taskid = req.params.taskid;
  const queryText = `DELETE FROM "tasks" WHERE "id"=$1`;

  pool
    .query(queryText, [taskid])
    .then(() => {
      res.send(`Deleted task id: ${taskid}`).status(200);
    })
    .catch((error) => {
      console.log("error in delete :>> ", error);
    });
});

module.exports = router;
