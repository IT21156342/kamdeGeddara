const express=require("express");
const router=express.Router();

const{
    addVitamin,getAllVitamins,updateVitamin,deleteVitamin,getVitaminByID
}=require("../controllers/vitaminsController");

router.post("/add",addVitamin);
router.get("/",getAllVitamins);
router.put("/update/:id",updateVitamin);
router.delete("/delete/:id",deleteVitamin);
router.get("/get/:id",getVitaminByID);

module.exports=router;