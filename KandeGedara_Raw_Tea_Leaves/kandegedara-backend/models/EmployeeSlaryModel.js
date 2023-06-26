const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slary = new Schema(
    {
        EmployeeID: {
            type: String, required: true
        },
        EmployeeName : {
            type: String, required: true
        },
        PayamentpayDay:{
            type :String,
            required: true

        },
        OTHours : {
            type: String, required: true
        },
        Expense :{
            type: String, required: true
        },
        MOnthSalary :{
            type: String, required: true
        },
        Taxs : {
            type: String, 
            required: true
        }
    },{
        timestamps : true
        
    }
)

const Slary = mongoose.model("Slary",slary);
module.exports = Slary;