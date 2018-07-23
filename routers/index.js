const express = require('express');
const router = express.Router();

const Activity = require('../models/Activity');
const Person = require('../models/Person');
const Task = require('../models/Task');

const restRouter = require('./restfull-router');
const controllers = require('../controllers');


for (let path in controllers) {
    router.use(`/${path}`,restRouter(controllers[path]));
}

router.get('/stages/:id', function (req, res) {
    Task.find({activityId:req.params.id})
        .then(task => res.json(task))
        .catch(err => res.status(500).json({error: err}))
});


module.exports = router;