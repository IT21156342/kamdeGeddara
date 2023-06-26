const express = require("express");
const router = express.Router();
const {addSSTG,getAllsstg,updateSSTG,deleteSSTG,getSSTGByID} = require("../controllers/sstgController");

router.post("/add", addSSTG );
router.get("/getAll", getAllsstg);
router.put("/", updateSSTG);
router.delete("/:id",deleteSSTG);
router.get("/:id", getSSTGByID);

module.exports = router;
