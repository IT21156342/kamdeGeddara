import React, {useEffect, useState} from 'react'
import './../../../styles/itemManagement.css';
import Axios from "axios";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import Sweetalert2 from "sweetalert2";
import ItemValidation from "../../../validations/ItemManagement";
import AdminLayout from "../../../layouts/admin-layout";


function ItemManagement() {
    const [itemDetails, setItemDetails] = useState([]);
    const [errors, setErrors] = useState("");
    const [itemID, setItemID] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemRate, setItemRate] = useState("");
    const [reduceAmountForWater, setReduceAmountForWater] = useState("");
    const [reduceAmountForBag, setReduceAmountForBags] = useState("");
    const [description, setItemDescription] = useState("");
    const [itemImg, setItemImg] = useState("https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png");
    const [searchedItem, setSearchedItem] = useState([]);

    useEffect(() => {
        getAllItemDetails();
        document.getElementById("btnUpdate").setAttribute("disabled", "true");
        document.getElementById("btnDelete").setAttribute("disabled", "true");
        document.getElementById("btnEditImg").setAttribute("disabled", "true");
        document.getElementById("btnImgDelete").setAttribute("disabled", "true");
    }, [])

    const getAllItemDetails = () => {
        Axios.get("http://localhost:8000/items/").then((response) => {
            setItemDetails(response.data.data)
        })
    }
    const displayItemAllData = () => {
        return itemDetails.map((item) => {
            return (<tr itemScope="row" id={item._id} key={item._id}>
                <td>
                    {item.itemID}
                </td>
                <td>
                    <img src={item.itemImg} alt="profile picture" width={25} height={25}/>
                </td>
                <td> {item.itemName}</td>
                <td>
                    {item.itemRate}
                </td>

                <td>  {item.reduceAmountForWater}</td>
                <td>  {item.reduceAmountForBag}</td>
                <td> {item.description}</td>
                <td>
                    <button className="btn btn-default" onClick={() => {
                        editItem(item)
                    }}>
                        <i style={{"cursor": "pointer", "color": "#004000"}}
                           className="fa-solid fa-pen me-3  d-inline"/>
                    </button>
                    <button className="btn btn-default" onClick={() => {
                        deleteItem(item)
                    }}>
                        <i style={{"cursor": "pointer"}}
                           className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"/>
                    </button>

                </td>
            </tr>)
        })
    }

    const addImageToProfile = () => {
        let imgDiv = document.getElementById("imgInputDiv");

        let imgUploader = document.createElement("input");
        imgUploader.setAttribute("id", "imgUploader");
        imgUploader.setAttribute("type", "file");
        imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
        imgUploader.setAttribute("class", "d-none")
        imgDiv.appendChild(imgUploader);

        let imgUploaderElement = document.getElementById("imgUploader");
        console.log(imgUploaderElement);

        if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
            imgUploaderElement.click();
            imgUploaderElement.addEventListener("change", () => {
                imgUploaderElement = document.getElementById("imgUploader");
                console.log(imgUploaderElement);
                if (imgUploaderElement.files[0] !== null && imgUploaderElement.files[0] !== undefined) {
                    if (imgUploaderElement.files.length > 0) {
                        const fileReader = new FileReader();

                        fileReader.onload = function (event) {
                            setItemImg(event.target.result);
                        };

                        fileReader.readAsDataURL(imgUploaderElement.files[0]);
                    }
                }
            });
        }

        console.log("dghjfgjdhj")

        document.getElementById("btnEditImg").removeAttribute("disabled");
        document.getElementById("btnImgDelete").removeAttribute("disabled");
        document.getElementById("btnAddImg").setAttribute("disabled", "true");

        console.log("dghjfgjdhj2222")
    }

    const updateImageToProfile = () => {
        document.getElementById("ProfileImage").removeAttribute("src");
        document.getElementById("btnAddImg").setAttribute("disabled", "true");

        let imgDiv = document.getElementById("imgInputDiv");

        let imgUploader = document.createElement("input");
        imgUploader.setAttribute("id", "imgUploader");
        imgUploader.setAttribute("type", "file");
        imgUploader.setAttribute("required", "true");
        imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
        imgUploader.setAttribute("class", "d-none")
        imgDiv.appendChild(imgUploader);

        let imgUploaderElement = document.getElementById("imgUploader");
        console.log(imgUploaderElement);
        console.log("hello");

        if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
            imgUploaderElement.click();
            imgUploaderElement.addEventListener("change", () => {
                imgUploaderElement = document.getElementById("imgUploader");
                console.log(imgUploaderElement);
                if (imgUploaderElement.files[0] !== null && imgUploaderElement.files[0] !== undefined) {
                    if (imgUploaderElement.files.length > 0) {
                        const fileReader = new FileReader();

                        fileReader.onload = function (event) {
                            setItemImg(event.target.result);
                            console.log(itemImg)
                        };

                        fileReader.readAsDataURL(imgUploaderElement.files[0]);
                    }
                }
            });
        }
        document.getElementById("btnEditImg").removeAttribute("disabled");
        document.getElementById("btnImgDelete").removeAttribute("disabled");
        document.getElementById("btnAddImg").setAttribute("disabled", "true");

    }

    const removeProfileImages = () => {
        document.getElementById("ProfileImage").removeAttribute("src");
        document.getElementById("btnImgDelete").setAttribute("disabled", "true");
    }

    const addItem = () => {
        const newItem = {
            "itemID": itemID,
            "itemName": itemName,
            "itemRate": itemRate,
            "reduceAmountForWater": reduceAmountForWater,
            "reduceAmountForBag": reduceAmountForBag,
            "description": description,
            "itemImg": itemImg
        }

        const {errors, isInvalid} = ItemValidation(newItem);

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
            Axios.post(`http://localhost:8000/items/`, newItem).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setItemID("");
                    setItemName("");
                    setItemRate("");
                    setReduceAmountForBags("");
                    setReduceAmountForWater("");
                    setItemDescription("");
                    setItemImg("");
                    getAllItemDetails();
                    document.getElementById("btnAddImg").removeAttribute("disabled");
                }
            })

        }
    }

    const updateItem = () => {
        const newItem = {
            "itemID": itemID,
            "itemName": itemName,
            "itemRate": itemRate,
            "reduceAmountForWater": reduceAmountForWater,
            "reduceAmountForBag": reduceAmountForBag,
            "description": description,
            "itemImg": itemImg
        }

        const {errors, isInvalid} = ItemValidation(newItem);

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
            Axios.put('http://localhost:8000/items/', newItem).then((response) => {
                if (response.data.message) {
                    Sweetalert2.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: `${response.data.message}`,
                    });

                    setItemID("");
                    setItemName("");
                    setItemRate("");
                    setReduceAmountForBags("");
                    setReduceAmountForWater("");
                    setItemDescription("");
                    setItemImg("");
                    getAllItemDetails();
                    document.getElementById("btnAddImg").removeAttribute("disabled");
                }
            })

        }
    }

    const searchItem = () => {
        if (itemID === null || itemID === undefined || itemID === "") {
            Sweetalert2.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'warning',
                title: 'Please insert the item id',
            });
        } else {
            Axios.get(`http://localhost:8000/items/${itemID}`).then((response) => {
                let searchedItem = [];
                searchedItem.push(response.data.result.data)
                setItemDetails(searchedItem);
            })
        }
    };

    const deleteItem = (item) => {
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
                Axios.delete(`http://localhost:8000/items/${item._id}`).then((response) => {
                    console.log(response)
                    if (response.data.result.response) {
                        Sweetalert2.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllItemDetails();
                    } else {
                        Sweetalert2.fire(
                            'Not Deleted!',
                            'Something want wrong',
                            'error'
                        )
                        getAllItemDetails();
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

        doc.text(305, 20, 'Item Details', 'center');

        const head = [['ID', 'Item Name', 'Item Rate',
            'Reduce For Water', 'Reduce for Bags', 'Description']];
        const elements = itemDetails.map(item => [item.itemID, item.itemName, item.itemRate,
            item.reduceAmountForWater, item.reduceAmountForBag, item.description]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("item-details.pdf");
    }

    const editItem = (item) => {
        console.log(item)
        setItemID(item.itemID);
        setItemName(item.itemName);
        setItemRate(item.itemRate);
        setReduceAmountForWater(item.reduceAmountForWater);
        setReduceAmountForBags(item.reduceAmountForBag);
        setItemDescription(item.description);
        setItemImg(item.itemImg);

        document.getElementById("btnUpdate").removeAttribute("disabled");
        document.getElementById("btnDelete").removeAttribute("disabled");
    }

    return (
        <AdminLayout class="wrapper">
            <div className="main_container">
                <div className="item fw-bold">
                    <h5 className="pageName">Item Management</h5>
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
                                                   placeholder=" Item ID" value={itemID} onChange={(e) => {
                                                setItemID(e.target.value)
                                            }}/>
                                        </div>
                                        <div>
                                            <input type="button" className="form-control btnSearch text-white"
                                                   value="Search" onClick={() => {
                                                searchItem()
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
                                    <input type="text" className="form-control" placeholder="Item Name"
                                           onChange={(e) => {
                                               setItemName(e.target.value)
                                           }}
                                           value={itemName}/>
                                    <small id="itemName"
                                           className="d-block text-danger form-text invalid-feedback">{errors.itemName}</small>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Item Rate"
                                           onChange={(e) => {
                                               setItemRate(e.target.value)
                                           }}
                                           value={itemRate}/>
                                    <small id="itemRate"
                                           className="d-block text-danger form-text invalid-feedback">{errors.itemRate}</small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Reduce Amount For Water"
                                           onChange={(e) => {
                                               setReduceAmountForWater(e.target.value)
                                           }}
                                           value={reduceAmountForWater}/>
                                    <small id="reduceAmountForWater"
                                           className="d-block text-danger form-text invalid-feedback">{errors.reduceAmountForWater}</small>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Reduce Amount For Bags"
                                           onChange={(e) => {
                                               setReduceAmountForBags(e.target.value)
                                           }}
                                           value={reduceAmountForBag}
                                    />
                                    <small id="reduceAmountForBags"
                                           className="d-block text-danger form-text invalid-feedback">{errors.reduceAmountForBag}</small>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                <textarea className="form-control" placeholder="Item Description"
                                          onChange={(e) => {
                                              setItemDescription(e.target.value)
                                          }}
                                          value={description}/>
                                    <small id="description"
                                           className="d-block text-danger form-text invalid-feedback">{errors.description}</small>
                                </div>
                            </div>
                            <div className="mt-4 " id="imgInputDiv">
                                <div className="col d-flex justify-content-start">
                                    <img id="ProfileImage" className="imgDiv" src={itemImg}
                                         alt=""/>
                                    {/*image uploader buttons*/}
                                    <div>
                                        <button className="btn btnEditImg" id="btnEditImg" type="button"
                                                onClick={() => {
                                                    updateImageToProfile()
                                                }}>
                                            <i className="fa-solid fa-pen text-white"/>
                                        </button>
                                        <button className="btn btnImgDelete" id="btnImgDelete" type="button"
                                                onClick={() => {
                                                    removeProfileImages()
                                                }}>
                                            <i className="fa-solid fa-trash-can d-inline text-white"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
                                <div className="row">
                                    <button type="button" id="btnAddImg" className="btn me-3"
                                            onClick={() => {
                                                addImageToProfile()
                                            }}>Upload Image <i
                                        className=" ms-2 me 3 fa-solid fa-cloud-arrow-up"></i></button>
                                </div>
                            </div>
                            {/*crud function's button */}
                            <div className="row mt-5">
                                <div className="d-flex justify-content-around align-items-center">
                                    <button type="button" className="btn btnAdd" id="btnAdd"
                                            onClick={() => addItem()}>Add
                                    </button>
                                    <button type="button" className="btn btnUpdate" id="btnUpdate" onClick={() => {
                                        updateItem()
                                    }}>Update
                                    </button>
                                    <button type="button" className="btn btnDelete" id="btnDelete">Delete
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row mt-5 px-3">
                        <div className="col-6">
                            <h5 className="mb-0 fw-bold mt-2">All Items in the system</h5>
                            <h6>These are the all items in the systems.</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignItemTable">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Item Rate</th>
                                    <th scope="col">Reduce Amount for Water</th>
                                    <th scope="col">Reduce Amount for Bags</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {displayItemAllData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default ItemManagement;