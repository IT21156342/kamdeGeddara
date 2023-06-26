import validator from 'validator';

const ItemValidation = (data) => {
    let errors = {};
    const {
        itemID,
        itemName,
        itemRate,
        reduceAmountForWater,
        reduceAmountForBag,
        description,
        itemImg,
    } = data;

    console.log(data)

    if (validator.isEmpty(itemName)) {
        errors.itemName = 'Input your Item Name';
    } else if (itemName === undefined) {
        errors.itemName = 'Input your Item Name';
    } else {
        const pattern = /^[a-zA-Z ]*$/;
        if (pattern.test(itemName) === false) {
            errors.itemName = 'Input your item name in alphabets';
        }
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };
};

export default ItemValidation;
