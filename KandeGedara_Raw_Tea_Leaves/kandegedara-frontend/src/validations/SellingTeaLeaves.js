import validator from 'validator';

const SellingTeaLeavesValidation = (data) => {
    let errors = {};
    const {
        itemName,
        salesRef,
        vehicleID,
        foctoryName,
        foctoryAddress,
        buyerName,
        leavesWeight,
        price,
        date,
    } = data;

    console.log(data)

    if (validator.isEmpty(itemName)) {
        errors.itemName = 'Input your item name';
    } else if (itemName === undefined) {
        errors.itemName = 'Input your item name';
    
    }

    if (validator.isEmpty(salesRef)) {
        errors.salesRef = 'Input your sales ref name';
    } else if (salesRef === undefined) {
        errors.salesRef = 'Input your sales ref name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(salesRef) === false) {
            errors.salesRef = 'Input your sales ref name in alphabets';
        }
    }

    if (validator.isEmpty(vehicleID)) {
        errors.vehicleID = 'Input your sales ref name';
    } else if (vehicleID === undefined) {
        errors.vehicleID = 'Input your sales ref name';
    }else {
        const pattern = /^[A-Z0-9]{2}\d{4}$/;
        if (pattern.test(vehicleID) === false) {
            errors.foctoryAddress = 'In vehicle ID first 2 charecters must be either uppercase letters or numbers and the last 4 charecters must be numbers';
        }
    }


    if (validator.isEmpty(foctoryName)) {
        errors.foctoryName = 'Input your factory name';
    } else if (foctoryName === undefined) {
        errors.foctoryName = 'Input your factory name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(salesRef) === false) {
            errors.salesRef = 'Input the factory name in alphabets';
        }
    }

    if (validator.isEmpty(foctoryAddress)) {
        errors.foctoryAddress = 'Input your factory address';
    } else if (foctoryAddress === undefined) {
        errors.foctoryAddress = 'Input your factory address';
    }

    // } else {
    //     const pattern = /^[A-Z]*$/;
    //     if (pattern.test(foctoryAddress) === false) {
    //         errors.foctoryAddress = 'Input the factory address in alphabets and numbers';   
    //     }
    // }

    if (validator.isEmpty(buyerName)) {
        errors.buyerName = 'Input your buyer name';
    } else if (buyerName === undefined) {
        errors.buyerName = 'Input your buyer name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(buyerName) === false) {
            errors.buyerName = 'Input your buyer name in alphabets';
        }
    }

    if (validator.isEmpty(leavesWeight)) {
        errors.leavesWeight = 'Input your leaves weight';
    } else if (leavesWeight === undefined) {
        errors.leavesWeight = 'Input your leaves weight';
    }else {
        const pattern = /^[0-9]*$/;
        if (pattern.test(leavesWeight) === false) {
            errors.leavesWeight = 'Input the leaves weight in numbers';
        }
    }
    
    if (validator.isEmpty(price)) {
        errors.price = 'Input the total amount';
    } else if (price === undefined) {
        errors.price = 'Input the total amount';
    }else {
        const pattern = /^[0-9]*$/;
        if (pattern.test(price) === false) {
            errors.price = 'Input the total amount in numbers';
        }
    }

    if (validator.isEmpty(date)) {
        errors.price = 'Input the total amount';
    } else if (price === undefined) {
        errors.price = 'Input the total amount';
    }else {
        const pattern = /^[0-9]*$/;
        if (pattern.test(price) === false) {
            errors.price = 'Input the total amount in numbers';
        }
    }


    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };


};

export default SellingTeaLeavesValidation;
