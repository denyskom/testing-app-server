const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const keys = require('../config/keys');
const passport = require('passport');

const Activity = require('../models/Activity');
const Person = require('../models/Person');
const Task = require('../models/Task');

const restRouter = require('./restfull-router');
const controllers = require('../controllers');
const validateRegisterInput = require('../validation/registration');
const validateLoginInput = require('../validation/login');


require('../config/passport')(passport);

router.get('/stages/:id', function (req, res) {
    Task.find({activityId:req.params.id})
        .then(task => res.json(task))
        .catch(err => res.status(500).json({error: err}))
});

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    const inputError = {inputError:"Email or password are wrong"};

    Person.findOne({email:email})
        .then(user => {
            if(!user) {
                return res.status(404).json(inputError);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user._id,
                            photo:user.photo
                        };
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn:3600},
                            (err, token) => {
                                return res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }
                            );
                    } else {
                        return res.status(404).json(inputError);
                    }
                })
        })
        .catch(err => res.status(500).json({error: err}))
    }
);

router.post('/activity/:id/add/:user_id', passport.authenticate('jwt', {session:false}), (req,res) => {
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

router.delete('/activity/:id/delete/:user_id', passport.authenticate('jwt', {session:false}),(req,res) => {
    let userId = req.params.user_id;
    let activityId = req.params.id;
    Person.findByIdAndUpdate(userId,{$pull:{activities:{id:activityId}}})
        .then(() => Activity.findByIdAndUpdate(activityId, {$pull:{persons:userId}})
            .then(activity => {res.json(activity)}).catch(err => res.status(500).json({error: err}))
        ).catch(err => res.status(500).json({error: err}));
});

router.get('/activity/:id/persons' , (req,res) => {
    Activity.findById(req.params.id)
        .populate('persons')
        .then(activities => res.json(activities.persons)).catch(err => res.status(500).json({error: err}));
});


router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    Person.findOne({email:req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({emailError:'Please chose another email'})
            } else {
                const newUser = new Person({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone,
                    birth_date: req.body.birth_date,
                    photo: req.body.photo,
                    english:req.body.english,
                    basics:req.body.basics,

                    university: req.body.university,
                    faculty: req.body.faculty,
                    course: req.body.course,
                    events: req.body.events,
                    literature: req.body.literature,
                    whyIT: req.body.whyIT,
                    technologies: req.body.technologies,
                    mainInJob: req.body.mainInJob,
                    positiveSides: req.body.positiveSides,
                    negativeSides: req.body.negativeSides,

                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) {
                            throw err;
                        }

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.error(err))
                    })
                    }
                )

            }
        }
        )
});

for (let path in controllers) {
    router.use(`/${path}`,restRouter(controllers[path]));
}

module.exports = router;

