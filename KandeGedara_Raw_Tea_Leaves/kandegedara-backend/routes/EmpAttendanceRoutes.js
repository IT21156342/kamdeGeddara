const express = require("express");
const router = express.Router();
const {  addEmployeeAttendance,
    UpdateEmpAttendance,
    deleteEmpAttendance,
    getAllEmpAttendance,getEmpAttendanceByID} = require("../controllers/EmpAtendanceController");

router.post("/", addEmployeeAttendance);
router.get("/", getAllEmpAttendance);
router.put("/:id", UpdateEmpAttendance);
router.delete("/:id", deleteEmpAttendance);
router.get("/:id", getEmpAttendanceByID);


module.exports = router;
