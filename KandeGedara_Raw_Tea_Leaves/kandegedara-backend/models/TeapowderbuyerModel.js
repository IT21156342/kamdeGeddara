const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeaBuyser = new Schema({

    _id:{
        type: String, required: true
       },
       Powedername : {
        type: String, required: true
       },
       PowederPrice : {
        type: String, required: true
       },
       Qty : {
        type: String, required: true
       },
       customeName : {

        type: String, required: true
       },
       CustomeAddress : {
        type: String, required: true
       },
       CustmerEmail : {
        type: String, required: true
       },
       CustomerContact : {
        type: String, required: true
       },
       Totale: {
        type: String, required: true
       }
},
{
    timestamps : true
    
})


const TeaBuy = mongoose.model("TeaPowderBuyser",TeaBuyser)
module.exports = TeaBuy