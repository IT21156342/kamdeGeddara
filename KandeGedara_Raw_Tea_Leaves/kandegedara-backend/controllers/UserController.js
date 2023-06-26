const UserModel = require("../models/UserModel");

const checkUserAuth = async (req, res) => {
    //get all user details
    let results = await UserModel.findOne();
    //check
    if (!(results)) {
        res.status(500).json({
            message: "Error while getting all users",
            error: "Something went wrong",
        });
    } else {
        //check user email and password is correct from request body
        if (results.email === req.body.email && results.password === req.body.password) {
            res.status(200).json({
                message: true,
                data: results,
            });
        } else {
            console.log(results.email, "req.body.email", req.body.email, "results.password", results.password, "req.body.password", req.body.password);
            res.status(200).json({
                message: "User email or password is incorrect",
                data: results,
            });
        }
    }
}


module.exports = {
    checkUserAuth
}