const express=require("express");
const router=express.Router();

const{
    addOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
    getOrderByID
}=require("../controllers/ordersController");

router.post("/add",addOrder);
router.get("/",getAllOrder);
router.put("/update/:id",updateOrder);
router.delete("/delete/:id",deleteOrder);
router.get("/get/:id",getOrderByID);

module.exports=router;