// const express = require('express');
import  express  from "express";

// create express app
const app = express();

// Define your route
app.get('/', (req, res) => {

    // console.log(req.query, req.headers);
    res.send("over the hedge")
});

app.get('/ping', (req, res) => {

    // console.log(req.query, req.headers);
    res.send("ping pong")
});

app.get('/file', (req, res) => {
// process. current working directory
    console.log(process.cwd());
    res.sendFile(process.cwd() + "/index.html");
});

// Listen for incoming requests
app.listen(4000, () => {

    console.log("Express app is running!")
});