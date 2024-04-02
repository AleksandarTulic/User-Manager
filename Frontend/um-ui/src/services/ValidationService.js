function validateRole(value){
    if (!value){
        return false;
    }
    
    let regex = /^[A-Za-z]{1,}[A-Za-z0-9-_]{1,}$/;
    
    return regex.test(value);
}

function validateUser(username, password, firstName, lastName){
    let result = '';

    if (!username){
        result = 'Username is required.';
    }

    if (!password){
        result += 'Password is required.';
    }

    if (!firstName){
        result += 'First name is required.';
    }

    if (!lastName){
        result += 'Last name is required.';
    }

    let regexUsername = /^[A-Za-z@0-9_-]{2,100}$/;
    let regexPassword = /^[A-Za-z0-9_-]{6,60}$/;
    let regexFirstName = /^[A-Za-z]{2,100}$/;
    let regexLastName = /^[A-Za-z]{2,100}$/;

    if (!regexUsername.test(username)){
        result += 'Invalid username.';
    }

    if (!regexPassword.test(password)){
        result += 'Invalid password.';
    }

    if (!regexFirstName.test(firstName)){
        result += 'Invalid first name.';
    }

    if (!regexLastName.test(lastName)){
        result += 'Invalid last name.';
    }

    return result;
}

export {validateRole, validateUser};