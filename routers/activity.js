const express = require('express');
const passport = require('passport');
const Activity = require('../models/Activity');
const Person = require('../models/Person');





const router = express.Router();

router.post('/:id/add/:user_id', passport.authenticate('jwt', {session:false}), (req,res) => {
    let activity = req.body;
    let personId = req.params.user_id;
    Activity.findByIdAndUpdate(req.params.id,{$addToSet: {persons: personId}})
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

router.delete('/:id/delete/:user_id', passport.authenticate('jwt', {session:false}),(req,res) => {
    let userId = req.params.user_id;
    let activityId = req.params.id;
    Person.findByIdAndUpdate(userId,{$pull:{activities:{id:activityId}}})
        .then(() => Activity.findByIdAndUpdate(activityId, {$pull:{persons:userId}})
            .then(activity => {res.json(activity)}).catch(err => res.status(500).json({error: err}))
        ).catch(err => res.status(500).json({error: err}));
});

router.get('/:id/persons' , (req,res) => {
    Activity.findById(req.params.id)
        .populate('persons')
        .then(activities => res.json(activities.persons)).catch(err => res.status(500).json({error: err}));
});


module.exports = {
    route:'/activity',
    router
};