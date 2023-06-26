import React, {useEffect, useState} from 'react';
import './../../../styles/itemManagement.css';
import Axios from "axios";
import SSTGValidation from "../../../validations/SSTGvalidation";
import Sweetalert2 from "sweetalert2";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";

function SSSTGManagement(props) {
    const [sstgDetails, setSSTGDetails] = useState([]);
    const [errors, setErrors] = useState("");
    const [sstgID, setSSTGID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [NIC, setNIC] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [area, setArea] = useState("");
    const [dob, setDOB] = useState("");

    useEffect(() => {
        getAllsstgDetails();
        document.getElementById("btnUpdate").setAttribute("disabled", "true");
        document.getElementById("btnDelete").setAttribute("disabled", "true");
    }, [])

    const getAllsstgDetails = () => {
        Axios.get("http://localhost:8000/sstg/getAll").then((response) => {
            setSSTGDetails(response.data.data)
        })
    }
    const displaySSTGallData = () => {
        return sstgDetails.map((sstg) => {
            return (<tr itemScope="row" id={sstg._id} key={sstg._id}>
                <td>
                    {sstg.sstgID}
                </td>
                <td>
                    {sstg.firstName}
                </td>
                <td> {sstg.lastName}</td>
                <td>{sstg.NIC}</td>

                <td>  {sstg.gender}</td>
                <td>  {sstg.email}</td>
                <td>  {sstg.mobile}</td>
                <td> {sstg.address}</td>
                <td>  {sstg.area}</td>
                <td> {sstg.dob}</td>
                <td>
                    <button className="btn btn-default" onClick={() => {
                        editSSTG(sstg)
                    }}>
                        <i style={{"cursor": "pointer", "color": "#004000"}}
                           className="fa-solid fa-pen me-3  d-inline"/>
                    </button>
                    <button className="btn btn-default" onClick={() => {deleteSSTG(sstg)}} >
                        <i style={{"cursor": "pointer"}}
                           className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                    </button>
                </td>
            </tr>)
        })
    }

    const addSSTG = () => {
        const newSSTG = {
            "sstgID": sstgID,
            "firstName": firstName,
            "lastName": lastName,
            "NIC": NIC,
            "gender": gender,
            "email": email,
            "mobile": mobile,
            "address": address,
            "area": area,
            "dob": dob
        }

        const {errors, isInvalid} = SSTGValidation(newSSTG);

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
            Axios.post("http://localhost:8000/sstg/add", newSSTG).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setSSTGID("");
                    setFirstName("");
                    setLastName("");
                    setNIC("");
                    setGender("");
                    setEmail("");
                    setMobile("");
                    setAddress("");
                    setArea("");
                    setDOB("");
                    getAllsstgDetails();
                }
            })

        }
    }

    const editSSTG = (sstg) => {
        console.log(sstg)
        setSSTGID(sstg.sstgID);
        setFirstName(sstg.firstName);
        setLastName(sstg.lastName);
        setNIC(sstg.NIC);
        setGender(sstg.gender);
        setEmail(sstg.email);
        setMobile(sstg.mobile);
        setAddress(sstg.address);
        setArea(sstg.area);
        setDOB(sstg.dob);

        document.getElementById("btnUpdate").removeAttribute("disabled");
        document.getElementById("btnDelete").removeAttribute("disabled");
    }

    const updateSSTG = () => {
        const newSSTG = {
            "sstgID": sstgID,
            "firstName": firstName,
            "lastName": lastName,
            "NIC": NIC,
            "gender": gender,
            "email": email,
            "mobile": mobile,
            "address": address,
            "area": area,
            "dob": dob
        }

        const {errors, isInvalid} = SSTGValidation(newSSTG);

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
            Axios.put("http://localhost:8000/sstg/", newSSTG).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setSSTGID("");
                    setFirstName("");
                    setLastName("");
                    setNIC("");
                    setGender("");
                    setEmail("");
                    setMobile("");
                    setAddress("");
                    setArea("");
                    setDOB("");
                    getAllsstgDetails();
                }
            })

        }
    }

    const deleteSSTG = (sstg) => {
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
                Axios.delete(`http://localhost:8000/sstg/${sstg._id}`).then((response) => {
                    console.log(response)
                    if (response.data.result.response) {
                        Sweetalert2.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllsstgDetails();
                    } else {
                        Sweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                        getAllsstgDetails();
                    }
                })

            }
        })

    }

    const searchSSTG = () => {
        if (sstgID === null || sstgID === undefined || sstgID === "") {
            Sweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'warning',
                title: 'Please insert the item id',
            });
        } else {
            Axios.get(`http://localhost:8000/sstg/${sstgID}`).then((response) => {
                let searchedSSTG = [];
                searchedSSTG.push(response.data.result.data)
                setSSTGDetails(searchedSSTG);
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

        const head = [['SSTG ID', 'First Name', 'Last Name',
            'NIC', 'Gender', 'Email' ,'Mobile', 'Address', 'Area' , 'DOB']];
        const elements = sstgDetails.map(sstg => [sstg.sstgID, sstg.firstName, sstg.lastName,
            sstg.NIC, sstg.gender, sstg.email,sstg.mobile, sstg.address, sstg.area,sstg.dob]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("sstg-details.pdf");
    }

    return (
        <AdminLayout class="wrapper">
            <div className="main_container">
                <div className="item fw-bold">
                    <h5 className="pageName">Small Scale Tea Growers Management</h5>
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
                                                   placeholder=" Small Scale Tea Grower's ID" value={sstgID} onChange={(e) => {
                                                setSSTGID(e.target.value)
                                            }}/>
                                        </div>
                                        <div>
                                            <input type="button" className="form-control btnSearch text-white"
                                                   value="Search" onClick={() => {
                                                searchSSTG()
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
                                        setFirstName(e.target.value)
                                    }}
                                           value={firstName}/>
                                    <small id="firstName"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Last Name"
                                           onChange={(e) => {
                                               setLastName(e.target.value)
                                           }}
                                           value={lastName}/>
                                    <small id="lastName"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="NIC"
                                           onChange={(e) => {
                                               setNIC(e.target.value)
                                           }}
                                           value={NIC}/>
                                    <small id="NIC"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>

                                <div className="col">
                                    <select name="Gender" className="form-select" value={gender}
                                            aria-label="role" onChange={(e) => {
                                        setGender(e.target.value)
                                    }} >
                                        <option selected>Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <small id="gender"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>

                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Email"
                                           onChange={(e) => {
                                               setEmail(e.target.value)
                                           }}
                                           value={email}/>
                                    <small id="email"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Mobile"
                                           onChange={(e) => {
                                               setMobile(e.target.value)
                                           }}
                                           value={mobile}/>
                                    <small id="mobile"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                <textarea className="form-control" placeholder="Address"
                                          onChange={(e) => {
                                              setAddress(e.target.value)
                                          }}
                                          value={address}/>
                                    <small id="address"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Area"
                                           onChange={(e) => {
                                               setArea(e.target.value)
                                           }}
                                           value={area}/>
                                    <small id="area"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                                <div className="col">
                                    <input type="date" className="form-control" placeholder="Date of Birth"
                                           onChange={(e) => {
                                               setDOB(e.target.value)
                                           }}
                                           value={dob}/>
                                    <small id="dob"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                            </div>

                            {/*crud function's button */}
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="button" className="btn btnAdd" id="btnAdd" onClick={() => addSSTG()}>Register
                                    </button>
                                    <button type="button" className="btn btnUpdate" id="btnUpdate" onClick={() => updateSSTG()} >Update
                                    </button>
                                    <button type="button" className="btn btnDelete" id="btnDelete" onClick={() => deleteSSTG()} >Delete
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
                                    <th scope="col">Fist Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">NIC</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Area</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {displaySSTGallData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default SSSTGManagement;


