const express = require('express');
const router = require('../testing-app-server/routers/index');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


const DB_URL ='mongodb://localhost:27017/inCamp';

mongoose.connect(DB_URL, { useNewUrlParser: true }, function (err) {
    if(err) {
        console.error('Mongo connection FAIL: ' + err);
    }  else {
        console.log('Mongo connection OK');
    }
});


app.use(cors());
app.use(express.json());
app.use(router);


module.exports = app;