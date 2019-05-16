const express = require("express");
//  same as import express from "express"
const app = express()
const port = 4000
const monk = require('monk')
const cors = require('cors')
const bodyParser = require('body-parser')


// Connection URL
const url = 'mongodb://annabdev:psswrd@cluster0-shard-00-00-dv5uy.mongodb.net:27017,cluster0-shard-00-01-dv5uy.mongodb.net:27017,cluster0-shard-00-02-dv5uy.mongodb.net:27017/HOOKTODO?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
//change mongodb connection to 2.5 version

const db = monk(url);


db.then(() => {
    console.log('Connected correctly to server')
})

//extantiate middleware
app.use(cors())
app.use(bodyParser.json())


const Todos = db.get('backend')
//const '<database>' = db.get('<collection>')

app.get('/', (req, res) => {
    const result = Todos.find()
    console.log("get")
    res.status(200)
        //200 means it worked
        .send(result)
    })
    //.find grabs everything in the database and sends it


app.post('/', async (req, res) => {
        const result = await Todos.insert(req.body)
        console.log("Post")
        res.status(200).send(result)
    })

app.put('/:id', async (req, res) => {
        const result = await Todos.findOneAndUpdate(req.body, req.params.id)
        console.log("Put")
        res.status(200)
            //200 means it worked
            .send(result)
    })

app.delete('/:id', async (req, res) => {
        const result = await Todos.findOneAndDelete(req.params.id)
        console.log("delete")
        res.status(200)
            //200 means it worked
            .send(result)
    })

//the request is literally the fetch





app.listen(port, () => console.log(`Example app listening on port ${port}!`))