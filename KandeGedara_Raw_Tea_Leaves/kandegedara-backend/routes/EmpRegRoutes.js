const express = require("express");
const router = express.Router();
const { addEmp, getAllEmp, updateEmp, deleteEmp, getEmpByID} = require("../controllers/EmpRegController");

router.post("/", addEmp);
router.get("/", getAllEmp); //chenged  from "" to "/All"
router.put("/", updateEmp);
router.delete("/:id", deleteEmp);
router.get("/:id", getEmpByID);

module.exports = router;

