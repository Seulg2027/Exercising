const express = require('express');
const mongoose = require('mongoose');
const config = require("./config/index");

const app = express();

const { MONGO_URI, PORT } = config;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(()=>{
    console.log(`mongodb connecting start`);
}).catch((err)=>{
    console.log(err);
});

const PORT = 7000;

app.listen(PORT, (req, res)=> {
    console.log(`Server started on ${PORT} port`);
});