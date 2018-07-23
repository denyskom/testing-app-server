const Activity = require('../models/Activity');


class ActivityController {

    find() {
        return Activity.find();
    }

    create(guest) {
        return Activity.create(guest);
    }

    findById(id) {
        return Activity.findById(id);
    }

    removeById(id) {
        return Activity.findByIdAndRemove(id);
    }

    updateById(id, body) {
        return Activity.findByIdAndUpdate(id, body, {new: true});

    }
}

module.exports = new ActivityController();