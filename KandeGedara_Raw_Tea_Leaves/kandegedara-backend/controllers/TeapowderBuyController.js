const Teabuyser = require("../models/TeapowderbuyerModel")

//Add buyser 

const Addbuyer = (req, res) => {

    const {  _id, Powedername, PowederPrice, Qty, customeName, CustomeAddress, CustmerEmail, CustomerContact,Totale } = req.body

    const Buy = new Teabuyser({

        _id, Powedername, PowederPrice, Qty, customeName, CustomeAddress, CustmerEmail, CustomerContact,Totale
    })
    Buy.save().then((result) => {
        res.status(200).json({
            message: "Buyer added successfully",
            result: {
                data: result,
                response: true,
            },
        });
    }).catch((err) => {
        console.log("err", err);
        res.status(400).json(err);
    });;
}

const ALLPowederBuy = (req, res) => {
    Teabuyser.find().then((Tea) => {

        res.json(Tea)

    }).catch((err) => {
        console.log(err)
    })
}

//Update teapoweder

const updateTeaBuy = ( (req, res) => {
    let userid = req.params.id;

    const {_id, Powedername, PowederPrice, Qty, customeName, CustomeAddress, CustmerEmail, CustomerContact,Totale } = req.body;

    const updateTeapowder = {
        _id, Powedername, PowederPrice, Qty, customeName, CustomeAddress, CustmerEmail, CustomerContact,Totale
    }
    const update =  Teabuyser.findByIdAndUpdate(userid, updateTeapowder).then((req, res) => {

        res.status(200).send({ stat: "Teapoweder buyer update " })


    }).catch((err) => {

        res.status(500).send({ status: "Teapoweder buyser update  not", error: err.massage });
        console.log(err)

    })


});

//serch Teapoweder

const getTeaBuy = (req, res) => {
    let teaId = req.params.id
    const y = Teabuyser.findById(teaId).then(() => {

        //  res.json()
        res.status(200).send({ status: "Tea buyerCatch " })
    }).catch((err) => {

        console.log(err.massage);
        res.status(500).send({ status: "erroe wthit Tea  buyer Catch" });
    })
};

//delete teapower
const deleteTeabuyer = (req, res) => {

    let teaid = req.params.id;
    Teabuyser.findByIdAndDelete(teaid).then(() => {

        res.status(200).send({ status: "Tea buyer delete" });


    }).catch((err) => {

        console.log(err.massage);
        res.status(200).send({ status: "Tea buyer delete not", errpr: err.massage });

    })
}


module.exports = {
    Addbuyer,
    ALLPowederBuy, updateTeaBuy, getTeaBuy, deleteTeabuyer
}