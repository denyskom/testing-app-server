const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require('../models/Task');

const restRouter = require('./restfull-router');
const activityRouter = require('./activity');
const registrationRouter = require('./register');
const loginRouter = require('./login');

const controllers = require('../controllers');


require('../config/passport')(passport);

router.get('/stages/:id', function (req, res) {
    Task.find({activityId:req.params.id})
        .then(task => res.json(task))
        .catch(err => res.status(500).json({error: err}))
});


router.use(loginRouter);
router.use(registrationRouter);
router.use(activityRouter.route, activityRouter.router);

for (let path in controllers) {
    router.use(`/${path}`,restRouter(controllers[path]));
}

module.exports = router;

