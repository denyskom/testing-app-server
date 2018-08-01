const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.get('/stages/:id', function (req, res) {
    Task.find({activityId:req.params.id})
        .then(task => res.json(task))
        .catch(err => res.status(500).json({error: err}))
});

module.exports = router;