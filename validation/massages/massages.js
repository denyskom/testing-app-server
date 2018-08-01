const errorMassages = {
    firstName: 'First name must be between 2 and 30 characters',
    lastName: 'Last name must be between 2 and 30 characters',
    passwordConfirmNonMatch: 'Password and confirmation should match',
    password: 'Password must be between 2 and 30 characters',
    passwordConfirm: 'Password confirmation must be between 2 and 30 characters',
    emailIncorrect: 'Incorrect type of email',
    email: 'Email must not be empty',
    phoneIncorrect: 'Phone number has unacceptable characters or to short',
    phone: 'Phone number must not be empty',
    birth_date: 'You should peak a date',
    english: 'English field must not be empty',

    activityNotFound:'Activity not found',
    personNotFound:'Person not found'
};

module.exports = {
    errorMassages,
};