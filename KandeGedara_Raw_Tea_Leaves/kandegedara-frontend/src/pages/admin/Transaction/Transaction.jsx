import React, {useEffect, useState} from 'react'
import './../../../styles/transaction.css'
import Axios from "axios";
import {jsPDF} from "jspdf";
import Sweetalert2 from "sweetalert2";
import TransactionValidation from "../../../validations/Transaction";
import AdminLayout from "../../../layouts/admin-layout";

function Transaction() {

    const [transactionDetails, setTransactionDetails] = useState([]);
    const [errors, setErrors] = useState("");
    const [transactionID, setTransactionID] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionDescription, setTransactionDescription] = useState("");
    const [searchedTransaction, setSearchedTransaction] = useState([]);
    const [netIncome, setTotalIncome] = useState(0);
    const [netOutcome, setTotalOutcome] = useState(0);

    useEffect(() => {
        getAllTransactionDetails();
        document.getElementById("btnUpdate").setAttribute("disabled", "true");
        document.getElementById("btnDelete").setAttribute("disabled", "true");
    }, [])

    const getAllTransactionDetails = () => {
        Axios.get("http://localhost:8000/transactions/").then((response) => {
            console.log(response.data.data);
            setTransactionDetails(response.data.data)
        })
    }
    const displayTransactionDetails = () => {
        return transactionDetails.map((transaction) => {
            return (<tr itemScope="row" id={transaction._id} key={transaction._id}>
                <td>{transaction.transactionID}</td>
                <td> {transaction.transactionType}</td>
                <td>{transaction.transactionDate}</td>
                <td>  {transaction.transactionAmount}</td>
                <td>  {transaction.transactionDescription}</td>

                <td className="d-flex justify-content-end align-items-end">
                    <button className="btn btn-default" onClick={() => {
                        editTransaction(transaction)
                    }}>
                        <i style={{"cursor": "pointer", "color": "#004000"}}
                           className="fa-solid fa-pen me-3  d-inline"/>
                    </button>
                    <button className="btn btn-default" onClick={() => {
                        deleteTransaction(transaction)
                    }}>
                        <i style={{"cursor": "pointer"}}
                           className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                    </button>

                </td>
            </tr>)
        })
    }

    const displayIncomeTransaction = () => {
        return transactionDetails.map((transaction) => {
            if (transaction.transactionType === "Income") {
                return (<tr itemScope="row" id={transaction._id} key={transaction._id}>
                        <td>{transaction.transactionID}</td>
                        <td>{transaction.transactionDate}</td>
                        <td>  {transaction.transactionAmount}</td>
                        <td>  {transaction.transactionDescription}</td>

                        <td className="d-flex justify-content-end align-items-end">
                            <button className="btn btn-default" onClick={() => {
                                editTransaction(transaction)
                            }}>
                                <i style={{"cursor": "pointer", "color": "#004000"}}
                                   className="fa-solid fa-pen me-3  d-inline"/>
                            </button>
                            <button className="btn btn-default" onClick={() => {
                                deleteTransaction(transaction)
                            }}>
                                <i style={{"cursor": "pointer"}}
                                   className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                            </button>
                        </td>
                    </tr>
                    )
                }
            }
        )
    }

    const displayOutcomeTransaction = () => {
        return transactionDetails.map((transaction) => {
                if (transaction.transactionType === "Outcome") {
                    return (<tr itemScope="row" id={transaction._id} key={transaction._id}>
                        <td>{transaction.transactionID}</td>
                        <td>{transaction.transactionDate}</td>
                        <td>  {transaction.transactionAmount}</td>
                        <td>  {transaction.transactionDescription}</td>

                        <td className="d-flex justify-content-end align-items-end">
                            <button className="btn btn-default" onClick={() => {
                                editTransaction(transaction)
                            }}>
                                <i style={{"cursor": "pointer", "color": "#004000"}}
                                   className="fa-solid fa-pen me-3  d-inline"/>
                            </button>
                            <button className="btn btn-default" onClick={() => {
                                deleteTransaction(transaction)
                            }}>
                                <i style={{"cursor": "pointer"}}
                                   className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                            </button>

                        </td>
                    </tr>)
                }
            }
        )
    }

    const addTransaction = () => {
        const newTransaction = {
            "transactionID": transactionID,
            "transactionType": transactionType,
            "transactionDate": transactionDate,
            "transactionAmount": transactionAmount,
            "transactionDescription": transactionDescription,
        }

        const {errors, isInvalid} = TransactionValidation(newTransaction);

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
            window.location.reload();
        } else {
            setErrors(errors)
            Axios.post(`http://localhost:8000/transactions/`, newTransaction).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setTransactionID("");
                    setTransactionType("");
                    setTransactionDate("");
                    setTransactionDescription("");
                    setTransactionAmount("");
                    getAllTransactionDetails();
                }
            })

        }
    }

    const updateTransaction = () => {
        const newTransaction = {
            "transactionID": transactionID,
            "transactionType": transactionType,
            "transactionDate": transactionDate,
            "transactionAmount": transactionAmount,
            "transactionDescription": transactionDescription,
        }

        const {errors, isInvalid} = TransactionValidation(newTransaction);

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
            Axios.put(`http://localhost:8000/transactions/`, newTransaction).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setTransactionID("");
                    setTransactionType("");
                    setTransactionDate("");
                    setTransactionDescription("");
                    setTransactionAmount("");
                    getAllTransactionDetails();
                    document.getElementById("btnAdd").removeAttribute("disabled");
                }
            })
        }
        document.getElementById("btnUpdate").setAttribute("disabled", "true");
        document.getElementById("btnDelete").setAttribute("disabled", "true");
    }

    const searchTransaction = () => {
        if (transactionID === null || transactionID === undefined || transactionID === "") {
            Sweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'warning',
                title: 'Please insert the transaction id',
            });
        } else {
            Axios.get(`http://localhost:8000/transactions/${transactionID}`).then((response) => {
                let searchedTransaction = [];
                searchedTransaction.push(response.data.result.data)
                setTransactionDetails(searchedTransaction);
            })
        }
    };

    const deleteTransaction = (transaction) => {
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
                Axios.delete(`http://localhost:8000/transactions/${transaction._id}`).then((response) => {
                    console.log(response)
                    if (response.data.result.response) {
                        Sweetalert2.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllTransactionDetails();
                    } else {
                        Sweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                        getAllTransactionDetails();
                    }
                })

            }
        })

    }

    const generatePDF = () => {
        const specialElementHandlers = {
            '.no-export': function (element, renderer) {
                return true;
            }
        };
        const doc = new jsPDF('p', 'pt', 'a4');

        doc.text(305, 20, 'All Income Transaction Details', 'center');

        const head = [['ID', 'Transaction Date', 'Description', 'Amount']];

        const incomeElements = [];
        transactionDetails.map(transaction => {
            if (transaction.transactionType === "Income") {
                incomeElements.push([transaction.transactionID, transaction.transactionDate, transaction.transactionDescription, transaction.transactionAmount,])
            }
        })

        const totalIncome = () => {
            let total = 0;
            transactionDetails.map(transaction => {
                if (transaction.transactionType === "Income") {
                    total += parseInt(transaction.transactionAmount)
                }
            })
            return total;
        }

        // heading to next table
        doc.text(305, 180, 'All Outcome Transaction Details', 'center');


        doc.autoTable({
            head: head,
            body: incomeElements,
            foot: [
                [{content: 'Total Income', colSpan: 3, styles: {halign: 'right'}}, totalIncome()],
            ],
            theme: 'grid',
        });


        const outcome = [['ID', 'Transaction Date', 'Description', 'Amount']];

        //display outcome elements
        const outElements = [];
        transactionDetails.map(transaction => {
            if (transaction.transactionType === "Outcome") {
                outElements.push([transaction.transactionID, transaction.transactionDate, transaction.transactionDescription, transaction.transactionAmount,])
            }
        })

        // display total outcome
        const totalOutcome = () => {
            let total = 0;
            transactionDetails.map(transaction => {
                if (transaction.transactionType === "Outcome") {
                    total += parseInt(transaction.transactionAmount)
                }
            })
            return total;
        }


        doc.autoTable({
            head: outcome,
            body: outElements,
            foot: [[{content: 'Total Outcome', colSpan: 3, styles: {halign: 'right'}}, totalOutcome()]],
            theme: 'grid',
        });

        doc.save("transaction-details.pdf");
    }

    const editTransaction = (transaction) => {
        console.log(transaction)
        setTransactionID(transaction.transactionID);
        setTransactionType(transaction.transactionType);
        setTransactionDate(transaction.transactionDate);
        setTransactionAmount(transaction.transactionAmount);
        setTransactionDescription(transaction.transactionDescription);

        document.getElementById("btnUpdate").removeAttribute("disabled");
        document.getElementById("btnDelete").removeAttribute("disabled");
    }

    const totalIncome = () => {
        let total = 0;
        transactionDetails.map(transaction => {
            if (transaction.transactionType === "Income") {
                total += parseInt(transaction.transactionAmount)
            }
        })
        return total;
    }

    const totalOutcome = () => {
        let total = 0;
        transactionDetails.map(transaction => {
            if (transaction.transactionType === "Outcome") {
                total += parseInt(transaction.transactionAmount)
            }
        })
        return total;
    }

    const calculateProfit = () => {
        let total = 0;
        transactionDetails.map(transaction => {
            if (transaction.transactionType === "Income") {
                total += parseInt(transaction.transactionAmount);
            } else {
                total -= parseInt(transaction.transactionAmount);
            }
        })
        return total;
    }
    return (
        <AdminLayout class="wrapper">
            <div className="main_container">
                <div className="item fw-bold">
                    <h5 className="pageName">Transaction Management</h5>
                </div>
                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <button id="btn-generate-report" className="btn me-3" onClick={() => {
                                    generatePDF()
                                }}>Generate Report
                                </button>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <input id="searchID" type="text" className="form-control col-8 me-5"
                                                   placeholder=" Transaction ID" value={transactionID}
                                                   onChange={(e) => {
                                                       setTransactionID(e.target.value)
                                                   }}/>
                                        </div>
                                        <div>
                                            <input type="button" className="form-control btnSearch text-white"
                                                   value="Search" onClick={() => {
                                                searchTransaction()
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
                                    <div className="col">
                                        <select name="transactionType" className="form-select" value={transactionType}
                                                aria-label="role" onChange={(e) => {
                                            setTransactionType(e.target.value)
                                        }}>
                                            <option selected>Transaction Type</option>
                                            <option value="Outcome">Outcome</option>
                                            <option value="Income">Income</option>
                                        </select>
                                        <small id="transactionType"
                                               className="d-block text-danger form-text invalid-feedback"></small>
                                    </div>
                                </div>
                                <div className="col">
                                    <input type="date" className="form-control" placeholder="transaction Date "
                                           onChange={(e) => {
                                               setTransactionDate(e.target.value)
                                           }}
                                           value={transactionDate}
                                    />
                                    <small id="transactionDate"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Amount" onChange={(e) => {
                                        setTransactionAmount(e.target.value)
                                    }}
                                           value={transactionAmount}
                                    />
                                    <small id="transactionAmount"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Description"
                                           onChange={(e) => {
                                               setTransactionDescription(e.target.value)
                                           }}
                                           value={transactionDescription}
                                    />
                                    <small id="transactionDescription"
                                           className="d-block text-danger form-text invalid-feedback"></small>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="button" className="btn btnAdd" id="btnAdd"
                                            onClick={() => addTransaction()}>Add
                                    </button>
                                    <button type="button" className="btn btnUpdate" id="btnUpdate"
                                            onClick={() => updateTransaction()}>Update
                                    </button>
                                    <button type="button" className="btn btnDelete" id="btnDelete">Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row mt-5 px-3">
                        <div className="col-6">
                            <h3 className="mb-0 fw-bold mt-2">All Transactions in the system</h3>
                            <p className="tablePara">These are the all Transaction in the systems.</p>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignTransactionTable">
                                <thead>
                                <tr>
                                    <th scope="col">Transaction ID</th>
                                    <th scope="col">Transaction Type</th>
                                    <th scope="col">Date</th>
                                    <th scope="col"> Amount</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>

                                {displayTransactionDetails()}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Transaction;