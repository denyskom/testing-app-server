const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String},
    email: {type: String, required:true},
    phone: {type: String,required:true},
    birth_date:{type:Date,required:true},
    photo:{type:String,default: "https://ppgzone-39u4nsxgmu93y.netdna-ssl.com/wp-content/uploads/batman-profile-pic.jpg"},
    english: {type: String},
    basics: {type: String},
    literature:{type:String}
});

const Person = mongoose.model('Person', PersonSchema, 'persons');
module.exports = Person;


// "name": "Sebastian Bach",
//     "password":"123456",
//     "email": "ok@gmail.com",
//     "phone": "0674660466",
//     "birth_date":"1.02.1976",
//     "photo": "https://ppgzone-39u4nsxgmu93y.netdna-ssl.com/wp-content/uploads/batman-profile-pic.jpg",
//     "english":"початковий (читаю та пишу зі словником)",
//     "basics":"Java",
//     "literature":"Clean code"