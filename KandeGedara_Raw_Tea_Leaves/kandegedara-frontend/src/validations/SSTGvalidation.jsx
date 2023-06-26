import validator from 'validator';

const SSTGValidation = (data) => {
    let errors = {};
    const {
        sstgID,
        firstName,
        lastName,
        NIC,
        gender,
        email,
        mobile,
        address,
        area,
        dob,
    } = data;

    console.log(data)

    if (validator.isEmpty(firstName)) {
        errors.firstName = 'Input your firstName';
    } else if (firstName === undefined) {
        errors.firstName = 'Input your firstName';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(firstName) === false) {
            errors.firstName = 'Input your first name in alphabets';
        }
    }

    if (validator.isEmpty(lastName)) {
        errors.lastName = 'Input your lastName ';
    } else if (lastName === undefined) {
        errors.lastName = 'Input your lastName';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(lastName) === false) {
            errors.lastName = 'Input your last name in alphabets';
        }
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };


};

export default SSTGValidation;
