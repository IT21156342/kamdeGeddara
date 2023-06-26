import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './../../../styles/itemManagement.css';
import Axios from "axios";
import Sweetalert2 from "sweetalert2";
import EmployeeAttendanceValidation from "../../../validations/Employee/EmployeeAttendanceValidation";

function EmployeeAttendance(props) {
    const [empAttendanceDetails, setempAttendanceDetails] = useState([]);
    const [ID, setID] = useState("");
    const [mongoID, setMongoID] = useState("");
    const [errors, setErrors] = useState("");
    const [empID, setEmpID] = useState("");
    const [empName, setEmpName] = useState("");
    const [leaveTime, setLeaveTime] = useState("");
    const [signedTime, setSignedTime] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllDailyAttendance();
        document.getElementById("btnUpdate").setAttribute("disabled", "true");
        document.getElementById("btnDelete").setAttribute("disabled", "true");
    }, [])

    const getAllDailyAttendance = () => {
        Axios.get("http://localhost:8000/empAttendance/").then((response) => {
            setempAttendanceDetails(response.data.data)
        })
    }
    const displayEmpAttendanceAllData = () => {
        return empAttendanceDetails.map((empAttendance) => {
            return (<tr itemScope="row" id={empAttendance._id} key={empAttendance._id}>
                <td>
                    {empAttendance.empID}
                </td>
                <td>  {empAttendance.date}</td>
                <td>
                    {empAttendance.empName}
                </td>
                <td>{empAttendance.signedTime}</td>
                <td> {empAttendance.leaveTime}</td>
                <td className="d-flex justify-content-end align-items-end">
                    <button className="btn btn-default" onClick={() => {
                        editEmpAttendance(empAttendance)
                    }}>
                        <i style={{"cursor": "pointer", "color": "#004000"}}
                           className="fa-solid fa-pen me-3  d-inline"/>
                    </button>
                    <button className="btn btn-default" onClick={() => {
                        deleteEmpAttendance(empAttendance)
                    }}>
                        <i style={{"cursor": "pointer"}}
                           className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                    </button>
                </td>
            </tr>)
        })
    }

    const addEmpAttendance = () => {
        const newEmpAttendance = {
            "ID": ID,
            "empID": empID,
            "empName": empName,
            "leaveTime": leaveTime,
            "signedTime": signedTime,
            "date": date,

        }

        const {errors, isInvalid} = EmployeeAttendanceValidation(newEmpAttendance);

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
            Axios.post("http://localhost:8000/empAttendance/", newEmpAttendance).then((response) => {
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
                    setEmpID("");
                    setEmpName("");
                    setLeaveTime("");
                    setSignedTime("");
                    setDate("");

                    getAllDailyAttendance();
                }
            })

        }
    }


    const editEmpAttendance = (empAttendance) => {
        console.log(empAttendance)
        setMongoID(empAttendance._id);
        setEmpID(empAttendance.empID);
        setEmpName(empAttendance.empName);
        setLeaveTime(empAttendance.leaveTime);
        setSignedTime(empAttendance.signedTime);
        setDate(empAttendance.date);
        document.getElementById("btnUpdate").removeAttribute("disabled");
        document.getElementById("btnDelete").removeAttribute("disabled");
    }

    const updateEmpAttendance = () => {
        const newEmpAttendance = {
            "ID": ID,
            "date": date,
            "empID": empID,
            "empName": empName,
            "leaveTime": leaveTime,
            "signedTime": signedTime,

        }

        const {errors, isInvalid} = EmployeeAttendanceValidation(newEmpAttendance);

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
            Axios.put(`http://localhost:8000/empAttendance/${mongoID}`, newEmpAttendance).then((response) => {
                console.log(response)
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
                    setDate("");
                    setEmpID("");
                    setEmpName("");
                    setLeaveTime("");
                    setSignedTime("");
                    getAllDailyAttendance();
                }
            })

        }
    }

    const deleteEmpAttendance = (empAttendance) => {
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
                Axios.delete(`http://localhost:8000/empAttendance/${empAttendance._id}`).then((response) => {
                    console.log(response)
                    if (response.data.result.response) {
                        Sweetalert2.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllDailyAttendance();
                    } else {
                        Sweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                        getAllDailyAttendance();
                    }
                })

            }
        })

    }

    const searchEmpAttendance = () => {
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
            Axios.get(`http://localhost:8000/empAttendance/${empID}`).then((response) => {
                let searchedEmpAttendance = [];
                searchedEmpAttendance.push(response.data.result.data)
                setempAttendanceDetails(searchedEmpAttendance);
            })
        }
    };

    const generatePDF = () => {

        navigate('generateReport'); // navigate to the next page
        // const specialElementHandlers = {
        //     '.no-export': function (element, renderer) {
        //         return true;
        //     }
        // };
        // const doc = new jsPDF('p', 'pt', 'a4');
        //
        // doc.text(305, 20, 'All registered Employee Details', 'center');
        //
        // const head = [[' ID', 'Employee Name', 'Leaving Time',
        //     'Signed Time']];
        // const elements = empAttendanceDetails.map(empAttendance => [empAttendance.empID, empAttendance.empName, empAttendance.leaveTime,
        //     empAttendance.signedTime]);
        //
        // autoTable(doc, {
        //     head: head,
        //     body: elements,
        // })
        // doc.save("emp-attendance-details.pdf");
    }

    return (
        <div className="main_container">
            <div className="item fw-bold">
                <h5 className="pageName">Employee Attendance Management</h5>
            </div>
            <div className="item">
                <div className="row mt-5 ps-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <button type="button" id="btn-generate-report" className="btn me-3"
                                    onClick={(e) => generatePDF()}>Generate Report
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 px-3">
                    <form id="itemForm">
                        <div className="row mt-4">
                            <div className="col">
                                <input type="date" className="form-control" placeholder="Date"
                                       onChange={(e) => {
                                           setDate(e.target.value)
                                       }}
                                       value={date}/>
                                <small id="date"
                                       className="d-block text-danger form-text invalid-feedback">{errors.date}</small>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Employee ID" onChange={(e) => {
                                    setEmpID(e.target.value)
                                }}
                                       value={empID}/>
                                <small id="empName"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empID}</small>
                            </div>

                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <input type="text" className="form-control" placeholder="Employee Name"
                                       onChange={(e) => {
                                           setEmpName(e.target.value)
                                       }}
                                       value={empName}/>
                                <small id="leaveTime"
                                       className="d-block text-danger form-text invalid-feedback">{errors.empName}</small>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="time" className="form-control" placeholder="Signed Time"
                                       onChange={(e) => {
                                           setSignedTime(e.target.value)
                                       }}
                                       value={signedTime}/>
                                <small id="signedTime"
                                       className="d-block text-danger form-text invalid-feedback">{errors.signedTime}</small>
                            </div>
                            <div className="col">
                                <input type="time" className="form-control" placeholder="Leaved Time"
                                       onChange={(e) => {
                                           setLeaveTime(e.target.value)
                                       }}
                                       value={leaveTime}/>
                                <small id="signedTime"
                                       className="d-block text-danger form-text invalid-feedback">{errors.leaveTime}</small>
                            </div>
                        </div>
                        {/*crud function's button */}
                        <div className="row mt-5">
                            <div className="d-flex justify-content-around align-items-center">
                                <button type="button" className="btn btnAdd" id="btnAdd"
                                        onClick={() => addEmpAttendance()}>Register
                                </button>
                                <button type="button" className="btn btnUpdate" id="btnUpdate"
                                        onClick={() => updateEmpAttendance()}>Update
                                </button>
                                <button type="button" className="btn btnDelete" id="btnDelete">Delete
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
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Signed Time</th>
                                <th scope="col">Leaved Time</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            {displayEmpAttendanceAllData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeAttendance;


