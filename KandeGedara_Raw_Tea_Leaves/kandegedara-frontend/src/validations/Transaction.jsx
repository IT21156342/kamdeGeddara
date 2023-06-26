import validator from 'validator';

const TransactionValidation = (data) => {
    let errors = {};
    const {
        transactionID,
        transactionType,
        transactionDate,
        transactionAmount,
        transactionDescription,
    } = data;

    console.log(data)

    if (validator.isEmpty(transactionType)) {
        errors.transactionType = 'Please select the transaction type';
    } else if (transactionType === undefined) {
        errors.transactionType = 'Please select the transaction type';
    }

    if (validator.isEmpty(transactionDate)) {
        errors.transactionDate = 'Input your Transaction Date';
    } else if (transactionDate === undefined) {
        errors.client_DOB = 'Input your Transaction Date';
    }
    if (validator.isEmpty(transactionAmount)) {
        errors.transactionAmount = 'Input your Transaction Amount';
    } else if (transactionAmount === undefined) {
        errors.transactionAmount = 'Input your Transaction Amount';
    }

    if (validator.isEmpty(transactionDescription)) {w
        errors.transactionDescription = 'Input your transaction description ';
    } else if (transactionDescription === undefined) {
        errors.transactionDescription = 'Input your transaction description';
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };
};

export default TransactionValidation;
