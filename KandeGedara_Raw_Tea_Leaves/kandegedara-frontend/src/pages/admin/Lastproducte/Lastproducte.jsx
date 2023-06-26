import { useEffect, useState } from "react"
import axios from "axios"

function LastProduct(){

    const [ _id,setid] = useState()
    const [ Powedername,setPowedername] = useState()
    const [ PowederPrice,setPowederPrice] = useState()  
    const [ Qty,setQty] = useState()
    const [ customeName,setcustomeName] = useState()
    const [ CustomeAddress,setCustomeAddress] = useState()
    const [ CustmerEmail,setCustmerEmail] = useState()
    const [ CustomerContact,setCustomerContact] = useState()
    const [ Totale,setTotale] = useState()
    const [dis,setAlldata] = useState([])

    useEffect(()=>{

        getAllinvoice()

    },[])

    function getAllinvoice(){
        axios.get("http://localhost:8000/teaPowder/all").then((res)=>{

        setAlldata(res.data)
       
    }).catch((err)=>{
         console.log(err)
    })

    }
    function AddSall(){

        const teaToltale = Qty *PowederPrice
        setTotale(teaToltale)

        const data = {
            _id,Powedername,PowederPrice,Qty,customeName,CustomeAddress,CustmerEmail,CustomerContact,Totale
        }
        axios.post("http://localhost:8000/teaPowder/addBuyer",data).then((res)=>{

        getAllinvoice()
        
    }).catch((err)=>{
         console.log(err)
    })

    }
    function deletes(){
           
        axios.delete(`http://localhost:8000/teaPowder/delete/${_id}`).then((res)=>{

        getAllinvoice()
        
    }).catch((err)=>{
         console.log(err)
    })
        
    }

    function update(){
        const data = {
            _id,Powedername,PowederPrice,Qty,customeName,CustomeAddress,CustmerEmail,CustomerContact,Totale
        }
        axios.put(`http://localhost:8000/teaPowder/updates/${_id}`).then((res)=>{

        getAllinvoice()
        
    }).catch((err)=>{
         console.log(err)
    })
    }

    return(
        <div className="main_container">
            <div className="item fw-bold">
                <h5 className="pageName">Tea Producte</h5>
            </div>
            <div className="item">
                <div className="row mt-5 ps-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                           <button id="btn-generate-report" className="btn me-3">Generate Report
                            </button>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <input id="searchID" type="text" className="form-control col-8 me-5"
                                               placeholder=" Emplooye ID "/>
                                    </div>
                                    <div>
                                        <input type="button" className="form-control btnSearch text-white"
                                                />
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
                      
                               <input type="text" className="form-control" placeholder="Invoise Number"   onChange={(e)=>{
                                setid(e.target.value)
                               }}/>
                                <small id="item_name"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Customer Name" onChange={(e)=>{
                                 setcustomeName(e.target.value)
                               }}/>
                                <small id="item_rate"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Price" onChange={(e)=>{
                                setPowederPrice(e.target.value)
                               }} />
                                <small id="item_name"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Producte Name" onChange={(e)=>{
                                setPowedername(e.target.value)
                               }}/>
                                <small id="item_rate"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Adders Deliver" onChange={(e)=>{
                                setCustomeAddress(e.target.value)
                               }}/>
                                <small id="reduceAmountForWater"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            <div className="col">
                                <input type="email" className="form-control" placeholder="Customer Email"  onChange={(e)=>{
                                setCustmerEmail(e.target.value)
                               }}/>
                                <small id="reduceAmountForBags"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                            
      
    
                                <input type="text" className="form-control" placeholder="Contact" onChange={(e)=>{
                                 setCustomerContact(e.target.value)
                               }}/>
                                <small id="reduceAmountForWater"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            <div className="col">
                            
      
    
                                <input type="text" className="form-control" placeholder="Qty" onChange={(e)=>{
                                 setQty(e.target.value)
                               }}/>
                                <small id="reduceAmountForWater"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            
                           
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                            
      
    
                                <input type="text" className="form-control" placeholder="Totale" value={Totale} onChange={(e)=>{
                                    setTotale(e.target.value)
                                }}/>
                                <small id="reduceAmountForWater"
                                       className="d-block text-danger form-text invalid-feedback"></small>
                            </div>
                            
                        </div>

                       
                       
                       
                        
                        
                        <div className="row mt-5">
                            <div className="d-flex justify-content-around align-items-center">
                                <button type="button" className="btn btnAdd" onClick={AddSall}>Add</button>
                                <button type="button" className="btn btnUpdate" onClick={update} >Update</button>
                                <button type="button" className="btn btnDelete" onClick={deletes}>Delete</button>
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
                                <th scope="col">Custome Name</th>
                                <th scope="col">Custome Address</th>
                                <th scope="col">Custmer Email</th>
                                <th scope="col">Customer Contact</th>
                                <th scope="col">Buy Qtys</th>
                                <th scope="col">Poweder Price </th>
                                <th scope="col">Poweder Totale</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                
                               
                                {
                                    dis.map((datas)=>(
                                        <tr>
                                     <td>{datas._id}</td>
                                     <td>{datas.customeName}</td>
                                     <td>{datas.CustomeAddress}</td> 
                                     <td>{datas.CustmerEmail}</td>
                                    
                                     <td>{datas.CustomerContact}</td>
                                      <td> {datas.Qty} </td>
                                      <td> {datas.PowederPrice} </td>
                                      <td> {datas.Totale} </td>
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


export default LastProduct