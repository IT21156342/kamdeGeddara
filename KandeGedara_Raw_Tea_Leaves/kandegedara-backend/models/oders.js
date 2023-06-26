const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const oderSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    sstg_id: {type: String, required: true},
    mobile: {type: String, required: true},
    item: {type: String, required: true},
    quantity: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    payment: {type: String, required: true},
    delivery: {type: String, required: true},
    status: {type: String, required: true},
})

const oders = mongoose.model("oders",oderSchema);

module.exports = oders;