const mongoose = require('mongoose');
const schema = require('mongoose').Schema;


const TaskSchema  = mongoose.Schema({
    title:{type:String, required:true},
    activityId:{type:String, required:true},
    description:{type:String,required:true},
    additionalInfo:{type:String},
    isAvailable:{type:Boolean,default:false},
    isFinished:{type:Boolean, default:false},
    demands:[
        {name:{type:String}}
    ],
    comments:[
        {
            userId:{type:String},
            name:{type:String},
            comment:{type:String},
            replyTo:{type:String,default:""}
        }
    ],
    interns:[schema.Types.ObjectId]

});

const Task = mongoose.model('Task', TaskSchema, 'tasks');
module.exports = Task;
