import React, { useEffect, useState } from "react";
import Axios from "axios";
import Sweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import FertilizedReg from "../../../validations/Fertilize/FertilizedReg";


function Register(props) {
  const [fertilizedDetails, setFertilizedDetails] = useState([]);
  const [errors, setErrors] = useState("");
  const [fertilizedID, setFertilizedID] = useState("");
  const [fertilizedMongoID, setFertilizedMongoID] = useState("");
  const [fertilizedName, setFertilizedName] = useState("");
  const [fertilizedQuantity, setFertilizedQuantity] = useState("");
  const [fertilizedAmount, setFertilizedAmount] = useState("");
  const [fertilizedType, setFertilizedTypes] = useState("");
  const [fertilizedDescription, setItemFertilizedDescription] = useState("");
  const [fertilizedImg, setFertilizedImg] = useState(
    "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
  );

  useEffect(() => {
    getAllFertilizeItemDetails();
    document.getElementById("btnUpdate").setAttribute("disabled", "true");
    document.getElementById("btnDelete").setAttribute("disabled", "true");
    document.getElementById("btnEditImg").setAttribute("disabled", "true");
    document.getElementById("btnImgDelete").setAttribute("disabled", "true");
  }, []);

  const getAllFertilizeItemDetails = () => {
    Axios.get("http://localhost:8000/vitamin/").then((response) => {
      setFertilizedDetails(response.data);
    });
  };
  const displayFertilizeItemAllData = () => {
    return fertilizedDetails.map((item) => {
      return (
        <tr itemScope="row" id={item._id} key={item._id}>
          <td> {item.vitaminsId}</td>
          <td>
            <img
              src={item.image}
              alt="profile picture"
              width={25}
              height={25}
            />
          </td>
          <td> {item.type}</td>
          <td> {item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.amuont}</td>
          <td> {item.description}</td>

          <td>
            <button
              className="btn btn-default"
              onClick={() => {
                editFertilizeItem(item);
              }}
            >
              <i
                style={{ cursor: "pointer", color: "#004000" }}
                className="fa-solid fa-pen me-3  d-inline"
              />
            </button>
            <button
              className="btn btn-default"
              onClick={() => {
                deleteFertilizeItem(item);
              }}
            >
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"
              />
            </button>
          </td>
        </tr>
      );
    });
  };

  const addImageToProfile = () => {
    let imgDiv = document.getElementById("imgInputDiv");

    let imgUploader = document.createElement("input");
    imgUploader.setAttribute("id", "imgUploader");
    imgUploader.setAttribute("type", "file");
    imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
    imgUploader.setAttribute("class", "d-none");
    imgDiv.appendChild(imgUploader);

    let imgUploaderElement = document.getElementById("imgUploader");
    console.log(imgUploaderElement);

    if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
      imgUploaderElement.click();
      imgUploaderElement.addEventListener("change", () => {
        imgUploaderElement = document.getElementById("imgUploader");
        console.log(imgUploaderElement);
        if (
          imgUploaderElement.files[0] !== null &&
          imgUploaderElement.files[0] !== undefined
        ) {
          if (imgUploaderElement.files.length > 0) {
            const fileReader = new FileReader();

            fileReader.onload = function (event) {
              setFertilizedImg(event.target.result);
            };

            fileReader.readAsDataURL(imgUploaderElement.files[0]);
          }
        }
      });
    }

    console.log("dghjfgjdhj");

    document.getElementById("btnEditImg").removeAttribute("disabled");
    document.getElementById("btnImgDelete").removeAttribute("disabled");
    document.getElementById("btnAddImg").setAttribute("disabled", "true");

    console.log("dghjfgjdhj2222");
  };

  const updateImageToProfile = () => {
    document.getElementById("ProfileImage").removeAttribute("src");
    document.getElementById("btnAddImg").setAttribute("disabled", "true");

    let imgDiv = document.getElementById("imgInputDiv");

    let imgUploader = document.createElement("input");
    imgUploader.setAttribute("id", "imgUploader");
    imgUploader.setAttribute("type", "file");
    imgUploader.setAttribute("required", "true");
    imgUploader.setAttribute("accept", "image/png, image/gif, image/jpeg");
    imgUploader.setAttribute("class", "d-none");
    imgDiv.appendChild(imgUploader);

    let imgUploaderElement = document.getElementById("imgUploader");
    console.log(imgUploaderElement);
    console.log("hello");

    if (imgUploaderElement !== undefined && imgUploaderElement !== null) {
      imgUploaderElement.click();
      imgUploaderElement.addEventListener("change", () => {
        imgUploaderElement = document.getElementById("imgUploader");
        console.log(imgUploaderElement);
        if (
          imgUploaderElement.files[0] !== null &&
          imgUploaderElement.files[0] !== undefined
        ) {
          if (imgUploaderElement.files.length > 0) {
            const fileReader = new FileReader();

            fileReader.onload = function (event) {
              setFertilizedImg(event.target.result);
              console.log(fertilizedImg);
            };

            fileReader.readAsDataURL(imgUploaderElement.files[0]);
          }
        }
      });
    }
    document.getElementById("btnEditImg").removeAttribute("disabled");
    document.getElementById("btnImgDelete").removeAttribute("disabled");
    document.getElementById("btnAddImg").setAttribute("disabled", "true");
  };

  const removeProfileImages = () => {
    document.getElementById("ProfileImage").removeAttribute("src");
    document.getElementById("btnImgDelete").setAttribute("disabled", "true");
  };

  const addFertilizeItem = () => {
    const newItem = {
      type: fertilizedType,
      image: fertilizedImg,
      name: fertilizedName,
      quantity: fertilizedQuantity,
      amuont: fertilizedAmount,
      description: fertilizedDescription,
    };

    const {errors, isInvalid} =FertilizedReg(newItem);;
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
      Axios.post(`http://localhost:8000/vitamin/add`, newItem).then((response) => {
        if (response.data !== null && response.data !== undefined) {
          Sweetalert2.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: `${response.data}`,
          });

          setFertilizedID("");
          setFertilizedName("");
          setFertilizedQuantity("");
          setFertilizedTypes("");
          setFertilizedAmount("");
          setItemFertilizedDescription("");
          setFertilizedImg("");
          getAllFertilizeItemDetails();
          document.getElementById("btnAddImg").removeAttribute("disabled");
        }
      }
    )};
  };

  const updateFertilizeItem = () => {
    const newItem = {
      vitaminsId: fertilizedID,
      type: fertilizedType,
      image: fertilizedImg,
      name: fertilizedName,
      quantity: fertilizedQuantity,
      amuont: fertilizedAmount,
      description: fertilizedDescription,
    };

    const {errors, isInvalid} =FertilizedReg(newItem);;
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

    Axios.put(
      `http://localhost:8000/vitamin/update/${fertilizedMongoID}`,
      newItem
    ).then((response) => {
      if (response.data !== null && response.data !== undefined) {
        Sweetalert2.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: `${response.data}`,
        });

        setFertilizedID("");
        setFertilizedName("");
        setFertilizedQuantity("");
        setFertilizedTypes("");
        setFertilizedAmount("");
        setItemFertilizedDescription("");
        setFertilizedImg("");
        getAllFertilizeItemDetails();
        document.getElementById("btnAddImg").removeAttribute("disabled");
      }
    });
  }
  };

  const searchFertilizeItem = () => {
    if (
      fertilizedID === null ||
      fertilizedID === undefined ||
      fertilizedID === ""
    ) {
      Sweetalert2.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "warning",
        title: "Please insert the item id",
      });
    } else {
      Axios.get(`http://localhost:8000/vitamin/get/${fertilizedID}`).then(
        (response) => {
          let searchedItem = [];
          searchedItem.push(response.data.data);
          setFertilizedDetails(searchedItem);
        }
      );
    }
  };

  const deleteFertilizeItem = (item) => {
    Sweetalert2.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:8000/vitamin/delete/${item._id}`).then(
          (response) => {
            console.log(response);
            if (response.data) {
              Sweetalert2.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
              getAllFertilizeItemDetails();
            } else {
              Sweetalert2.fire("Not Deleted!", "Something want wrong", "error");
              getAllFertilizeItemDetails();
            }
          }
        );
      }
    });
  };

  const generatePDF = () => {
    const specialElementHandlers = {
      ".no-export": function (element, renderer) {
        return true;
      },
    };
    const doc = new jsPDF("p", "pt", "a4");

    doc.text(305, 20, "Fertilize Order Details", "center");

    const head = [
      ["ID", "Name", "Price", "Expire Date", "Company Name", "Size"],
    ];
    const elements = fertilizedDetails.map((fertilizeOrder) => [
      fertilizeOrder.vitaminsId,
      fertilizeOrder.type,
      fertilizeOrder.name,
      fertilizeOrder.quantity,
      fertilizeOrder.amuont,
      fertilizeOrder.description,
    ]);

    autoTable(doc, {
      head: head,
      body: elements,
    });
    doc.save("vitamin-details.pdf");
  };

  const editFertilizeItem = (item) => {
    setFertilizedID(item.vitaminsId);
    setFertilizedMongoID(item._id);
    setFertilizedName(item.name);
    setFertilizedQuantity(item.quantity);
    setFertilizedAmount(item.amuont);
    setFertilizedTypes(item.type);
    setItemFertilizedDescription(item.description);
    setFertilizedImg(item.image);

    document.getElementById("btnUpdate").removeAttribute("disabled");
    document.getElementById("btnDelete").removeAttribute("disabled");
  };

  return (
    <div className="main_container">
      <div className="item fw-bold">
        <h5 className="pageName d-inline">
          Fertilize And Vitamin Registration Management 
        </h5>
      </div>
      <div className="item">
        <div className="row mt-5 ps-3">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <button
                type="button"
                id="btn-generate-report"
                className="btn me-3"
                onClick={() => {
                  generatePDF();
                }}
              >
                Generate Report
              </button>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                <div className="d-flex justify-content-end align-items-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <input
                      id="searchID"
                      type="text"
                      className="form-control col-8 me-5"
                      placeholder="ID"
                      value={fertilizedID}
                      onChange={(e) => {
                        setFertilizedID(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      className="form-control btnSearch text-white"
                      value="Search"
                      onClick={() => {
                        searchFertilizeItem();
                      }}
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
                <select
                  onChange={(e) => {
                    setFertilizedTypes(e.target.value);
                  }}
                  name="labID"
                  id="fertilizedTypes"
                  className="form-select"
                  aria-label="role"
                >
                  <option selected disabled value="">
                    Type
                  </option>
                  <option value="Fertilize">Fertilize</option>
                  <option value="Vitamin">Vitamin</option>
                </select>
                <small
                  id="reduceAmountForBags"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.type}
                </small>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => {
                    setFertilizedName(e.target.value);
                  }}
                  value={fertilizedName}
                />
                <small
                  id="itemName"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.name}
                </small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quantity"
                  onChange={(e) => {
                    setFertilizedQuantity(e.target.value);
                  }}
                  value={fertilizedQuantity}
                />
                <small
                  id="itemRate"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.quantity}
                </small>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Amount(Rs.)"
                  onChange={(e) => {
                    setFertilizedAmount(e.target.value);
                  }}
                  value={fertilizedAmount}
                />
                <small
                  id="reduceAmountForWater"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.amuont}
                </small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  onChange={(e) => {
                    setItemFertilizedDescription(e.target.value);
                  }}
                  value={fertilizedDescription}
                />
                <small
                  id="description"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.description}
                </small>
              </div>
            </div>
            <div className="mt-4 " id="imgInputDiv">
              <div className="col d-flex justify-content-start">
                <img
                  id="ProfileImage"
                  className="imgDiv"
                  src={fertilizedImg}
                  alt=""
                />
                {/*image uploader buttons*/}
                <div>
                  <button
                    className="btn btnEditImg"
                    id="btnEditImg"
                    type="button"
                    onClick={() => {
                      updateImageToProfile();
                    }}
                  >
                    <i className="fa-solid fa-pen text-white" />
                  </button>
                  <button
                    className="btn btnImgDelete"
                    id="btnImgDelete"
                    type="button"
                    onClick={() => {
                      removeProfileImages();
                    }}
                  >
                    <i className="fa-solid fa-trash-can d-inline text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
              <div className="row">
                <button
                  type="button"
                  id="btnAddImg"
                  className="btn me-3"
                  onClick={() => {
                    addImageToProfile();
                  }}
                >
                  Upload Image{" "}
                  <i className=" ms-2 me 3 fa-solid fa-cloud-arrow-up"></i>
                </button>
              </div>
            </div>
            {/*crud function's button */}
            <div className="row mt-5">
              <div className="d-flex justify-content-around align-items-center">
                <button
                  type="button"
                  className="btn btnAdd"
                  id="btnAdd"
                  onClick={() => addFertilizeItem()}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btnUpdate"
                  id="btnUpdate"
                  onClick={() => {
                    updateFertilizeItem();
                  }}
                >
                  Update
                </button>
                <button type="button" className="btn btnDelete" id="btnDelete">
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row mt-5 px-3">
          <div className="col-6">
            <h5 className="mb-0 fw-bold mt-2">
              All fertilize and vitamin in the system
            </h5>
            <h6>These are the all items in the systems.</h6>
          </div>
          <div className="table-responsive">
            <table
              className="table table-striped custom-table"
              id="assignItemTable"
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Type</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount (Rs)</th>
                  <th scope="col">Description</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>{displayFertilizeItemAllData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
