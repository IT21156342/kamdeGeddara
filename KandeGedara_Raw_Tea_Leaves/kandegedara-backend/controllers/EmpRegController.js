const EmpRegModel = require("../models/EmpRegModel");

//add new item
const addEmp = async (req, res) => {
    const {
        empID,
        empFName,
        empLName,
        empNIC,
        empDOB,
        empGender,
        empMobile,
        empAddress,
    } = req.body;

    const result = await EmpRegModel.find();
    const EmpRegCount = result.length;

    //generate new custom id for item
    const autoGenerateEmpId = `Emp${EmpRegCount + 1}`;

    const mongooseRes = new EmpRegModel({
        empID: autoGenerateEmpId,
        empFName,
        empLName,
        empNIC,
        empDOB,
        empGender,
        empMobile,
        empAddress
    })

    mongooseRes.save().then((result) => {
        res
            .status(200)
            .json({
                message: "Employee Registered successfully",
                result: {
                    data: result,
                    response: true,
                },
            })
    });
}
// Read all items in the system
const getAllEmp = async (req, res) => {
    let results = await EmpRegModel.find();
    if (!(results)) {
        res.status(500).json({
            message: "Error while getting all items",
            error: "Something went wrong",
        });
    } else {
        res.status(200).json({
            message: "All Employee details",
            data: results,
        });
    }
};
// update item details

const updateEmp = async (req, res) => {
    const {
        empID,empFName,empLName,empNIC,empDOB,empGender,empMobile,empAddress,empImg
    } = req.body;
    try {
        const result = await EmpRegModel.findOneAndUpdate({empID: empID}, {
            empID,empFName,empLName,empNIC,empDOB,empGender,empMobile,empAddress,empImg
        });
        res.status(200).send({message: " Employee updated successfully", data: result});
    } catch (e) {
        res.status(500).send({message: "Something went wrong", error: e});
    }
};
//delete item
const deleteEmp = async (req, res) => {
    const response = await EmpRegModel.findByIdAndDelete(req.params.id);
    if (!(response)) {
        res.status(500).send(err);
    } else {
        res.status(200).json({
            message: "Employee deleted successfully",
            result: {
                data: response,
                response: true,
            },
        });
    }
};
// search item
const getEmpByID = async (req, res) => {
    const response = await EmpRegModel.findOne({empID: req.params.id});
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
    addEmp,
    getAllEmp,
    updateEmp,
    deleteEmp,
    getEmpByID,
};