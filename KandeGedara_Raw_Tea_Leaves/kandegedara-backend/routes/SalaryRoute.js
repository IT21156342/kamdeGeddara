const express = require("express");
const router = express.Router();
const {addsalart,getAllsalary,deletesalary,updatesalary,getslarys} = require('../controllers/SalaryController')

router.post("/add",addsalart);
router.get("/getsalary",getAllsalary);
router.post("/update/:id", updatesalary);
router.delete("/delete/:id", deletesalary);
router.get("/ser/:id", getslarys);

module.exports = router;