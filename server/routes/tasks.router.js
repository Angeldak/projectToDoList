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

module.exports = router;
