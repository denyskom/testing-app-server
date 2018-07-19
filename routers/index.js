const express = require('express');
const router = express.Router();

const Activity = require('../models/Activity');
const Person = require('../models/Person');


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



module.exports = router;