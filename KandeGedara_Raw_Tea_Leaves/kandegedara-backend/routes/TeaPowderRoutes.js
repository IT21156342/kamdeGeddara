const express = require("express");
const router = express.Router();
const {ALLPoweder,AddTeapoweder,updateTeapowder,getTeapowder,deleteTeapower} =require("../controllers/TeapowderController")
const { Addbuyer,ALLPowederBuy,updateTeaBuy,getTeaBuy,deleteTeabuyer} = require("../controllers/TeapowderBuyController")

//last producte 
router.post("/teaPowder",AddTeapoweder);
router.get("/allBuyer",ALLPoweder);
router.put("/updetaeTea/:id", updateTeapowder);
router.delete("/dlete/:id", deleteTeapower);
router.get("/serchTea/:id", getTeapowder);

//last prducte buy details
router.post("/addBuyer",Addbuyer);
router.get("/all",ALLPowederBuy);
router.put("/updates/:id", updateTeaBuy);
router.delete("/delete/:id", deleteTeabuyer);
router.get("/serBuyer/:id", getTeaBuy);

module.exports = router;