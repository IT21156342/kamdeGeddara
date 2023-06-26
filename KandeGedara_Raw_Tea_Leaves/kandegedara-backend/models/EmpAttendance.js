const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmpAttendanceSchema = new Schema({
    ID: {type: String, required: true},
    date: {type: String, required: true},
    empID: {type: String, required: true},
    empName: {type: String, required: true},
    signedTime: {type: String, required: true},
    leaveTime: {type: String, required: true},

})

const Attendance = mongoose.model("Attendance",EmpAttendanceSchema);
module.exports = Attendance;
