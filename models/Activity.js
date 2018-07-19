const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    registrationEndDate: {type: Date},
    createdAt: {type: Date, default: Date.now},
    imageURL: {type: String, default:"https://blog.interlink-ua.com/wp-content/uploads/sites/2/2018/02/DSC_0084.jpg"}
});

const Activity = mongoose.model('Activity', ActivitySchema, 'activities');

module.exports = Activity;