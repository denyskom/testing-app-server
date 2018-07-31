const validator = require('validator');
const isEmpty = require('./is-empty');
const errorMassages = require('./massages/massages').errorMassages;

const minFieldLength = 2;
const maxFieldLength = 30;

module.exports = function validateLoginInput(data) {
    let errors = {};


    data.password = !isEmpty(data.password)?data.password:'';
    data.email = !isEmpty(data.email)?data.email:'';




    if(!validator.isLength(data.password, {min:minFieldLength,max:maxFieldLength})) {
        errors.password = errorMassages.password;
    }

    if(validator.isEmpty(data.password)) {
        errors.password = errorMassages.password;
    }

    if(!validator.isEmail(data.email)) {
        errors.email = errorMassages.emailIncorrect;
    }

    if(validator.isEmpty(data.email)) {
        errors.email = errorMassages.email;
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
};