const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Teapowdersales = new Schema(
    {
       PowderId :{
        type: String, required: true
       },
       Powedername : {
        type: String, required: true
       },
       Teaprice : {
        type: String, required: true
       },
       Quantity : {
        type: String, required: true
       }

    },{
        timestamps : true
        
    }
)

const SalsePowder = mongoose.model("TeapowderSales", Teapowdersales);
module.exports = SalsePowder;