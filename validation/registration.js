const validator = require('validator');
const isEmpty = require('./is-empty');
const errorMassages = require('./massages/massages').errorMassages;
const minFieldLength = 2;
const maxFieldLength = 30;

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName)?data.firstName:'';
    data.lastName = !isEmpty(data.lastName)?data.lastName:'';
    data.password = !isEmpty(data.password)?data.password:'';
    data.passwordConfirm = !isEmpty(data.passwordConfirm)?data.passwordConfirm:'';
    data.email = !isEmpty(data.email)?data.email:'';
    data.phone = !isEmpty(data.phone)?data.phone:'';
    data.birth_date = !isEmpty(data.birth_date)?data.birth_date:'';
    data.english = !isEmpty(data.english)?data.english:'';


    if(!validator.isLength(data.firstName, {min:minFieldLength,max:maxFieldLength})) {
        errors.firstName = errorMassages.firstName;
    }

    if(validator.isEmpty(data.firstName)) {
        errors.firstName = errorMassages.firstName;
    }


    if(!validator.isLength(data.lastName, {min:minFieldLength,max:maxFieldLength})) {
        errors.lastName = errorMassages.lastName;
    }

    if(validator.isEmpty(data.lastName)) {
        errors.lastName = errorMassages.lastName;
    }


    if(!validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = errorMassages.passwordConfirmNonMatch;
    }

    if(!validator.isLength(data.password, {min:minFieldLength,max:maxFieldLength})) {
        errors.password = errorMassages.password;
    }

    if(validator.isEmpty(data.password)) {
        errors.password = errorMassages.password;
    }

    if(!validator.isLength(data.passwordConfirm, {min:minFieldLength,max:maxFieldLength})) {
        errors.passwordConfirm = errorMassages.passwordConfirm;
    }

    if(validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = errorMassages.passwordConfirm;
    }



    if(!validator.isEmail(data.email)) {
        errors.email = errorMassages.emailIncorrect;
    }

    if(validator.isEmpty(data.email)) {
        errors.email = errorMassages.email;
    }

    if(!validator.isMobilePhone(data.phone,'uk-UA')) {
        errors.phone = errorMassages.phoneIncorrect;
    }

    if(validator.isEmpty(data.phone)) {
        errors.phone = errorMassages.phone;
    }


    if(validator.isEmpty(data.birth_date)) {
        errors.birth_date = errorMassages.birth_date;
    }

    if(validator.isEmpty(data.english)) {
        errors.english = errorMassages.english;
    }


    return {
        errors,
        isValid:isEmpty(errors)
    }
};