const express = require('express');
const router = express.Router();

const Activity = require('../models/Activity');
const Person = require('../models/Person');
const Task = require('../models/Task');


router.get('/activities', function (req, res) {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(err => res.status(500).json({error: err}))
});

router.post('/activities', function (req,res) {
    Activity.create(req.body)
        .then(activities => res.json(activities))
        .catch(err => res.status(500).json({error: err}));
});

router.get('/people', function (req, res) {
    Person.find()
        .then(activities => res.json(activities))
        .catch(err => res.status(500).json({error: err}))
});

router.post('/people', function (req,res) {
    Person.create(req.body)
        .then(activities => res.json(activities))
        .catch(err => res.status(500).json({error: err}));
});

router.get('/people/:id', function (req, res) {
    Person.findById(req.params.id)
        .then(activities => res.json(activities))
        .catch(err => res.status(500).json({error: err}))
});

router.get('/tasks', function (req, res) {
    Task.find()
        .then(task => res.json(task))
        .catch(err => res.status(500).json({error: err}))
});

router.post('/tasks', function (req,res) {
    Task.create(req.body)
        .then(task => res.json(task))
        .catch(err => res.status(500).json({error: err}));
});

router.get('/tasks/:id', function (req, res) {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(500).json({error: err}))
});



module.exports = router;