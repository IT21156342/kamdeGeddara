const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sellSchema = new Schema({
    ID: {type: String, required: true},
    itemName: {type: String, required: true},
    salesRef: {type: String, required: true},
    vehicleID: {type: String, required: true},
    foctoryName: {type: String, required: true},
    foctoryAddress: {type: String, required: true},
    buyerName: {type: String, required: true},
    leavesWeight: {type: String, required: true},
    price: {type: String, required: true},
    date: {type: String, required: true},
})

const Sell = mongoose.model("Sell",sellSchema);
module.exports = Sell;  
