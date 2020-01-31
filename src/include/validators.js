//HELPER FUNCTIONS
const isEmpty = (string) => {
    if(!isUndefined(string) && string.trim() === '') return true;
    else return false;
}

const isEmail = (email) => {
    // eslint-disable-next-line
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( email.match(regEx) ) return true;
    else return false;
}

const isUndefined = (value) => {
    return (typeof value === 'undefined');
}

export const validateSignupData = (data) => {
    let errors = {};

    //Check email
    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    else if(!isEmail(data.email)) errors.email = 'Must be a valid email address';
    //Check password
    if(isEmpty(data.password)) errors.password = 'Must not be empty';
    if(data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';
    //Check handle
    if(isEmpty(data.handle)) errors.handle = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

export const validateLoginData = (data) => {
    let errors = {};

    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    if(isEmpty(data.password)) errors.password = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}