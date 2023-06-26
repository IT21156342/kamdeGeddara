import * as React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Sweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import OrderValidation from "../../../validations/Fertilize/OrderValidation";

function Order(props) {
  const [orderID, setOrderID] = useState("");
  const [mongoOrderID, setMongoOrderID] = useState("");
  const [orderName, setOrderName] = useState("");
  const [orderSSTGID, setOrderSSTGID] = useState("");
  const [orderMobile, setOrderMobile] = useState("");
  const [orderItem, setOrderItem] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");
  const [orderPrice, setOrderPrice] = useState("");
  const [orderDescription, setOrderDescription] = useState("");
  const [orderPayment, setOrderPayment] = useState("");
  const [orderDelivery, setOrderDelivery] = useState("");
  const [errors, setErrors] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [sstgDetails, setSSTGDetails] = useState([]);

  useEffect(() => {
    getAllOrders();
    getAllsstgDetails();
    document.getElementById("btnUpdate").setAttribute("disabled", "true");
    document.getElementById("btnDelete").setAttribute("disabled", "true");
  }, []);

  const getAllOrders = () => {
    Axios.get("http://localhost:8000/oders/").then((response) => {
      setOrderDetails(response.data);
    });
  };

  const getAllsstgDetails = () => {
    Axios.get("http://localhost:8000/sstg/getAll").then((response) => {
      setSSTGDetails(response.data.data);
    });
  };

  const getAllSStgID = () => {
    return sstgDetails.map((item) => {
      return (
        <option
          itemScope="row"
          id={item._id}
          key={item._id}
          value={item.sstgID}
        >
          {item.sstgID}
        </option>
      );
    });
  };

  const displaygetAllOrdersData = () => {
    return orderDetails.map((fertilizeOrder) => {
      return (
        <tr itemScope="row" id={fertilizeOrder._id} key={fertilizeOrder._id}>
          <td>{fertilizeOrder.id}</td>
          <td>{fertilizeOrder.sstg_id}</td>
          <td> {fertilizeOrder.name}</td>
          <td>{fertilizeOrder.mobile}</td>
          <td>{fertilizeOrder.quantity}</td>
          <td>{fertilizeOrder.price}</td>
          <td>{fertilizeOrder.description}</td>
          <td> {fertilizeOrder.payment}</td>
          <td> {fertilizeOrder.delivery}</td>
          <td>
            <button
              className="btn btn-default"
              onClick={() => {
                editFertilizeItem(fertilizeOrder);
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
                deleteFertilizeItem(fertilizeOrder);
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

  const addOrderItem = () => {
    const newOrder = {
      "id": orderID,
      "name": orderName,
      "sstg_id": orderSSTGID,
      "mobile": orderMobile,
      "item": orderItem,
      "quantity": orderQuantity,
      "price": orderPrice,
      "description": orderDescription,
      "payment": orderPayment,
      "delivery": orderDelivery,
      "status": "pending",
    };

    const {errors, isInvalid} = OrderValidation(newOrder);

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
      Axios.post('http://localhost:8000/oders/add', newOrder).then((response) => {
      if (response.data.code === 200) {
        Sweetalert2.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: `${response.data.message}`,
        });
        setOrderID("");
        setOrderName("");
        setOrderSSTGID("");
        setOrderMobile("");
        setOrderItem("");
        setOrderQuantity("");
        setOrderPrice("");
        setOrderDescription("");
        setOrderPayment("");
        setOrderDelivery("");

        getAllOrders();
        // clearAll();
      } 
    });
  }
};

 

  const updateOrderItem = () => {
    const newOrder = {
      "id": orderID,
      "name": orderName,
      "sstg_id": orderSSTGID,
      "mobile": orderMobile,
      "item": orderItem,
      "quantity": orderQuantity,
      "price": orderPrice,
      "description": orderDescription,
      "payment": orderPayment,
      "delivery": orderDelivery,
      "status": "pending",
    };
    const {errors, isInvalid} = OrderValidation(newOrder);

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

    Axios.put(
      `http://localhost:8000/oders/update/${mongoOrderID}`,
      newOrder
    ).then((response) => {
      if (response.data.code === 200) {
        Sweetalert2.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: `${response.data.message}`,
        });
        getAllOrders();
        clearAll();
      } 
    });
  }
  };

  const searchFertilizeOrder = () => {
    if (orderID === "" || orderID === undefined || orderID === null) {
      Sweetalert2.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "warning",
        title: "Please insert the item id",
      });
    } else {
      Axios.get(`http://localhost:8000/oders/get/${orderID}`).then(
        (response) => {
          let searchedItem = [];
          searchedItem.push(response.data.data);
          setOrderDetails(searchedItem);
        }
      );
    }
  };

  const deleteFertilizeItem = (fertilizeOrder) => {
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
        Axios.delete(
          `http://localhost:8000/oders/delete/${fertilizeOrder._id}`
        ).then((response) => {
          if (response.data.status) {
            Sweetalert2.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
            getAllOrders();
            clearAll();
          } else {
            Sweetalert2.fire("Not Deleted!", "Something want wrong", "error");
            getAllOrders();
          }
        });
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
      [
        "ID",
        "SSTGID",
        "Name",
        "Mobile",
        "Quantity",
        "Price (Rs.)",
        "Delivery Address",
        "Payment Type",
        "Delivery Date",
      ],
    ];
    const elements = fertilizedDetails.map((fertilizeOrder) => [
      fertilizeOrder.oderID,
      fertilizeOrder._id,
      fertilizeOrder.orderName,
      fertilizeOrder.orderMobile,
      fertilizeOrder.oderQty,
      fertilizeOrder.oderPrice,
      fertilizeOrder.oderDeliveryAddress,
      fertilizeOrder.oderPrice,
      fertilizeOrder.oderDeliveryAddress,
      fertilizeOrder.paymentType,
      fertilizeOrder.oderDeliveryDate,
    ]);

    autoTable(doc, {
      head: head,
      body: elements,
    });
    doc.save("item-details.pdf");
  };

  const editFertilizeItem = (fertilizeOrder) => {
    setMongoOrderID(fertilizeOrder._id);
    setOrderID(fertilizeOrder.id);
    setOrderSSTGID(fertilizeOrder.sstg_id);
    setOrderName(fertilizeOrder.name);
    setOrderMobile(fertilizeOrder.mobile);
    setOrderItem(fertilizeOrder.item);
    setOrderQuantity(fertilizeOrder.quantity);
    setOrderPrice(fertilizeOrder.price);
    setOrderDescription(fertilizeOrder.description);
    setOrderPayment(fertilizeOrder.payment);
    setOrderDelivery(fertilizeOrder.delivery);

    document.getElementById("btnUpdate").removeAttribute("disabled");
    document.getElementById("btnDelete").removeAttribute("disabled");
  };

  const clearAll = () => {
    setOrderID("");
    setOrderName("");
    setOrderSSTGID("");
    setOrderMobile("");
    setOrderItem("");
    setOrderQuantity("");
    setOrderPrice("");
    setOrderDescription("");
    setOrderPayment("");
    setOrderDelivery("");
  };

  const displaySSTGOrderDetails = (event) => {
    let ls = sstgDetails.filter((sstg) => {
      if (sstg.sstgID === event.target.value) {
        return sstg;
      }
    });
    setOrderName(ls[0].firstName + " " + ls[0].lastName);
    setOrderMobile(ls[0].mobile);
    setOrderSSTGID(ls[0].sstgID)
  };

  return (
    <div className="main_container">
      <div className="item fw-bold">
        <h5 className="pageName d-inline">
          Fertilize and Vitamin Management {">"}
        </h5>
        <h5 className="pageName d-inline  fw-normal">
          Fertilize and Vitamin Order Management
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
                      onChange={(event) => {
                        setOrderID(event.target.value);
                      }}
                      value={orderID}
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      className="form-control btnSearch text-white"
                      value="Search"
                      onClick={() => {
                        searchFertilizeOrder();
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
                  name="sstgID"
                  id="sstgID"
                  className="form-select"
                  value={orderSSTGID}
                  onChange={(event) => {
                    displaySSTGOrderDetails(event);
                  }}
                >
                  {getAllSStgID()}
                </select>
                <small
                  id="itemName"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.sstg_id}
                </small>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={orderName}
                  onChange={(event) => {
                    setOrderName(event.target.value);
                  }}
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
                  placeholder="Mobile"
                  value={orderMobile}
                  onChange={(event) => {
                    setOrderMobile(event.target.value);
                  }}
                />
                <small
                  id="itemRate"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.mobile}
                </small>
              </div>
              <div className="col">
                <select
                  name="labID"
                  id="fertilizedTypes"
                  className="form-select"
                  aria-label="role"
                  value={orderItem}
                  onChange={(event) => {
                    setOrderItem(event.target.value);
                  }}
                >
                  <option selected disabled value="">
                    Items
                  </option>
                  <option value="Fertilize">Fertilize</option>
                  <option value="Vitamin">Vitamin</option>
                </select>
                <small
                  id="reduceAmountForBags"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.item}
                </small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={orderQuantity}
                  min="1"
                  onChange={(event) => {
                    setOrderQuantity(event.target.value);
                  }}
                />
                <small
                  id="itemName"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.quantity}
                </small>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  value={orderPrice}
                  onChange={(event) => {
                    setOrderPrice(event.target.value);
                  }}
                />
                <small
                  id="itemName"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.price}
                </small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={orderDescription}
                  onChange={(event) => {
                    setOrderDescription(event.target.value);
                  }}
                />
                <small
                  id="description"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.description}
                </small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <select
                  name="labID"
                  id="fertilizedTypes"
                  className="form-select"
                  aria-label="role"
                  value={orderPayment}
                  onChange={(event) => {
                    setOrderPayment(event.target.value);
                  }}
                >
                  <option selected disabled value="">
                    Payment Types
                  </option>
                  <option value="Credit">CREDIT</option>
                  <option value="Cash">CASH</option>
                </select>
                <small
                  id="reduceAmountForBags"
                  className="d-block text-danger form-text invalid-feedback"
                >
                  {errors.payment}
                </small>
              </div>
              <div className="col">
                <input
                  name="DeliveryDate"
                  className="form-control"
                  placeholder="Delivery Date"
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  id="DeliveryDate"
                  value={orderDelivery}
                  onChange={(event) => {
                    setOrderDelivery(event.target.value);
                  }}
                  min={new Date().toISOString().split("T")[0]}
                />
                <small
                  htmlFor="patientName"
                  className="d-block text-danger form-text invalid-feedback"
                >{errors.delivery}</small>
              </div>
            </div>
            {/*crud function's button */}
            <div className="row mt-5">
              <div className="d-flex justify-content-around align-items-center">
                <button
                  type="button"
                  className="btn btnAdd"
                  id="btnAdd"
                  onClick={() => addOrderItem()}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btnUpdate"
                  id="btnUpdate"
                  onClick={() => {
                    updateOrderItem();
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
              Fertilize and Vitamin Order Details
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
                  <th scope="col">SSTGID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price (Rs.)</th>
                  <th scope="col">Delivery Address</th>
                  <th scope="col">Payment Type</th>
                  <th scope="col">Delivery Date</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>{displaygetAllOrdersData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
