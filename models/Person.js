const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String},
    email: {type: String, required:true},
    phone: {type: String,required:true},
    birth_date:{type:Date,default: Date.now},
    photo:{type:String,default: "https://ppgzone-39u4nsxgmu93y.netdna-ssl.com/wp-content/uploads/batman-profile-pic.jpg"},
    english: {type: String},
    basics: {type: String},
    literature:{type:String},
    auth:{type:String,default:"user"},
    activities:[{
            id:{type:String},
            title:{type:String},
            description:{type:String},
            isActive:{type:Boolean, default:true},
    }]
});

const Person = mongoose.model('Person', PersonSchema, 'persons');
module.exports = Person;