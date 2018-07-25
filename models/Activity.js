const mongoose = require('mongoose');
const schema = require('mongoose').Schema;

const ActivitySchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    registrationEndDate: {type: Date, default:Date.now},
    createdAt: {type: Date, default: Date.now},
    imageURL: {type: String, default:"https://blog.interlink-ua.com/wp-content/uploads/sites/2/2018/02/DSC_0084.jpg"},
    isActive: {type:Boolean,default: true},
    tasks:[{
        id:{type:String, default: "id"},
        title:{type:String, default:"title"},
        isActive:{type:Boolean, default:false}
    }],
    persons: [schema.ObjectId]
});

const Activity = mongoose.model('Activity', ActivitySchema, 'activities');

module.exports = Activity;