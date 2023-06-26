const express = require("express");
const router = express.Router();
const {addSell,getAllSoldTeaLeaves,updateSoldTealeaves,deleteSell,getSellingById} = require("../controllers/SellController");

router.post("/",addSell);
router.get("/",getAllSoldTeaLeaves);
router.put("/", updateSoldTealeaves);
router.delete("/:id",deleteSell);
router.get("/:id", getSellingById);

module.exports = router;
