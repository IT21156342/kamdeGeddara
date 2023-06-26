const salarycon = require("../models/EmployeeSlaryModel")

const addsalart = (req,res)=>{

    const{EmployeeID ,EmployeeName,PayamentpayDay,OTHours,Expense,MOnthSalary,Taxs}=req.body

    const addsalary = new salarycon({
        EmployeeID ,EmployeeName,PayamentpayDay,OTHours,Expense,MOnthSalary,Taxs
    })

    addsalary.save().then((result) => {
        res.status(200) .json({
                message: "salry added successfully",
                result: {
                    data: result,
                    response: true,
                },
            })
    }).catch((err) => {
        console.log("err", err);
        res.status(400).json(err);
    });
}
// Read all slary in the system
const getAllsalary = (req,res) => {
    salarycon.find().then((students)=>{

        res.json(students)
     
       }).catch((err)=>{
         console.log(err)
       })
};
// update salary details

const updatesalary = (async(req,res) =>{
    let userid =req.params.id;

    const{EmployeeID ,EmployeeName,PayamentpayDay,OTHours,Expense,MOnthSalary,Taxs}=req.body;

    const updatesalary ={
        EmployeeID ,EmployeeName,PayamentpayDay,OTHours,Expense,MOnthSalary,Taxs
      }
      const update = await salarycon.findByIdAndUpdate(userid,updatesalary).then((req,res)=>{

        res.status(200).send({stat : "user update "})


      }).catch((err)=>{

        res.status(500).send({status : "user update  not",error :  err.massage});

      })


});
// search salrye
const getslarys = (req, res) => {
    let usetId =req.params.id
    const y = salarycon.findById(usetId).then((d)=>{

   //  res.json()
        res.status(200).send(d)
    }).catch((err)=>{

        console.log(err.massage);
        res.status(500).send({status : "erroe wthit get user"});

    })

  
};
//delete salary
const deletesalary = (req, res)=>{

    let usetId =req.params.id;
    salarycon.findByIdAndDelete(usetId).then(()=>{
      
        res.status(200).send({status : "user delete"});
   
  
     }).catch((err) =>{
  
      console.log(err.massage);
      res.status(200).send({status : "user delete",errpr : err.massage});
  
     })
}

module.exports = {
    addsalart,
    getAllsalary,
    updatesalary,
    deletesalary,
    getslarys
}