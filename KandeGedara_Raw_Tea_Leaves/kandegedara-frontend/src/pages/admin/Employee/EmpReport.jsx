import React, {useEffect, useState} from 'react';
import './../../../styles/itemManagement.css';
import Axios from "axios";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";

function EmpReport(props) {
    const [empAttendanceDetails, setempAttendanceDetails] = useState([]);
    const [ID, setID] = useState("");
    const [errors, setErrors] = useState("");
    const [empID, setEmpID] = useState("");
    const [empName, setEmpName] = useState("");
    const [leaveTime, setLeaveTime] = useState("");
    const [signedTime, setSignedTime] = useState("");
    const [date, setDate] = useState("");


    useEffect(() => {
        getAllDailyAttendance();
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
            </tr>)
        })
    }

    const searchEmpAttendance = (emp) => {
        setEmpID(emp)
        if (emp !== "") {
            // console.log(emp)
            let em = empAttendanceDetails.filter((val) => {
                return val.empID.toLowerCase().includes(emp.toLowerCase())
            })
            setempAttendanceDetails(em)
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

        const head = [[' ID', 'Employee Name', 'Leaving Time', 'Signed Time']];
        const elements = empAttendanceDetails.map(empAttendance => [empAttendance.empID, empAttendance.empName, empAttendance.leaveTime, empAttendance.signedTime]);

        autoTable(doc, {
            head: head, body: elements,
        })
        doc.save("emp-attendance-details.pdf");
    }

    return (<div className="main_container">
        <div className="item fw-bold">
            <h5 className="pageName">Employee Report Generation Management</h5>
        </div>
        <div className="item">
            <div className="row mt-5 ps-3">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="row">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <input style={{borderRadius: '20px'}} id="searchID" type="text"
                                           className="form-control col-8 me-5"
                                           placeholder="Employee ID" value={empID} onChange={(e) => {
                                        searchEmpAttendance(e.target.value)
                                    }} onBlur={() => {
                                        getAllDailyAttendance()
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 px-3">
                <div className="table-responsive mt-3">
                    <table className="table table-striped custom-table" id="assignItemTable">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Date</th>
                            <th scope="col">Name</th>
                            <th scope="col">Signed Time</th>
                            <th scope="col">Leaved Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displayEmpAttendanceAllData()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-5 ps-3">
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <button type="button" id="btn-generate-report" className="btn me-3" onClick={() => {
                        generatePDF()
                    }}>Generate Report
                    </button>
                </div>
            </div>
        </div>

    </div>);
}

export default EmpReport;


