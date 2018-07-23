const Task = require('../models/Task');

class TaskController {

    find() {
        return Task.find();
    }

    create(guest) {
        return Task.create(guest);
    }

    findById(id) {
        return Task.findById(id);
    }

    removeById(id) {
        return Task.findByIdAndRemove(id);
    }

    updateById(id, body) {
        return Task.findByIdAndUpdate(id, body, {new: true});

    }
}

module.exports = new TaskController();