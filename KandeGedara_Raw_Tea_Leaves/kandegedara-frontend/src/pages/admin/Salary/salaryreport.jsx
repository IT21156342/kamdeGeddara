import React,{useState,useEffect} from "react";
import axios from 'axios';
import {jsPDF} from "jspdf"
import autoTable from "jspdf-autotable";
import myalter from "sweetalert2"
function Salaryreprte(){

    const [Salary,setSalary]=useState([])
    const [name,setname]=useState()
    const [titale,settitale] = useState()
    const [EmployeeID,seEmployeeID] =useState("")
    var Ename
var Eid 
var tax
var Expense
var totaleSalary
    useEffect(()=>{

        getAllSalaryCal()

    },[])

    function getAllSalaryCal(){
        axios.get("http://localhost:8000/Salary/getsalary").then((res)=>{
         setSalary(res.data)
         
        })
  }

  const serch = ()=>{

    axios.get(`http://localhost:8000/Salary/ser/${EmployeeID}`).then((response) => {
        let searchedItem = [];
        searchedItem.push(response.data)
        //console.log(response.data)
        //setsearch(searchedItem);
       setSalary(searchedItem)
    })
  }
  {
    Salary.map((salarys)=>(
        Ename = salarys.EmployeeName,
        Eid = salarys.EmployeeID,
        totaleSalary =salarys.MOnthSalary,
        Expense =salarys.Expense,
        tax =salarys.Taxs
    ))
  }

  function report(){

    const doc = new jsPDF('p', 'pt', 'a4');

    autoTable(doc,{

        body:[
            [
              {
               
                content : 'kadegedara tea leave'
                +'\n52/8,kadegedarea'+'\n011253856',
                styles : {
                  halign : 'center',
                  fontSize : 21,
                  textColor : '#ffff',
              }
              
            }
            ]
          ],
          theme : 'plain',
          styles :{
               fillColor : '#FFFFFF'
          }

    })

    autoTable(doc,{
        body : [
          [
            {
              content : titale,
              styles : {
                halign : 'center',
                fontSize : 18,
                textColor : '#FFFFFF'
              }
              
            },
           
            
          ]
        ],
        theme : 'plain',
        styles :{
             fillColor : '#3366ff'
        },
        
      });
      autoTable(doc,{
        body : [
          [
            {
              content : 'Employeea Name : '+Ename ,
              styles : {
                halign : 'left',
               
              }
              
            },
            {
              content : 'Employee ID  : '+Eid  ,
              
              styles : {
                halign : 'center',
               
              }
              
            },
            
            
            
          ]
        ],
        theme : 'plain'
      });
      autoTable(doc,{

        body :[

        ]
      })
      autoTable(doc,{

        body :[
            
        ]
      })
      autoTable(doc,{

        body :[
            {
                const : '\n\n\n'
            }
        ]
      })
      autoTable(doc, { html: '#assignLabsTable',theme :'striped',headStyles :{
        fillColor :'#9fff80'
       } })

       autoTable(doc,{

        body :[
            [
                {
                    content : 'Tax         :  '+tax
                    +'\nExpenses      :  '+Expense  
                   ,
              
              styles : {
                halign : 'right',
                fontSize : 15,
                textColor : '#0d0d0d'
               
              }
                },
                
              
            ]
            
        ],  theme : 'plain'
      })
      autoTable(doc,{

        body :[
            [
                {
                    content : 'Totale salary '+totaleSalary  ,
              
              styles : {
                halign : 'right',
                fontSize : 20,
                textColor : '#0d0d0d'
              }
                }
            ]
        ],
        theme : 'plain'
      })

      if(name == null){
        myalter.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'warning',
            title: 'Please Enter document name',
        });
    }else{
        
        myalter.fire({
            title: 'Are you sure?',
            text: "You won't be able to Download this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Download it!'
        }).then((result)=>{

            if(result.isConfirmed){
                doc.save(name+".pdf");
                myalter.fire(
                    'Download ',
                    'Your file has been Download.',
                    'success'
                )
            }
        })
    }
  }

  function fullreport(){
    const doc = new jsPDF('p', 'pt', 'a4');
    autoTable(doc,{

        body:[
            [
              {
               
                content : 'kadegedara tea leave'
                +'\n52/8,kadegedarea'+'\n011253856',
                styles : {
                  halign : 'center',
                  fontSize : 21,
                  textColor : '#0d0d0d',
              }
              
            }
            ]
          ],
          theme : 'plain',
          styles :{
               fillColor : '#FFFFFF'
          }

    })

    autoTable(doc, { html: '#assignLabsTable',theme :'striped',headStyles :{
        fillColor :'#9fff80'
       } })

    if(name == null){
        myalter.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'warning',
            title: 'Please Enter document name',
        });
    }else{
        
        myalter.fire({
            title: 'Are you sure?',
            text: "You won't be able to Download this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Download it!'
        }).then((result)=>{

            if(result.isConfirmed){
                doc.save(name+".pdf");
                myalter.fire(
                    'Download ',
                    'Your file has been Download.',
                    'success'
                )
            }
        })
    }
    
  }
    return(
        <div className="main_container">
        <div className="item fw-bold">
            <h5 className="pageName">Salary Management (Report Generat)</h5>
        </div>
        <div className="item">
            <div className="row mt-5 ps-3">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                       <button id="btn-generate-report" className="btn me-3" onClick={()=>{
                        report()
                       }}>Generate Report
                        </button>
                    </div>
                    
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="row">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <input id="searchID" type="text" className="form-control col-8 me-5"
                                           placeholder=" Emplooye ID " 
                                           onChange={(e)=>{
                                            seEmployeeID(e.target.value)
                                           }}
                                           />
                                </div>
                                <div>
                                    <input type="button" className="form-control btnSearch text-white"
                                           value="Search" 
                                           onClick={()=>{
                                            serch()

                                           }}
                                           />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 px-3">
                    <form id="itemForm">
                    <div className="row mt-4">
                    <div className="col">
                      
                       <input type="text" className="form-control" placeholder="Save Name" onChange={
                        (e)=>{
                            setname(e.target.value)

                        }
                       }
                           
                         />
                        <small id="item_name"
                               className="d-block text-danger form-text invalid-feedback"></small>
                    </div>
                    <div className="col">
                                <input type="text" className="form-control" placeholder="Report Titale" on 
                                   onChange={(e)=>{
                                    settitale(e.target.value)

                                   }}
                                />
                                <small id="item_rate"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                    </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
            <div className="col-lg-6 col-md-12 col-sm-12">
                       <button id="btn-generate-report" className="btn me-3" onClick={()=>{
                        fullreport()
                       }}>Full employee Report
                        </button>
                    </div>
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
                                <th scope="col">Salarys</th>
                                <th scope="col">Employee Salary</th>
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
                                    <td>{salarys.MOnthSalary}</td>
                                    <td>{salarys.Taxs}</td>
                                  
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
    )

}

export default Salaryreprte