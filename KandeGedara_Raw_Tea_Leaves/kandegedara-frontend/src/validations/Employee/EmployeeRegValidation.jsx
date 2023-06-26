import validator from 'validator';

const EmployeeRegValidation = (data) => {
    let errors = {};
    const {

        empFName,
        empLName,
        empNIC,
        empDOB,
        empGender,
        empMobile,
        empAddress,
    } = data;

    console.log(data)


    if (validator.isEmpty(empFName)) {
        errors.empFName = 'Input employee first name';
    } else if (empFName === undefined) {
        errors.empFName = 'Input employee first name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(empFName) === false) {
            errors.empFName = 'Input employee first name in alphabets';
        }
    }

    if (validator.isEmpty(empLName)) {
        errors.empLName = 'Input employee last name';
    } else if (empLName === undefined) {
        errors.empLName = 'Input employee last name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(empLName) === false) {
            errors.empLName = 'Input employee last name in alphabets';
        }
    }

    if (validator.isEmpty(empNIC)) {
        errors.empNIC = 'Input your sales ref name';
    } else if (empNIC === undefined) {
        errors.empNIC = 'Input your sales ref name';
    }else {
        const pattern = /^[0-9]{9}[vV]$/;
        const pattern2 = /^[0-9]{12}$/;
        if (pattern.test(empNIC) === false && pattern2.test(empNIC) === false) {
            errors.empNIC = 'Enter NIC number in correct format';
        }
    }


    if (validator.isEmpty(empDOB)) {
        errors.empDOB = 'Input Date of Birth';
    } else if (empDOB === undefined) {
        errors.empDOB = 'Input Data of Birth';
    }else {
        const dateOfBirth = new Date(empDOB);
        const currentDate = new Date();

        // Check if the input is a valid date
        if (isNaN(dateOfBirth.getTime())) {
            errors.empDOB = 'Please enter a valid date of birth';
        }
        // Check if the input is in the future
        if (dateOfBirth > currentDate) {
            errors.empDOB = 'Please enter a date of birth that is not in the future';
            return;
        }
        // Check if the input is less than 18 years old
        const ageDiffMs = Date.now() - dateOfBirth.getTime();
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 18) {
            errors.empDOB = 'Employee must be 18 years old or older to register';
        }
    }

    if (validator.isEmpty(empGender)) {
        errors.empGender = 'Input gender';
    } else if (empGender === undefined) {
        errors.empGender = 'Input gender';
    }


    if (validator.isEmpty(empMobile)) {
        errors.empMobile = 'Input mobile';
    } else if (empMobile === undefined) {
        errors.empMobile = 'Input mobile';
    } else {
        const pattern =/^\+[1-9]{2}[0-9]{3,12}$/;
        if (pattern.test(empMobile) === false) {
            errors.empMobile = 'Input the mobile number in correct format';
        }
    }

    if (validator.isEmpty(empAddress)) {
        errors.empAddress = 'Input employee address';
    } else if (empAddress === undefined) {
        errors.empAddress = 'Input employee address';
    }


    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };


};

export default EmployeeRegValidation;
