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
}); // end GET router

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
}); // end POST router

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
}); // end DELETE router

// Setup for PUT to update complete status
router.put("/togcomplete/:taskid", (req, res) => {
  const taskid = req.params.taskid;
  const queryText = `UPDATE "tasks" SET "is-complete"=(NOT "is-complete") WHERE "id"=$1;`;

  pool
    .query(queryText, [taskid])
    .then(() => {
      res.send(`Toggled complete status of ${taskid}`).status(200);
    })
    .catch((error) => {
      console.log("error in put to complete :>> ", error);
      res.send(`Error updating task complete`).status(500);
    });
}); // end PUT to complete router

module.exports = router;
