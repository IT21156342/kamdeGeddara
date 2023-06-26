const EmpAttendanceModel = require("../models/EmpAttendance");

//add new sstg
const addEmployeeAttendance = async (req, res) => {
    const {
        ID,
        date,
        empID,
        empName,
        signedTime,
        leaveTime,

    } = req.body;

    const result = await EmpAttendanceModel.find();
    const empCount = result.length;
    const autoGenerateEmpId = `${empCount + 1}`;


    const mongooseRes = new EmpAttendanceModel({
        ID: autoGenerateEmpId,
        date,
        empID,
        empName,
        signedTime,
        leaveTime,

    })

    mongooseRes.save().then((result) => {
        res
            .status(200)
            .json({
                message: "Employee Attendance added successfully",
                result: {
                    data: result,
                    response: true,
                },
            })
    });
}

// Read all sstg in the system
const getAllEmpAttendance = async (req, res) => {
    let results = await EmpAttendanceModel.find();
    if (!(results)) {
        res.status(500).json({
            message: "Error while getting all attendance",
            error: "Something went wrong",
        });
    } else {
        res.status(200).json({
            message: "All employee attendance details",
            data: results,
        });
    }
};

// update sstg details
const UpdateEmpAttendance = async (req, res) => {
    const empid = req.params.id;
    const {
        ID,
        date,
        empID,
        empName,
        signedTime,
        leaveTime,

    } = req.body;
    try {
        const result = await EmpAttendanceModel.findByIdAndUpdate(empid, {
            ID,
            date,
            empID,
            empName,
            signedTime,
            leaveTime,
        });
        res.status(200).send({message: "Employee attendance updated successfully", data: result});
    } catch (e) {
        res.status(500).send({message: "Something went wrong", error: e});
    }
};

//delete sstg
const deleteEmpAttendance = async (req, res) => {
    const response = await EmpAttendanceModel.findByIdAndDelete(req.params.id);
    if (!(response)) {
        res.status(500).send(err);
    } else {
        res.status(200).json({
            message: "Employee Attendance Deleted successfully",
            result: {
                data: response,
                response: true,
            },
        });
    }
};

// search ssg
const getEmpAttendanceByID = async (req, res) => {
    const response = await EmpAttendanceModel.findOne({empID: req.params.id});
    if (!(response)) {
        res.status(500).send(err);
    } else {
        res.status(200).json({
            result: {
                data: response,
                response: true,
            },
        });
    }
};
module.exports = {
    addEmployeeAttendance,
    UpdateEmpAttendance,
    deleteEmpAttendance,
    getAllEmpAttendance,
    getEmpAttendanceByID,
};
