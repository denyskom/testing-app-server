const express = require('express');
const Person = require('../models/Person');
const bcrypt = require('bcrypt');
const validateRegisterInput = require('../validation/registration');



const router = express.Router();

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


module.exports = {
    router
};