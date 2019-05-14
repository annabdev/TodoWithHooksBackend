const express = require("express");
const app = express();
const PORT = 6000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const db = require("./keys").mongoURI;


mongoose
.connect(
    db, { useNewUrlParser: true}
)
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));



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
  console.log("post called")
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

