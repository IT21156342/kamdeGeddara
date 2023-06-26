const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmpRegSchema = new Schema({

    empID: {type: String, required: true},
    empFName: {type: String, required: true},
    empLName: {type: String, required: true},
    empNIC: {type: String, required: true},
    empDOB: {type: String, required: true},
    empGender: {type: String, required: true},
    empMobile: {type: String, required: true},
    empAddress: {type: String, required: true},

});

const EmpReg = mongoose.model("EmpReg",EmpRegSchema);
module.exports = EmpReg;
