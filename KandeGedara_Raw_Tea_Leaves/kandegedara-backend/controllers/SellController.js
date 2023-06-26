const SellModel = require("../models/SellModel");

//add new sell 
const addSell = async (req, res) => {
    const {
        ID,
        itemName,
        salesRef,
        vehicleID,
        foctoryName,
        foctoryAddress,
        buyerName,
        leavesWeight,
        price,
        date,
    } = req.body;

    const result = await SellModel.find();
    const sstgCount = result.length;

    //generate new custom id for item
    const autoGenerateSSTGId = `SELL${sstgCount + 1}`;

    const mongooseRes = new SellModel({
        ID :autoGenerateSSTGId,
        itemName,
        salesRef,
        vehicleID,
        foctoryName,
        foctoryAddress,
        buyerName,
        leavesWeight,
        price,
        date,
    })

    mongooseRes.save().then((result) => {
        res
            .status(200)
            .json({
                message: "Sold Stock added successfully",
                result: {
                    data: result,
                    response: true,
                },
            })
    });
}

const getAllSoldTeaLeaves = async (req, res) => {
    let results = await SellModel.find();
    if (!(results)) {
        res.status(500).json({
            message: "Error while getting all sold tea stock",
            error: "Something went wrong",
        });
    } else {
        res.status(200).json({
            message: "All sold stock details",
            data: results,
        });
    }
};

const updateSoldTealeaves = async (req, res) => {
    const {
        ID,
        itemName,
        salesRef,
        vehicleID,
        foctoryName,
        foctoryAddress,
        buyerName,
        leavesWeight,
        price,
        date,
    } = req.body;
    try {
        const result = await SellModel.findOneAndUpdate({ID: ID}, {
        ID,
        itemName,
        salesRef,
        vehicleID,
        foctoryName,
        foctoryAddress,
        buyerName,
        leavesWeight,
        price,
        date,
        });
        res.status(200).send({message: "stock updated successfully", data: result});
    } catch (e) {
        res.status(500).send({message: "Something went wrong", error: e});
    }
};

//delete sell

const deleteSell = async (req, res) => {
    const response = await SellModel.findByIdAndDelete(req.params.id);
    if (!(response)) {
        res.status(500).send(err);
    } else {
        res.status(200).json({
            message: "Sold stock Deleted successfully",
            result: {
                data: response,
                response: true,
            },
        });
    }
};
// search stock

const getSellingById = async (req, res) => {
    const response = await SellModel.findOne({ID: req.params.id});
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
    addSell,
    getAllSoldTeaLeaves,
    updateSoldTealeaves,
    deleteSell,
    getSellingById,
};