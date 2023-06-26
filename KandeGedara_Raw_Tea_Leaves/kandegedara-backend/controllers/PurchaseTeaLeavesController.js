const purchaseTeaLeavesModel = require("../models/PurchaseTeaLeavesModel");


//add new stock
const addPurchaseStock = async (req, res) => {
    const {
        purchaseTeaLeavesID,
        itemName,
        SSTGID,
        SSTGName,
        date,
        vehicalID,
        rate,
        leavesWeight,
        reduceAmountForWater,
        reduceAmountForBag,
        reduceAmountForFertilized,
    } = req.body;

    const result = await purchaseTeaLeavesModel.find();
    const purchaseTeaLeavesCount = result.length;

    //generate new custom id for item
    const autoGeneratePurchaseTeaLeavesID = `PTL${purchaseTeaLeavesCount + 1}`;

    const mongooseRes = new purchaseTeaLeavesModel({
        purchaseTeaLeavesID: autoGeneratePurchaseTeaLeavesID,
        itemName,
        SSTGID,
        SSTGName,
        date,
        vehicalID,
        rate,
        leavesWeight,
        reduceAmountForWater,
        reduceAmountForBag,
        reduceAmountForFertilized,
    })

    mongooseRes.save().then((result) => {
        res
            .status(200)
            .json({
                message: "Added new raw tea leaves stock successfully",
                result: {
                    data: result,
                    response: true,
                },
            })
    });
}

// Read all purchase stock in the system
const getAllPurchaseStock = async (req, res) => {
    let results = await purchaseTeaLeavesModel.find();
    if (!(results)) {
        res.status(500).json({
            message: "Error while getting all Purchase Stock",
            error: "Something went wrong",
        });
    } else {
        res.status(200).json({
            message: "All Purchase Stock details",
            data: results,
        });
    }
};

// update purchase stock details
const updatePurchaseStock = async (req, res) => {
    const {
        purchaseTeaLeavesID,
        itemName,
        SSTGID,
        SSTGName,
        date,
        vehicalID,
        rate,
        leavesWeight,
        reduceAmountForWater,
        reduceAmountForBag,
        reduceAmountForFertilized,
    } = req.body;
    try {
        const result = await purchaseTeaLeavesModel.findOneAndUpdate({purchaseTeaLeavesID: purchaseTeaLeavesID}, {
            purchaseTeaLeavesID,
            itemName,
            SSTGID,
            SSTGName,
            date,
            vehicalID,
            rate,
            leavesWeight,
            reduceAmountForWater,
            reduceAmountForBag,
            reduceAmountForFertilized,
        });
        res.status(200).send({message: "Purchase Tea Leaves Stock Updated Successfully", data: result});
    } catch (e) {
        res.status(500).send({message: "Something went wrong", error: e});
    }
};

//delete purchase stock
const deletePurchaseStock  = async (req, res) => {
    const response = await purchaseTeaLeavesModel.findByIdAndDelete(req.params.id);
    if (!(response)) {
        res.status(500).send(err);
    } else {
        res.status(200).json({
            message: "Raw Tea Leaves Stock Deleted successfully",
            result: {
                data: response,
                response: true,
            },
        });
    }
};

// search purchase tea stock leave
const getPurchaseTeaLeavesID = async (req, res) => {
    const response = await purchaseTeaLeavesModel.findOne({purchaseTeaLeavesID: req.params.id});
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
    addPurchaseStock,
    getAllPurchaseStock,
    updatePurchaseStock,
    deletePurchaseStock,
    getPurchaseTeaLeavesID,
};