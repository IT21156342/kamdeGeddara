const express = require("express");
const router = express.Router();
const {addPurchaseStock,getAllPurchaseStock,updatePurchaseStock,deletePurchaseStock,getPurchaseTeaLeavesID} = require("../controllers/PurchaseTeaLeavesController");
// routes tea
router.post("/add", addPurchaseStock );
router.get("/getAll", getAllPurchaseStock);
router.put("/", updatePurchaseStock);
router.delete("/:id",deletePurchaseStock);
router.get("/:id", getPurchaseTeaLeavesID);

module.exports = router;
