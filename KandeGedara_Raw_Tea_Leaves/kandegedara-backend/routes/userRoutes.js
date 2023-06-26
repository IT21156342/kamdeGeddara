const router = require("express").Router();
const {checkUserAuth, getAllUsers} = require("../controllers/UserController");


router.post("/login", checkUserAuth);

module.exports = router;