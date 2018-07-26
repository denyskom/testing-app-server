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

router.post('/login', (req, res) =>
    Person.findOne({email:req.body.email,password:req.body.password})
        .then(person => res.json(person))
        .catch(err => res.status(500).json({error: err}))
);

router.post('/participate', (req,res) => {
    let activity = req.body;
    let personId = activity.personId;
    Activity.findByIdAndUpdate(activity._id,{$addToSet: {persons: personId}})
        .then(() => Person.findByIdAndUpdate(personId,{$addToSet:{
                activities: {
                    id:activity._id,
                    title:activity.title,
                    description:activity.description,
                }
            }
        }).then(person => res.json(person)).catch(err => res.status(500).json({error: err}))
        ).catch(err => res.status(500).json({error: err}));
});

router.patch('/participate', (req,res) => {
    let userId = req.body.userId;
    let activityId = req.body.activityId;
    Person.findByIdAndUpdate(userId,{$pull:{activities:{$elemMatch:{id:activityId}}}})
        .then(() => Activity.findByIdAndUpdate(activityId, {$pull:{persons:userId}})
            .then(activity => {res.json(activity)}).catch(err => res.status(500).json({error: err}))
        ).catch(err => res.status(500).json({error: err}));
});

module.exports = router;

