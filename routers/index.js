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
const activityRouter = require('./activity');
const registrationRouter = require('./register');

const controllers = require('../controllers');
const validateLoginInput = require('../validation/login');


require('../config/passport')(passport);

router.get('/stages/:id', function (req, res) {
    Task.find({activityId:req.params.id})
        .then(task => res.json(task))
        .catch(err => res.status(500).json({error: err}))
});



router.use(registrationRouter.router);
router.use(activityRouter.route, activityRouter.router);

for (let path in controllers) {
    router.use(`/${path}`,restRouter(controllers[path]));
}

module.exports = router;

