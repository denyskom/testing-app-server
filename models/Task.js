const mongoose = require('mongoose');

const TaskSchema  = mongoose.Schema({
    title:{type:String, required:true},
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
            replyTo:{type:String,default:"0"}
        }
    ],
    interns:[{
        id:{type:String},
        name:{type:String},
        email:{type:String},
        phone:{type:String},
        photo:{type:String},
        isPassed:{type:Boolean,default:false}
    }]

});

const Task = mongoose.model('Task', TaskSchema, 'tasks');
module.exports = Task;
