import React, {useEffect, useState} from 'react';
import './../../../styles/itemManagement.css';
import Axios from "axios";
import PurchaseTeaLeavesValidations from '../../../validations/PurchaseTeaLeaves.js'
import Sweetalert2 from "sweetalert2";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";

function PurchaseTeaLeaves(props) {
    const [purchaseTeaLeavesDetails, setPurchaseTeaLeavesDetails] = useState([]);
    const [errors, setErrors] = useState("");
    const [purchaseTeaLeavesID, setPurchaseTeaLeavesID] = useState("");
    const [itemName, setItemName] = useState("");
    const [SSTGID, setSSTGID] = useState("");
    const [SSTGName, setSSTGName] = useState("");
    const [date, setDate] = useState("");
    const [vehicalID, setVehicalID] = useState("");
    const [rate, setRate] = useState("");
    const [leavesWeight, setLeavesWeight] = useState("");
    const [reduceAmountForWater, setReduceAmountForWater] = useState("");
    const [reduceAmountForBag, setReduceAmountForBag] = useState("");
    const [reduceAmountForFertilized, setReduceAmountForFertilized] = useState("");


    useEffect(() => {
        getAllpurchaseTeaLeavesDetails();
        document.getElementById("btnUpdate").setAttribute("disabled", "true");
        document.getElementById("btnDelete").setAttribute("disabled", "true");
    }, [])

    const getAllpurchaseTeaLeavesDetails = () => {
        Axios.get("http://localhost:8000/purchaseTeaLeaves/getAll").then((response) => {
            setPurchaseTeaLeavesDetails(response.data.data)
        })
    }

    const calculateTotalAmount = (purchaseTeaLeaves) => {
        const netPrice = parseInt(purchaseTeaLeaves.rate) * parseInt(purchaseTeaLeaves.leavesWeight);
        const netExpense = parseInt(purchaseTeaLeaves.reduceAmountForWater) + parseInt(purchaseTeaLeaves.reduceAmountForBag) + parseInt(purchaseTeaLeaves.reduceAmountForFertilized);
        const totalAmount = netPrice - netExpense;
        return totalAmount;
    }

    const calculateNetPrice = (purchaseTeaLeaves) => {
        const netPrice = parseInt(purchaseTeaLeaves.rate) * parseInt(purchaseTeaLeaves.leavesWeight);
        return netPrice;
    }

    const calculateNetExpense = (purchaseTeaLeaves) => {
        const netExpense = parseInt(purchaseTeaLeaves.reduceAmountForWater) + parseInt(purchaseTeaLeaves.reduceAmountForBag) + parseInt(purchaseTeaLeaves.reduceAmountForFertilized);
        return netExpense;
    }
    const displayPurchaseAllData = () => {
        return purchaseTeaLeavesDetails.map((purchaseTeaLeaves) => {
            return (<tr itemScope="row" id={purchaseTeaLeaves._id} key={purchaseTeaLeaves._id}>
                <td>
                    {purchaseTeaLeaves.purchaseTeaLeavesID}
                </td>
                <td>
                    {purchaseTeaLeaves.itemName}
                </td>
                <td> {purchaseTeaLeaves.SSTGID}</td>
                <td>{purchaseTeaLeaves.SSTGName}</td>

                <td>  {purchaseTeaLeaves.date}</td>
                <td>  {purchaseTeaLeaves.vehicalID}</td>
                <td>  {purchaseTeaLeaves.rate}</td>
                <td> {purchaseTeaLeaves.leavesWeight}</td>
                <td>  {purchaseTeaLeaves.reduceAmountForWater}</td>
                <td> {purchaseTeaLeaves.reduceAmountForBag}</td>
                <td> {purchaseTeaLeaves.reduceAmountForFertilized}</td>
                <td> {calculateNetPrice(purchaseTeaLeaves)}</td>
                <td>{calculateNetExpense(purchaseTeaLeaves)}</td>
                <td> {calculateTotalAmount(purchaseTeaLeaves)}</td>
                <td>
                    <button className="btn btn-default" onClick={() => {
                        editPurchaseTeaLeaves(purchaseTeaLeaves)
                    }}>
                        <i style={{"cursor": "pointer", "color": "#004000"}}
                           className="fa-solid fa-pen me-3  d-inline"/>
                    </button>
                    <button className="btn btn-default" onClick={() => {
                        deletePurchaseTeaLeaves(purchaseTeaLeaves)
                    }}>
                        <i style={{"cursor": "pointer"}}
                           className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                    </button>
                </td>
            </tr>)
        })
    }

    const addPurchaseTeaLeaves = () => {
        const newPurchaseTeaLeaves = {
            "purchaseTeaLeavesID": purchaseTeaLeavesID,
            "itemName": itemName,
            "SSTGID": SSTGID,
            "SSTGName": SSTGName,
            "date": date,
            "vehicalID": vehicalID,
            "rate": rate,
            "leavesWeight": leavesWeight,
            "reduceAmountForWater": reduceAmountForWater,
            "reduceAmountForBag": reduceAmountForBag,
            "reduceAmountForFertilized": reduceAmountForFertilized,
        }

        const {errors, isInvalid} = PurchaseTeaLeavesValidations(newPurchaseTeaLeaves);

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
            Axios.post("http://localhost:8000/purchaseTeaLeaves/add", newPurchaseTeaLeaves).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setPurchaseTeaLeavesID("");
                    setItemName("");
                    setSSTGID("");
                    setSSTGName("");
                    setDate("");
                    setVehicalID("");
                    setRate("");
                    setLeavesWeight("");
                    setReduceAmountForWater("");
                    setReduceAmountForBag("");
                    setReduceAmountForFertilized()
                    getAllpurchaseTeaLeavesDetails();
                }
            })

        }
    }

    const editPurchaseTeaLeaves = (purchaseTeaLeaves) => {
        console.log(purchaseTeaLeaves)
        setPurchaseTeaLeavesID(purchaseTeaLeaves.purchaseTeaLeavesID);
        setItemName(purchaseTeaLeaves.itemName);
        setSSTGID(purchaseTeaLeaves.SSTGID);
        setSSTGName(purchaseTeaLeaves.SSTGName);
        setDate(purchaseTeaLeaves.date);
        setVehicalID(purchaseTeaLeaves.vehicalID);
        setRate(purchaseTeaLeaves.rate);
        setLeavesWeight(purchaseTeaLeaves.leavesWeight);
        setReduceAmountForWater(purchaseTeaLeaves.reduceAmountForBag);
        setReduceAmountForBag(purchaseTeaLeaves.reduceAmountForWater);
        setReduceAmountForFertilized(purchaseTeaLeaves.reduceAmountForFertilized);

        document.getElementById("btnUpdate").removeAttribute("disabled");
        document.getElementById("btnDelete").removeAttribute("disabled");
    }

    const updatePurchaseTeaLeaves = () => {
        const newPurchaseTeaLeaves = {
            "purchaseTeaLeavesID": purchaseTeaLeavesID,
            "itemName": itemName,
            "SSTGID": SSTGID,
            "SSTGName": SSTGName,
            "date": date,
            "vehicalID": vehicalID,
            "rate": rate,
            "leavesWeight": leavesWeight,
            "reduceAmountForWater": reduceAmountForWater,
            "reduceAmountForBag": reduceAmountForBag,
            "reduceAmountForFertilized": reduceAmountForFertilized,
        }

        const {errors, isInvalid} = PurchaseTeaLeavesValidations(newPurchaseTeaLeaves);

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
            Axios.put("http://localhost:8000/purchaseTeaLeaves/", newPurchaseTeaLeaves).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setPurchaseTeaLeavesID("");
                    setItemName("");
                    setSSTGID("");
                    setSSTGName("");
                    setDate("");
                    setVehicalID("");
                    setRate("");
                    setLeavesWeight("");
                    setReduceAmountForWater("");
                    setReduceAmountForBag("");
                    setReduceAmountForFertilized("");
                    getAllpurchaseTeaLeavesDetails();
                }
            })

        }
    }

    const deletePurchaseTeaLeaves = (purchaseTeaLeaves) => {
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
                Axios.delete(`http://localhost:8000/purchaseTeaLeaves/${purchaseTeaLeaves._id}`).then((response) => {
                    console.log(response)
                    if (response.data.result.response) {
                        Sweetalert2.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllpurchaseTeaLeavesDetails();
                    } else {
                        Sweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                        getAllpurchaseTeaLeavesDetails();
                    }
                })

            }
        })

    }

    const searchPurchaseTeaLeaves = () => {
        if (purchaseTeaLeavesID === null || purchaseTeaLeavesID === undefined || purchaseTeaLeavesID === "") {
            Sweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'warning',
                title: 'Please insert the item id',
            });
        } else {
            Axios.get(`http://localhost:8000/purchaseTeaLeaves/${purchaseTeaLeavesID}`).then((response) => {
                let searchPurchaseTeaLeaves = [];
                searchPurchaseTeaLeaves.push(response.data.result.data)
                setPurchaseTeaLeavesDetails(searchPurchaseTeaLeaves);
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

        doc.text(305, 20, 'Small Scale Tea Growers Details', 'center');

        const head = [['SSGT ID', 'SSGT Name', 'Date', 'Vehical ID', 'Rate', 'Leaves Weight', 'For Water', 'For Bag', 'For Fertilized']];

        const elements = purchaseTeaLeavesDetails.map(purchaseTeaLeaves => [purchaseTeaLeaves.SSTGID, purchaseTeaLeaves.SSTGName, purchaseTeaLeaves.date, purchaseTeaLeaves.vehicalID, purchaseTeaLeaves.rate, purchaseTeaLeaves.leavesWeight, purchaseTeaLeaves.reduceAmountForWater, purchaseTeaLeaves.reduceAmountForBag, purchaseTeaLeaves.reduceAmountForFertilized]);


        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("purchase-tea-leaves-details.pdf");
    }
// purchase form

    return (
        <div className="main_container">
            <div className="item fw-bold">
                <h5 className="pageName">Purchase Tea Leaves Management</h5>
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
                                               placeholder="Purchase Tea Leaves ID" value={purchaseTeaLeavesID}
                                               onChange={(e) => {
                                                   setPurchaseTeaLeavesID(e.target.value)
                                               }}/>
                                    </div>
                                    <div>
                                        <input type="button" className="form-control btnSearch text-white"
                                               value="Search" onClick={() => {
                                            searchPurchaseTeaLeaves()
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
                                <select name="ItemName" className="form-select" value={itemName}
                                        aria-label="role" onChange={(e) => {
                                    setItemName(e.target.value)
                                }}>
                                    <option selected>Item Name</option>
                                    <option value="Bio Tea">Bio Tea</option>
                                    <option value="Black Tea">Black Tea</option>
                                    <option value="Green Tea">Green Tea</option>
                                </select>
                                <small id="itemName"
                                       className="d-block text-danger form-text invalid-feedback">{errors.itemName}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="SSTG ID" value={SSTGID}
                                       onChange={(e) => {
                                           setSSTGID(e.target.value)
                                       }}/>
                                <small id="SSTGID"
                                       className="d-block text-danger form-text invalid-feedback">{errors.SSTGID}</small>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="SSTG Name" onChange={(e) => {
                                    setSSTGName(e.target.value)
                                }} value={SSTGName}/>
                                <small id="SSTGName"
                                       className="d-block text-danger form-text invalid-feedback">{errors.SSTGName}</small>
                            </div>


                            <div className="col">
                                <input type="date" className="form-control" placeholder="Date"
                                       onChange={(e) => {
                                           setDate(e.target.value)
                                       }} value={date}
                                       max={new Date().toISOString().split("T")[0]}
                                       min={new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0]}
                                />
                                <small id="date"
                                       className="d-block text-danger form-text invalid-feedback">{errors.date}</small>
                            </div>

                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Vehicle ID"
                                       onChange={(e) => {
                                           setVehicalID(e.target.value)
                                       }}
                                       value={vehicalID}/>
                                <small id="vehicalID"
                                       className="d-block text-danger form-text invalid-feedback">{errors.vehicalID}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Rate"
                                       onChange={(e) => {
                                           setRate(e.target.value)
                                       }}
                                       value={rate}/>
                                <small id="rate"
                                       className="d-block text-danger form-text invalid-feedback">{errors.rate}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Leaves Weight"
                                       onChange={(e) => {
                                           setLeavesWeight(e.target.value)
                                       }}
                                       value={leavesWeight}/>
                                <small id="leavesWeight"
                                       className="d-block text-danger form-text invalid-feedback">{errors.leavesWeight}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Reduce Amount For Water"
                                       onChange={(e) => {
                                           setReduceAmountForWater(e.target.value)
                                       }}
                                       value={reduceAmountForWater}/>
                                <small id="area"
                                       className="d-block text-danger form-text invalid-feedback">{errors.reduceAmountForWater}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Reduce Amount For Bag"
                                       onChange={(e) => {
                                           setReduceAmountForBag(e.target.value)
                                       }}
                                       value={reduceAmountForBag}/>
                                <small id="dob"
                                       className="d-block text-danger form-text invalid-feedback">{errors.reduceAmountForBag}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Reduce Amount For Fertilized"
                                       onChange={(e) => {
                                           setReduceAmountForFertilized(e.target.value)
                                       }}
                                       value={reduceAmountForFertilized}/>
                                <small id="area"
                                       className="d-block text-danger form-text invalid-feedback">{errors.reduceAmountForFertilized}</small>
                            </div>
                        </div>
                        {/*<div className="row mt-4">*/}
                        {/*    <div className="col">*/}
                        {/*        <input type="text" className="form-control" placeholder="Total Price For Tea Leaves"*/}
                        {/*               onChange={(e) => {*/}
                        {/*                   totalPriceForWeight();*/}
                        {/*               }}/>*/}
                        {/*        <small id="totalPriceForWeight"*/}
                        {/*               className="d-block text-danger form-text invalid-feedback"></small>*/}
                        {/*    </div>*/}
                        {/*    <div className="col">*/}
                        {/*        <input type="text" className="form-control" placeholder="Total Expenses"*/}
                        {/*               onChange={(e) => {*/}
                        {/*                   totalExpense();*/}
                        {/*               }}/>*/}
                        {/*        <small id="totalExpenses"*/}
                        {/*               className="d-block text-danger form-text invalid-feedback"></small>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="row mt-4">*/}
                        {/*    <div className="col-6">*/}
                        {/*        <input type="text" className="form-control" placeholder="Total Amount"*/}
                        {/*                onChange={(e) => {*/}
                        {/*                    totalAmount();*/}
                        {/*                }}/>*/}
                        {/*        <small id="totalAmount"*/}
                        {/*                className="d-block text-danger form-text invalid-feedback"></small>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*crud function's button */}
                        <div className="row mt-5">
                            <div className="d-flex justify-content-around align-items-center">
                                <button type="button" className="btn btnAdd" id="btnAdd"
                                        onClick={() => addPurchaseTeaLeaves()}>Register
                                </button>
                                <button type="button" className="btn btnUpdate" id="btnUpdate"
                                        onClick={() => updatePurchaseTeaLeaves()}>Update
                                </button>
                                <button type="button" className="btn btnDelete" id="btnDelete"
                                        onClick={() => deletePurchaseTeaLeaves()}>Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row mt-5 px-3">
                    <div className="col-6">
                        <h5 className="mb-0 fw-bold mt-2">All Tea Leaves Stock in the System</h5>
                        <h6>These are the all tea leaves stock in the systems</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped custom-table" id="assignItemTable">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Vehical ID</th>
                                <th scope="col">Rate</th>
                                <th scope="col">Leaves Weight</th>
                                <th scope="col">For Water</th>
                                <th scope="col">For Bag</th>
                                <th scope="col">For Fertilized</th>
                                <th scope="col">Net Amount</th>
                                <th scope="col">Net Expense</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            {displayPurchaseAllData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseTeaLeaves;


