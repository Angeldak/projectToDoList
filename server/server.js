const express = require("express");
const app = express();
const taskRouter = require("./routes/tasks.router");
const PORT = process.env.PORT || 5000;

app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/tasks", taskRouter);

app.listen(() => {
  console.log("Listening on PORT:", PORT);
});
