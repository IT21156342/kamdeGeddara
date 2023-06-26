const TransactionModel = require("../models/TransactionModel");

//add new transaction
const addTransaction = async (req, res) => {
    const {
        transactionID,
        transactionType,
        transactionDate,
        transactionAmount,
        transactionDescription,
    } = req.body;
 //console.log(transactionAmount);
    const result = await TransactionModel.find();
    const transactionCount = result.length;

    //generate new custom id for item
    const autoGenerateItemId = `TR${transactionCount + 1}`;

    const mongooseRes = new TransactionModel({
        transactionID: autoGenerateItemId,
        transactionType,
        transactionDate,
        transactionAmount,
        transactionDescription,
    })

    mongooseRes.save().then((result) => {
        res
            .status(200)
            .json({
                message: "Transaction added successfully",
                result: {
                    data: result,
                    response: true,
                },
            })
    });
}
// Read all transactions in the system
const getAllTransaction = async (req, res) => {
    let results = await TransactionModel.find();
    if (!(results)) {
        res.status(500).json({
            message: "Error while getting all transaction",
            error: "Something went wrong",
        });
    } else {
        res.status(200).json({
            message: "All transaction details",
            data: results,
        });
    }
};
// update transaction details

const updateTransaction = async (req, res) => {
    const {
        transactionID,
        transactionType,
        transactionDate,
        transactionAmount,
        transactionDescription,
    } = req.body;
    try {
        const result = await TransactionModel.findOneAndUpdate({transactionID: transactionID}, {
            transactionID,
            transactionType,
            transactionDate,
            transactionAmount,
            transactionDescription,
        });
        res.status(200).send({message: "Transaction updated successfully", data: result});
    } catch (e) {
        res.status(500).send({message: "Something went wrong", error: e});
    }
};
//delete transaction
const deleteTransaction = async (req, res) => {
    const response = await TransactionModel.findByIdAndDelete(req.params.id);
    if (!(response)) {
        res.status(500).send(err);
    } else {
        res.status(200).json({
            message: "Transaction Delete successfully",
            result: {
                data: response,
                response: true,
            },
        });
    }
};
// search transaction
const getTransactionByID = async (req, res) => {
    console.log(req.params.id);
    const response = await TransactionModel.findOne({transactionID: req.params.id});
    if (!(response)) {
        res.status(500).send("Transaction not found");
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
    addTransaction,
    getAllTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionByID
};