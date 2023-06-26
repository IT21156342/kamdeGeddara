import React, {useEffect, useState} from 'react';
import './../../../styles/itemManagement.css';
import Axios from "axios";
import EmployeeRegValidation from "../../../validations/Employee/EmployeeRegValidation";
import Sweetalert2 from "sweetalert2";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";

function EmployeeReg(props) {
    const [empRegDetails, setEmpRegDetails] = useState([]);
    const [errors, setErrors] = useState("");
    const [empID, setEmpID] = useState("");
    const [empFName, setEmpFName] = useState("");
    const [empLName, setEmpLName] = useState("");
    const [empNIC, setEmpNIC] = useState("");
    const [empDOB, setEmpDOB] = useState("");
    const [empGender, setEmpGender] = useState("");
    const [empMobile, setEmpMobile] = useState("");
    const [empAddress, setEmpAddress] = useState("");



    useEffect(() => {
        getAllRegisteredEmp();
        document.getElementById("btnUpdate").setAttribute("disabled", "true");
        document.getElementById("btnDelete").setAttribute("disabled", "true");
    }, [])

    const getAllRegisteredEmp = () => {
        Axios.get("http://localhost:8000/empReg/").then((response) => {
            setEmpRegDetails(response.data.data)
        })
    }
    const displayEmpRegallData = () => {
        return empRegDetails.map((empReg) => {
            return (<tr itemScope="row" id={empReg._id} key={empReg._id}>
                <td>
                    {empReg.empID}
                </td>
                <td>
                    {empReg.empFName}
                </td>
                <td> {empReg.empLName}</td>
                <td>{empReg.empNIC}</td>

                <td>  {empReg.empDOB}</td>
                <td>  {empReg.empGender}</td>
                <td>  {empReg.empMobile}</td>
                <td> {empReg.empAddress}</td>

                <td className="d-flex justify-content-end align-items-end">
                    <button className="btn btn-default" onClick={() => {
                        editEmpReg(empReg)
                    }}>
                        <i style={{"cursor": "pointer", "color": "#004000"}}
                           className="fa-solid fa-pen me-3  d-inline"/>
                    </button>
                    <button className="btn btn-default" onClick={() => {deleteEmpReg(empReg)}} >
                        <i style={{"cursor": "pointer"}}
                           className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                    </button>
                </td>
            </tr>)
        })
    }

    const addEmpReg = () => {
        const newEmpReg = {
            "empID": empID,
            "empFName": empFName,
            "empLName": empLName,
            "empNIC": empNIC,
            "empDOB": empDOB,
            "empGender": empGender,
            "empMobile": empMobile,
            "empAddress": empAddress,
        }

        const {errors, isInvalid} = EmployeeRegValidation(newEmpReg);

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
            Axios.post("http://localhost:8000/empReg/", newEmpReg).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setEmpID("");
                    setEmpFName("");
                    setEmpLName("");
                    setEmpNIC("");
                    setEmpDOB("");
                    setEmpGender("");
                    setEmpMobile("");
                    setEmpAddress("");

                    getAllRegisteredEmp();
                }
            })

        }
    }


    const editEmpReg = (empReg) => {
        console.log(empReg)
        setEmpID(empReg.empID);
        setEmpFName(empReg.empFName);
        setEmpLName(empReg.empLName);
        setEmpNIC(empReg.empNIC);
        setEmpDOB(empReg.empDOB);
        setEmpGender(empReg.empGender);
        setEmpMobile(empReg.empMobile);
        setEmpAddress(empReg.empAddress);



        document.getElementById("btnUpdate").removeAttribute("disabled");
        document.getElementById("btnDelete").removeAttribute("disabled");
    }

    const updateEmpReg = () => {
        const newEmpReg = {
            "empID": empID,
            "empFName": empFName,
            "empLName": empLName,
            "empNIC": empNIC,
            "empDOB": empDOB,
            "empGender": empGender,
            "empMobile": empMobile,
            "empAddress": empAddress,


        }

        const {errors, isInvalid} = EmployeeRegValidation(newEmpReg);

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
            Axios.put("http://localhost:8000/empReg/", newEmpReg).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setEmpID("");
                    setEmpFName("");
                    setEmpLName("");
                    setEmpNIC("");
                    setEmpDOB("");
                    setEmpGender("");
                    setEmpMobile("");
                    setEmpAddress("");


                    getAllRegisteredEmp();
                }
            })

        }
    }

    const deleteEmpReg = (empReg) => {
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
                Axios.delete(`http://localhost:8000/empReg/${empReg._id}`).then((response) => {
                    console.log(response)
                    if (response.data.result.response) {
                        Sweetalert2.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllRegisteredEmp();
                    } else {
                        Sweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                        getAllRegisteredEmp();
                    }
                })

            }
        })

    }

    const searchEmpReg = () => {
        if (empID === null || empID === undefined || empID === "") {
            Sweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'warning',
                title: 'Please insert the item id',
            });
        } else {
            Axios.get(`http://localhost:8000/empReg/${empID}`).then((response) => {
                let searchedEmpReg = [];
                searchedEmpReg.push(response.data.result.data)
                setEmpRegDetails(searchedEmpReg);
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

        doc.text(305, 20, 'All registered Employee Details', 'center');

        const head = [[' ID', 'First Name', 'Last Name',
            'NIC', 'DOB', 'Gender' ,'Mobile', 'Address']];
        const elements = empRegDetails.map(empReg => [empReg.empID, empReg.empFName, empReg.empLName,
            empReg.empNIC, empReg.empDOB, empReg.empGender,empReg.empMobile, empReg.empAddress]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("emp-reg-details.pdf");
    }

    return (
        <div className="main_container">
            <div className="item fw-bold">
                <h5 className="pageName">Employee Registration Management</h5>
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
                                               placeholder=" Small Scale Tea Grower's ID" value={empID} onChange={(e) => {
                                            setEmpID(e.target.value)
                                        }}/>
                                    </div>
                                    <div>
                                        <input type="button" className="form-control btnSearch text-white"
                                               value="Search" onClick={() => {
                                            searchEmpReg()
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
                                <input type="text" className="form-control" placeholder="First Name" onChange={(e) => {
                                    setEmpFName(e.target.value)
                                }}
                                       value={empFName}/>
                                <small id="empFName"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empFName}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Last Name"
                                       onChange={(e) => {
                                           setEmpLName(e.target.value)
                                       }}
                                       value={empLName}/>
                                <small id="empLName"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empLName}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="NIC"
                                       onChange={(e) => {
                                           setEmpNIC(e.target.value)
                                       }}
                                       value={empNIC}/>
                                <small id="empNIC"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empNIC}</small>
                            </div>

                            <div className="col">
                                <input type ="date" name="empDOB" className="form-control" value={empDOB}
                                        onChange={(e) => {
                                    setEmpDOB(e.target.value)
                                }} >
                                </input>
                                <small id="empDOB"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empDOB}</small>
                            </div>

                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <select name="Gender" className="form-select" value={empGender}
                                        aria-label="role" onChange={(e) => {
                                    setEmpGender(e.target.value)
                                }} >
                                    <option selected>Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <small id="empGender"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empGender}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Mobile"
                                       onChange={(e) => {
                                           setEmpMobile(e.target.value)
                                       }}
                                       value={empMobile}/>
                                <small id="empMobile"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empMobile}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <textarea className="form-control" placeholder="Address"
                                          onChange={(e) => {
                                              setEmpAddress(e.target.value)
                                          }}
                                          value={empAddress}/>
                                <small id="empAddress"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empAddress}</small>
                            </div>
                        </div>
                        {/*crud function's button */}
                        <div className="row mt-5">
                            <div className="d-flex justify-content-around align-items-center">
                                <button type="button" className="btn btnAdd" id="btnAdd" onClick={() => addEmpReg()}>Register
                                </button>
                                <button type="button" className="btn btnUpdate" id="btnUpdate"  onClick={() =>updateEmpReg()} >Update
                                </button>
                                <button type="button" className="btn btnDelete" id="btnDelete" >Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row mt-5 px-3">
                    <div className="col-6">
                        <h5 className="mb-0 fw-bold mt-2">All Small Scale Tea Growers in the system</h5>
                        <h6>These are the all Small Scale Tea Growers in the systems.</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped custom-table" id="assignItemTable">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>

                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">NIC</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Address</th>

                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            {displayEmpRegallData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeReg;


