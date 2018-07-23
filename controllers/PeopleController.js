const Person = require('../models/Person');

class PeopleController {

    find() {
        return Person.find();
    }

    create(guest) {
        return Person.create(guest);
    }

    findById(id) {
        return Person.findById(id);
    }

    removeById(id) {
        return Person.findByIdAndRemove(id);
    }

    updateById(id, body) {
        return Person.findByIdAndUpdate(id, body, {new: true});

    }
}

module.exports = new PeopleController();