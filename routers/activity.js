const express = require('express');
const passport = require('passport');
const Activity = require('../models/Activity');
const Person = require('../models/Person');
const errorMassages = require('../validation/massages/massages').errorMassages;


const router = express.Router();

router.put('/:id/user/:user_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let activity = req.body;
    let personId = req.params.user_id;
    Activity.findByIdAndPutPerson(req.params.id,personId).then(() => Person.findByIdAndUpdate(personId,{$addToSet:{
                    activities: {
                        id:activity._id,
                        title:activity.title,
                        description:activity.description,
                    }
                }
            }).then(person => res.json(person)).catch(err => res.status(404).json({person: errorMassages.personNotFound}))
        ).catch(err => res.status(404).json({activity: errorMassages.activityNotFound}));
});

router.delete('/:id/user/:user_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let userId = req.params.user_id;
    let activityId = req.params.id;
    Person.findByIdAndUpdate(userId, {$pull: {activities: {id: activityId}}})
        .then(() => Activity.findByIdAndUpdate(activityId, {$pull: {persons: userId}})
            .then(activity => {
                res.json(activity)
            })
            .catch(err => res.status(404).json({activity: errorMassages.activityNotFound}))
        ).catch(err => res.status(404).json({person: errorMassages.personNotFound}));
});

router.get('/:id/persons', (req, res) => {
    Activity.findById(req.params.id)
        .populate('persons')
        .then(activities => res.json(activities.persons))
        .catch(err => res.status(404)
            .json({activity: errorMassages.activityNotFound}));
});


module.exports = {
    route: '/activity',
    router
};