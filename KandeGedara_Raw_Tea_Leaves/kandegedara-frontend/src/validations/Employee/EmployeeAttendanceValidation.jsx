import validator from 'validator';

const EmployeeAttendanceValidation = (data) => {
    let errors = {};
    const {
        date,
        empID,
        empName,
        leaveTime,
        signedTime,
    } = data;

    if (validator.isEmpty(date)) {
        errors.date = 'Input Date';
    } else if (date === undefined) {
        errors.date = 'Input Date';
    }

    if (validator.isEmpty(empID)) {
        errors.empID = 'Input your sales ref name';
    } else if (empID === undefined) {
        errors.empID = 'Input your sales ref name';
    }

    if (validator.isEmpty(empName)) {
        errors.empName = 'Input your factory name';
    } else if (empName === undefined) {
        errors.empName = 'Input your factory name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(empName) === false) {
            errors.empName = 'Input the factory name in alphabets';
        }
    }


    if (validator.isEmpty(signedTime)) {
        errors.signedTime = 'Input employee signing  time';
    } else if (signedTime === undefined) {
        errors.signedTime = 'Input employee signing time';
    } else {
        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // Regular expression for HH:mm format
        if (regex.test(signedTime) === false) {
            errors.signedTime = 'Please enter a valid signing time in HH:mm format (Ex: 08:30)';
        }
    }
    if (validator.isEmpty(leaveTime)) {
        errors.leaveTime = 'Input employee leaving time';
    } else if (leaveTime === undefined) {
        errors.leaveTime = 'Input employee leaving time';
    } else {
        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // Regular expression for HH:mm format
        if (regex.test(leaveTime) === false) {
            errors.leaveTime = 'Please enter a valid leaving time in HH:mm format (Ex: 08:30)';
        }
    }
    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    }
};


export default EmployeeAttendanceValidation;
