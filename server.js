const express = require("express");
const app = express();
const PORT = 4200;
const monk = require("monk");
const bodyParser = require("body-parser");
const cors = require("cors");


const url = require("./keys").mongoURI;


const db = monk(url);

db.then(() => {
  console.log("Connected to MongoDB");
});
const people = db.get("work");


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
})
const todo = app.get("work")

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const result = await todo.find()
  console.log("get called");
  res.status(200).send(result);
})

app.post("/", async (req, res) => {
  const result = await todo.insert(req.body)
  console.log("post worked")
  res.status(200).send(result)
})

app.put("/:id", async (req, res) => {
  const result = await todo.findOneAndUpdate(req.params.id, req.body)
  console.log("put called")
  res.status(200).send(result)
})

app.delete("/:id", async (req, res) => {
  const result = await todo.findOneAndDelete(req.params.id)
  console.log("delete called")
  res.status(200).send(result)
});

