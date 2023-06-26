import React,{useState,useEffect} from "react";
import '../../../styles/itemManagement.css'
import Axios from "axios";
import SellingTeaLeavesValidation from "../../../validations/SellingTeaLeaves";
import Sweetalert2 from "sweetalert2";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";


function SellingTeaLeaves() {
    const [sellingTeaLeavesDetails, setSellingTeaLeavesDetails] = useState([]);
    const [errors, setErrors] = useState("");
    const [ID, setID] = useState("");
    const [itemName, setItemName] = useState("");
    const [salesRef, setSalesRef] = useState("");
    const [vehicleID, setVehicleID] = useState("");
    const [foctoryName, setFoctoryName] = useState("");
    const [foctoryAddress, setFoctoryAddress] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [leavesWeight, SetLeavesWeight] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        getAllSellingTeaLeavesDetails();
        document.getElementById("btnUpdate").setAttribute("disabled", "true");
        document.getElementById("btnDelete").setAttribute("disabled", "true");
    }, [])

    const getAllSellingTeaLeavesDetails = () => {
        Axios.get('http://localhost:8000/sellingTeaLeaves/').then((response) => {
            setSellingTeaLeavesDetails(response.data.data)
        })
    }
    const displaysellingTeaLeavesDetails = () => {
        return sellingTeaLeavesDetails.map((sellingTeaLeaves) => {
            return (<tr itemScope="row" id={sellingTeaLeaves._id} key={sellingTeaLeaves._id}>
                <td>
                    {sellingTeaLeaves.ID}
                </td>
                <td>
                    {sellingTeaLeaves.itemName}
                </td>
                <td> {sellingTeaLeaves.salesRef}</td>
                <td>{sellingTeaLeaves.vehicleID}</td>

                <td>  {sellingTeaLeaves.foctoryName}</td>
                <td>  {sellingTeaLeaves.foctoryAddress}</td>
                <td>  {sellingTeaLeaves.buyerName}</td>
                <td> {sellingTeaLeaves.leavesWeight}</td>
                <td>  {sellingTeaLeaves.price}</td>
                <td> {sellingTeaLeaves.date}</td>
                <td>
                    <button className="btn btn-default" onClick={() => {
                        editSellingTeaLeaves(sellingTeaLeaves)
                    }}>
                        <i style={{"cursor": "pointer", "color": "#004000"}}
                           className="fa-solid fa-pen me-3  d-inline"/>
                    </button>
                    <button className="btn btn-default" onClick={() => {deleteSellingTeaLeaves(sellingTeaLeaves)}} >
                        <i style={{"cursor": "pointer"}}
                           className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                    </button>
                </td>
            </tr>)
        })
    }

    const addSellingTeaLeaves = () => {
        const newSellingTeaLeaves = {
            "ID": ID,
            "itemName": itemName,
            "salesRef": salesRef,
            "vehicleID": vehicleID,
            "foctoryName": foctoryName,
            "foctoryAddress": foctoryAddress,
            "buyerName": buyerName,
            "leavesWeight": leavesWeight,
            "price": price,
            "date": date
        }

        const {errors, isInvalid} = SellingTeaLeavesValidation(newSellingTeaLeaves);

        if (isInvalid) {
            setErrors(errors)
            Sweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'error',
                title: 'Please enter your details',
            });
        } else {
            setErrors(errors)
            Axios.post("http://localhost:8000/sellingTeaLeaves/", newSellingTeaLeaves).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setID("");
                    setItemName("");
                    setSalesRef("");
                    setVehicleID("");
                    setFoctoryName("");
                    setFoctoryAddress("");
                    setBuyerName("");
                    SetLeavesWeight("");
                    setPrice("");
                    setDate("");
                    getAllSellingTeaLeavesDetails();
                }
            })

        }
    }

    const editSellingTeaLeaves = (sellingTeaLeaves) => {
        console.log(sellingTeaLeaves)
        setID(sellingTeaLeaves.ID);
        setItemName(sellingTeaLeaves.itemName);
        setSalesRef(sellingTeaLeaves.salesRef);
        setVehicleID(sellingTeaLeaves.vehicleID);
        setFoctoryName(sellingTeaLeaves.foctoryName);
        setFoctoryAddress(sellingTeaLeaves.foctoryAddress);
        setBuyerName(sellingTeaLeaves.buyerName);
        SetLeavesWeight(sellingTeaLeaves.leavesWeight);
        setPrice(sellingTeaLeaves.price);
        setDate(sellingTeaLeaves.date);

        document.getElementById("btnUpdate").removeAttribute("disabled");
        document.getElementById("btnDelete").removeAttribute("disabled");
    }

    const updateSellingTeaLeaves = () => {
        const newSellingTeaLeaves = {
            "ID": ID,
            "itemName": itemName,
            "salesRef": salesRef,
            "vehicleID": vehicleID,
            "foctoryName": foctoryName,
            "foctoryAddress": foctoryAddress,
            "buyerName": buyerName,
            "leavesWeight": leavesWeight,
            "price": price,
            "date": date
        }

        const {errors, isInvalid} = SellingTeaLeavesValidation(newSellingTeaLeaves);

        if (isInvalid) {
            setErrors(errors)
            Sweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'error',
                title: 'Please enter your details',
            });
        } else {
            setErrors(errors)
            Axios.put("http://localhost:8000/sellingTeaLeaves/", newSellingTeaLeaves).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setID("");
                    setItemName("");
                    setSalesRef("");
                    setVehicleID("");
                    setFoctoryName("");
                    setFoctoryAddress("");
                    setBuyerName("");
                    SetLeavesWeight("");
                    setPrice("");
                    setDate("");
                    getAllSellingTeaLeavesDetails();
                }
            })

        }
    }

    const deleteSellingTeaLeaves = (sellingTeaLeaves) => {
        Sweetalert2.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:8000/sellingTeaLeaves/${sellingTeaLeaves._id}`).then((response) => {
                    console.log(response)
                    if (response.data.result.response) {
                        Sweetalert2.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllSellingTeaLeavesDetails();
                    } else {
                        Sweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                        getAllSellingTeaLeavesDetails();
                    }
                })

            }
        })

    }

    const searchSellingTeaLeaves = () => {
        if (ID === null || ID === undefined || ID === "") {
            Sweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'warning',
                title: 'Please insert the item id',
            });
        } else {
            Axios.get(`http://localhost:8000/sellingTeaLeaves/${ID}`).then((response) => {
                let searchedSellingTeaLeaves = [];
                searchedSellingTeaLeaves.push(response.data.result.data)
                setSellingTeaLeavesDetails(searchedSellingTeaLeaves);
            })
        }
    };

    const generatePDF = () => {
        const specialElementHandlers = {
            '.no-export': function (element, renderer) {
                return true;
            }
        };
        const doc = new jsPDF('p', 'pt', 'a4');

        doc.text(305, 20, 'Sold Tea Leaves Details', 'center');

        const head = [[, 'Item Name', 'Sales Ref Name',
            'Vehicle ID', 'Factory Name', 'Factory Address' ,'Buyer Name', 'Leaves Weight', 'Price' , 'Date']];
        const elements = sellingTeaLeavesDetails.map(sellingTeaLeaves => [sellingTeaLeaves.itemName, sellingTeaLeaves.salesRef,
            sellingTeaLeaves.vehicleID, sellingTeaLeaves.foctoryName, sellingTeaLeaves.foctoryAddress,sellingTeaLeaves.buyerName, sellingTeaLeaves.leavesWeight, sellingTeaLeaves.price,sellingTeaLeaves.date]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("sellingTeaLeaves-details.pdf");
    }

    return (
        <div className="main_container">
            <div className="item fw-bold">
                <h5 className="pageName">Selling Tea Leaves</h5>
            </div>
            <div className="item">
                <div className="row mt-5 ps-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <button type="button" id="btn-generate-report" className="btn me-3" onClick={() => {
                                generatePDF()
                            }}>Generate Report
                            </button>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <input id="searchID" type="text" className="form-control col-8 me-5"
                                               placeholder="Sold Tea Stock ID" value={ID} onChange={(event) => {
                                            setID(event.target.value)
                                        }}/>
                                    </div>
                                    <div>
                                        <input type="button" className="form-control btnSearch text-white"
                                               value="Search" onClick={() => {
                                            searchSellingTeaLeaves()
                                        }}/>
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
                            <select name="ItemName" className="form-select"value={itemName}
                                        aria-label="role" onChange={(e) => {
                                    setItemName(e.target.value)
                                }} >
                                    <option selected>Item Name</option>
                                    <option value="Bio Tea">Bio Tea</option>
                                    <option value="Black Tea">Black Tea</option>
                                    <option value="Green Tea">Green Tea</option>
                                </select>

                                <small id="itemName"
                                       className="d-block text-danger form-text invalid-feedback">{errors.itemName}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Sales Ref Name" value = {salesRef} onChange={(e)=> {
                                    setSalesRef(e.target.value)
                                }}/>
                                <small id="salesRef"
                                       className="d-block text-danger form-text invalid-feedback">{errors.salesRef}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Vehicle ID" value={vehicleID} onChange={(e)=>{
                                    setVehicleID(e.target.value)
                                }} />
                                <small id="vehicleID"
                                       className="d-block text-danger form-text invalid-feedback">{errors.vehicleID}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Factory Name" value={foctoryName} onChange={(e) => {setFoctoryName(e.target.value)}}/>
                                <small id="foctoryName"
                                       className="d-block text-danger form-text invalid-feedback">{errors.foctoryName}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <textarea className="form-control" placeholder="Factory Address" value={foctoryAddress}  onChange={(e) =>{setFoctoryAddress(e.target.value)}}/>
                                <small id="foctoryAddress"
                                       className="d-block text-danger form-text invalid-feedback">{errors.foctoryAddress}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder=" Buyer Name" value={buyerName} onChange={(e) =>{setBuyerName(e.target.value)}}/>
                                <small id="buyerName"
                                       className="d-block text-danger form-text invalid-feedback">{errors.buyerName}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder=" Leaves Weight" value={leavesWeight} onChange={(e) => {SetLeavesWeight(e.target.value)}}/>
                                <small id="leavesWeight"
                                       className="d-block text-danger form-text invalid-feedback">{errors.leavesWeight}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder=" Price (Rs.)" value={price} onChange={(e) =>{setPrice(e.target.value)}}/>
                                <small id="price"
                                       className="d-block text-danger form-text invalid-feedback">{errors.price}</small>
                            </div>
                            <div className="col">
                                    <input type = "date" name="date"
                                           className="form-control "
                                           placeholder="Date"
                                            id="date" value={date} onChange={(e)=>{setDate(e.target.value)}} />
                                    <small id="date"
                                           className="d-block text-danger form-text invalid-feedback">{errors.date}</small>
                                </div>
                        </div>

                        <div className="row mt-5">
                            <div className="d-flex justify-content-around align-items-center">
                                <button type="button" className="btn btnAdd" onClick={() => addSellingTeaLeaves()}>Add</button>
                                <button id="btnUpdate" type="button" className="btn btnUpdate" onClick={()=> updateSellingTeaLeaves()}>Update</button>
                                <button id="btnDelete" type="button" className="btn btnDelete" onClick={() =>deleteSellingTeaLeaves()}>Delete</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row mt-5 px-3">
                    <div className="col-6">
                        <h5 className="mb-0 fw-bold mt-2">All Slod Tea Leaves in the system</h5>
                        <h6>These are the sold tea leaves stock in the systems.</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped custom-table" id="assignItemTable">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Sales Ref Name</th>
                                <th scope="col">Factory Name</th>
                                <th scope="col">Factory Address</th>
                                <th scope="col">Buyer Name</th>
                                <th scope="col">Leaves Weight</th>
                                <th scope="col">Price</th>
                                <th scope="col">Date</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                                {displaysellingTeaLeavesDetails()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

} 

export default SellingTeaLeaves;