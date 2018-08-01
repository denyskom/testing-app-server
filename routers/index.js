const express = require('express');
const router = express.Router();
const passport = require('passport');

const stagesRouter = require('./stages');
const restRouter = require('./restfull-router');
const activityRouter = require('./activity');
const registrationRouter = require('./register');
const loginRouter = require('./login');

const controllers = require('../controllers');

require('../config/passport')(passport);


router.use(loginRouter);
router.use(registrationRouter);
router.use(stagesRouter);
router.use(activityRouter.route, activityRouter.router);

for (let path in controllers) {
    router.use(`/${path}`,restRouter(controllers[path]));
}

module.exports = router;

