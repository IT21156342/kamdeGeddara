import validator from 'validator';

const PurchaseTeaLeavesValidations = (data) => {
    let errors = {};
    const {
        itemName,
        SSTGID,
        SSTGName,
        date,
        vehicalID,
        rate,
        leavesWeight,
        reduceAmountForWater,
        reduceAmountForBag,
        reduceAmountForFertilized,
    } = data;

    console.log(data)

    if (validator.isEmpty(itemName)) {
        errors.itemName = 'Please select item name';
    } else if (itemName === undefined) {
        errors.itemName = 'Please select item nam';
    }

    if (validator.isEmpty(SSTGID)) {
        errors.SSTGID = 'Input your SSTG ID ';
    } else if (SSTGID === undefined) {
        errors.SSTGID = 'Input your SSTG ID';
    } else {
        const pattern = /^SSTG\d+$/;
        if (pattern.test(SSTGID) === false) {
            errors.SSTGID = 'SSTG ID must starts with "SSTG" ';
        }
    }
    if (validator.isEmpty(SSTGName)) {
        errors.SSTGName = 'Input your SSTG Name ';
    } else if (SSTGName === undefined) {
        errors.SSTGName = 'Input your SSTG Name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(itemName) === false) {
            errors.itemName = 'Input your small scale tea growers name in alphabets';
        }
    }

    if (validator.isEmpty(date)) {
        errors.date = 'Please select date';
    } else if (date === undefined) {
        errors.date = 'Please select date';
    }

    if (validator.isEmpty(vehicalID)) {
        errors.vehicalID = 'Please enter vehical ID';
    } else if (vehicalID === undefined) {
        errors.vehicalID = 'Please enter vehical ID';
    }

    if (validator.isEmpty(rate)) {
        errors.rate = 'Please enter rate';
    } else if (rate === undefined) {
        errors.rate = 'Please enter rate';
    }

    if (validator.isEmpty(leavesWeight)) {
        errors.leavesWeight = 'Please enter leaves weight';
    } else if (leavesWeight === undefined) {
        errors.leavesWeight = 'Please enter leaves weight';
    }

    if (validator.isEmpty(reduceAmountForWater)) {
        errors.reduceAmountForWater = 'Please enter reduce amount for water ';
    } else if (reduceAmountForWater === undefined) {
        errors.reduceAmountForWater = 'Please enter rate';
    }

    if (validator.isEmpty(reduceAmountForBag)) {
        errors.reduceAmountForBag = 'Please enter rate';
    } else if (reduceAmountForBag === undefined) {
        errors.reduceAmountForBag = 'Please enter rate';
    }

    if (validator.isEmpty(reduceAmountForFertilized)) {
        errors.reduceAmountForFertilized = 'Please enter reduce amount for fertilized';
    } else if (reduceAmountForFertilized === undefined) {
        errors.reduceAmountForFertilized = 'Please enter reduce amount for fertilized';
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };


};

export default PurchaseTeaLeavesValidations;