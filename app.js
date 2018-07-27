const express = require('express');
const router = require('../testing-app-server/routers/index');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// const DB_URL ='mongodb://localhost:27017/inCamp';
const DB_URL ='mongodb://user:a123456@ds020228.mlab.com:20228/in-camp';


mongoose.connect(DB_URL, { useNewUrlParser: true }, function (err) {
    if(err) {
        console.error('Mongo connection FAIL: ' + err);
    }  else {
        console.log('Mongo connection OK');
    }
});



app.use(cors());
app.use(express.json());
app.use("/api",router);
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


module.exports = app;