const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String},
    email: {type: String, required:true},
    phone: {type: String,required:true},
    birth_date:{type:Date},
    photo:{type:String,default: "https://ppgzone-39u4nsxgmu93y.netdna-ssl.com/wp-content/uploads/batman-profile-pic.jpg"},
    english: {type: String},
    basics: {type: String},

    university:{type:String, default:""},
    faculty:{type:String, default:""},
    course:{type:String, default:""},
    events:{type:String, default:""},
    literature:{type:String},
    whyIT:{type:String, default:""},
    technologies:{type:String, default:""},
    mainInJob:{type:String, default:""},
    positiveSides:{type:String, default:""},
    negativeSides:{type:String, default:""},


    auth:{type:String,default:"user"},
    activities:[{
            id:{type:mongoose.Schema.Types.ObjectId, ref: 'activities' },
            title:{type:String},
            description:{type:String},
            isActive:{type:Boolean, default:true},
    }]
});

const Person = mongoose.model('Person', PersonSchema, 'persons');
module.exports = Person;