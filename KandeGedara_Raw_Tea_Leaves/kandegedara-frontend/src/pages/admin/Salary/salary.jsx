import React,{useState,useEffect} from "react";
import '../../../styles/itemManagement.css';
import '../../../styles/SalryTable.css'
import axios from 'axios';
import myalter from "sweetalert2"
function SalryMangement() {

    const [Salary,setSalary]=useState([])
    const [serch,setsearch] = useState([])
    let [EmployeeName,setEmployeeName]=useState("")
    let [EmployeeID,seEmployeeID] =useState("")
    let [PayamentpayDay,setPayamentpayDay] =useState("")
    const [OTHours,setOTHours] =useState("")
    const [Expense,setExpense] =useState("")
    let [MOnthSalary,setMOnthSalary] =useState("")
   let[days,setdays] =useState()
    let [Taxs,setTaxs] =useState("")
    let[yes,setyes] =useState("")
   let h 
   let ID
   let expn
 // let [u,setu] =useState(0)
   let [otpoya,setvalue] =useState()
   let [otmonth,setmontotpay]=useState()

   function cla(){
    const o = PayamentpayDay *days
      
     let u = OTHours
     if(yes == "yes"){
       
      const    otken = OTHours*10/100
        
        otpoya = (PayamentpayDay/24*2) * otken
           u = u -otken 
        setvalue(otpoya)
     }else{
        otpoya = 0
        setvalue(otpoya)
     }
       
       
           otmonth =(PayamentpayDay*150/100)/24  *u
           setmontotpay(otmonth)
      if(o<50000){
            
        Taxs = o*10/100
      }else if(o>=50000){
        Taxs = o*20/100
      }else{

                Taxs =0
      }
      
      MOnthSalary =  o -Taxs + otpoya + otmonth
        setMOnthSalary(MOnthSalary)
        setTaxs(Taxs) 
   }
    function CalculateSalary(){
    /*  const o = PayamentpayDay *days
      
     let u = OTHours
     if(yes == "yes"){
       
      const    otken = OTHours*10/100
        
        otpoya = (PayamentpayDay/24*2) * otken
           u = u -otken 
        setvalue(otpoya)
     }else{
        otpoya = 0
        setvalue(otpoya)
     }
       
       
           otmonth =(PayamentpayDay*150/100)/24  *u
           setmontotpay(otmonth)
      if(o<50000){
            
        Taxs = o*10/100
      }else if(o>=50000){
        Taxs = o*20/100
      }else{

                Taxs =0
      }
      
      MOnthSalary =  o -Taxs + otpoya + otmonth
        setMOnthSalary(MOnthSalary)
        setTaxs(Taxs)  */
        cla()
        const AddMonthSalry  = {
            EmployeeName,EmployeeID,PayamentpayDay,Expense,OTHours,MOnthSalary,Taxs
        }

        axios.post("http://localhost:8000/Salary/add",AddMonthSalry).then((res)=>{

            alert(res.data)
            getAllSalaryCal()
        }).catch((err)=>{
             console.log(err)
        })
       
    }
    
   
           
    
    useEffect(()=>{

         
         getAllSalaryCal()
        searchItem()
       
        
     },[])

     function getAllSalaryCal(){
        axios.get("http://localhost:8000/Salary/getsalary").then((res)=>{
         setSalary(res.data)
         
        })
  }
      
     function Updatealary(){
        cla()
        const AddMonthSalry  = {
            EmployeeName,EmployeeID,PayamentpayDay,Expense,OTHours,MOnthSalary,Taxs
        }

        axios.post(`http://localhost:8000/Salary/update/${EmployeeID}`,AddMonthSalry).then((res)=>{
            getAllSalaryCal()
           

        }).catch((err)=>{
             console.log(err)
        })

     }
    
     const searchItem = () => {
        if (EmployeeID === null || EmployeeID === undefined || EmployeeID === "") {
            myalter.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'warning',
                title: 'Please insert the item id',
            });
        } else {
            axios.get(`http://localhost:8000/Salary/ser/${EmployeeID}`).then((response) => {
                let searchedItem = [];
                searchedItem.push(response.data)
                //console.log(response.data)
                setsearch(searchedItem);
               // setSalary(searchedItem)
            })
        }
    };
   
     function DeleteSlary(salarys){
        
        myalter.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/Salary/delete/${salarys}`).then((response) => {
                    console.log(response)
                    getAllSalaryCal()
                    if (response.data.result.response) {
                        myalter.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        
                       
                    } else {
                        Sweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                       
                    }
                })

            }
        })
        /* axios.delete(`http://localhost:8000/Salary/delete/${salarys}`).then((res)=>{

         alert(res.data)
        
     }).catch((err)=>{
          console.log(err)
     })*/
     }
     var monet
     {
        serch.map((d)=>(
            EmployeeName =d.EmployeeName,
            
            ID= d.EmployeeID,
           expn = d.Expense,
           monet = d.MOnthSalary,
           //setMOnthSalary(monet)
           MOnthSalary=monet,
           Taxs = d.Taxs
        ))
    }

    return (
        <div className="main_container">
            <div className="item fw-bold">
                <h5 className="pageName">Salary Management</h5>
            </div>
            <div className="item">
                <div className="row mt-5 ps-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                           <a href="/admin/salarysd"> <button id="btn-generate-report" className="btn me-3">Generate Report
                            </button></a>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <input id="searchID" type="text" className="form-control col-8 me-5"
                                               placeholder=" Emplooye ID " onChange={(e)=>{
                                                seEmployeeID(e.target.value)
                                               }}/>
                                    </div>
                                    <div>
                                        <input type="button" className="form-control btnSearch text-white"
                                               value="Search" onClick={()=>{
                                                searchItem()
                                               } } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 px-3">
                    <form id="itemForm">
                    <div className="row mt-4">
                            <div className="col">
                      
                                <input type="text" className="form-control" placeholder="Employee Name" value={EmployeeName} onChange={(e)=>{
                                    setEmployeeName(e.target.value)
                                }}  />
                                
                                <small id="item_name"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Employee ID" on value={ID} onChange={(e)=>{
                                    seEmployeeID(e.target.value)
                                }}/>
                                <small id="item_rate"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Employee Designation" />
                                <small id="item_name"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Payament per Day" onChange={(e)=>{
                                         setPayamentpayDay(e.target.value)

                                }}/>
                                <small id="item_rate"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="OTHours" onChange={(e)=>{
                                    setOTHours(e.target.value)
                                }}/>
                                <input class="form-check-input" type="checkbox" value="yes" onChange={(e)=>{
                                    setyes(e.target.value)
                                }} id="invalidCheck2" required></input>
                                <label class="form-check-label" for="invalidCheck2">
        Employee works Holiday ,yes
      </label>
                                <small id="reduceAmountForWater"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            <div className="col">
                                <input type="email" className="form-control" placeholder="Expense" onChange={(e)=>{
                                     setExpense(e.target.value)
                                }}/>
                                <small id="reduceAmountForBags"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                            
      
    
                                <input type="text" className="form-control" placeholder="Number days works"  onChange={(e)=>{
                                   setdays(e.target.value)
                                }}/>
                                <small id="reduceAmountForWater"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                           
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                            
      
    
                                <input type="text" className="form-control" placeholder="MOnthSalary" value={MOnthSalary} onChange={(e)=>{
                                    setMOnthSalary(e.target.value)
                                }}/>
                                <small id="reduceAmountForWater"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            <div className="col">
                                <input type="email" className="form-control" placeholder="Employee Taxs" value={Taxs} onChange={(e)=>{
                                    setTaxs(e.target.value)
                                }}/>
                                <small id="reduceAmountForBags"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                        </div>
                       
                        <div className="row mt-4">
                        <h1><h5>Holiday works pay</h5>Rs.{otpoya}</h1>
                        <h1><h5>month pay OT </h5>Rs.{otmonth}</h1>
                        <h1><h5>month pay roll Tax</h5>Rs.{Taxs}</h1>
                        <h1><h5>Total Payment</h5>Rs.{MOnthSalary}</h1>
                        </div>
                        
                        
                        <div className="row mt-5">
                            <div className="d-flex justify-content-around align-items-center">
                                <button type="button" className="btn btnAdd" onClick={CalculateSalary}>Add</button>
                                <button type="button" className="btn btnUpdate" onClick={Updatealary}>Update</button>
                                <button type="button" className="btn btnDelete" onClick={()=>{
                                    DeleteSlary()
                                }}>Delete</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="item">
                <div className="row">
                    <h6 className="mb-0 fw-bold mt-2 mb-2">Recent Assign Lab For Patient</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="table-responsive">
                        <table className="table table-striped custom-table" id="assignLabsTable">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">OT</th>
                                <th scope="col">Expeness</th>
                                <th scope="col">Tax</th>
                                <th scope="col">Salarys</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    Salary.map((salarys)=>(
                                        <tr>
                                    <td>{salarys._id}</td>
                                    <td>{salarys.EmployeeName}</td>
                                    <td>{salarys.OTHours}</td>
                                    <td>{salarys.Expense}</td>
                                    <td>{salarys.Taxs}</td>
                                    <td>{salarys.MOnthSalary}</td>
                                    
                                    <td>
    <button className="btn btn-default" onClick={() => {
        editFertilizeItem(item)
    }}>
        <i style={{"cursor": "pointer", "color": "#004000"}}
           className="fa-solid fa-pen me-3  d-inline"/>
    </button>
    <button className="btn btn-default" onClick={()=>{
        DeleteSlary(salarys._id)
    }}>
        <i style={{"cursor": "pointer"}}
           className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
    </button>
</td>
                                    

                                </tr>
                                    ))
                                }
                               
                            </tbody>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalryMangement;