const mongoose = require("mongoose");
// schema tea
const Schema = mongoose.Schema;
const purchaseSchema = new Schema({
    purchaseTeaLeavesID: {type: String, required: true},
    itemName: {type: String, required: true},
    SSTGID: {type: String, required: true},
    SSTGName: {type: String, required: true},
    date: {type: String, required: true},
    vehicalID: {type: String, required: true},
    rate: {type: String, required: true},
    leavesWeight: {type: String, required: true},
    reduceAmountForWater: {type: String, required: true},
    reduceAmountForBag: {type: String, required: true},
    reduceAmountForFertilized: {type: String, required: true},
});

const purchaseTeaLeaves = mongoose.model("purchaseTeaLeaves",purchaseSchema);
module.exports = purchaseTeaLeaves;