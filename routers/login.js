const express = require('express');
const Person = require('../models/Person');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validateLoginInput = require('../validation/login');


const router = express.Router();

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
                                        token: 'Bearer ' + token,
                                        user:user
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

module.exports = router;