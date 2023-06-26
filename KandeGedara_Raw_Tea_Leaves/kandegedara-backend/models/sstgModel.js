const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sstgSchema = new Schema({
    sstgID: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIC: {type: String, required: true},
    gender: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    address: {type: String, required: true},
    area: {type: String, required: true},
    dob: {type: String, required: true},
});

const SSTG = mongoose.model("sstg",sstgSchema);
module.exports = SSTG;