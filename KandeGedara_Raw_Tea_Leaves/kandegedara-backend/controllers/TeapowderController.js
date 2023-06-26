const TeaPoweder = require("../models/Teapowedwesalse")

const AddTeapoweder = (req,res)=>{

    const {PowderId,Powedername, Teaprice,Quantity} = req.body
    const TeasAdd = new TeaPoweder({
        PowderId,Powedername, Teaprice,Quantity
    })

    TeasAdd.save().then((result)=>{

        res.status(200) .json({
            message: "TEApowder ADD SUCCESFULL",
            result: {
                data: result,
                response: true,
            },
        }).catch((err) => {
            console.log("err", err);
            res.status(400).json(err);
        });

    })
}

const ALLPoweder = (req,res)=>{
    TeaPoweder.find().then((Tea)=>{

        res.json(Tea)
     
       }).catch((err)=>{
         console.log(err)
       })
}

//Update teapoweder

const updateTeapowder = ((req,res) =>{
    let userid =req.params.id;

    const{PowderId,Powedername, Teaprice,Quantity}=req.body;

    const updateTeapowder ={
        PowderId,Powedername, Teaprice,Quantity
      }
      const update =  TeaPoweder.findByIdAndUpdate(userid,updateTeapowder).then((req,res)=>{

        res.status(200).send({stat : "Teapoweder update "})


      }).catch((err)=>{

        res.status(500).send({status : "Teapoweder update  not",error :  err.massage});

      })


});

//serch Teapoweder

const getTeapowder = (req, res) => {
    let teaId =req.params.id
    const y = TeaPoweder.findById(teaId).then(()=>{

   //  res.json()
        res.status(200).send({status : "Tea Catch "})
    }).catch((err)=>{

        console.log(err.massage);
        res.status(500).send({status : "erroe wthit Tea Catch"});

    })

  
};

//delete teapower
const deleteTeapower = (req, res)=>{

    let teaid =req.params.id;
    TeaPoweder.findByIdAndDelete(teaid).then(()=>{
      
        res.status(200).send({status : "Tea delete"});
   
  
     }).catch((err) =>{
  
      console.log(err.massage);
      res.status(200).send({status : "Tea delete not",errpr : err.massage});
  
     })
}

module.exports = {
    AddTeapoweder,ALLPoweder,
    updateTeapowder,
    getTeapowder,
    deleteTeapower

}