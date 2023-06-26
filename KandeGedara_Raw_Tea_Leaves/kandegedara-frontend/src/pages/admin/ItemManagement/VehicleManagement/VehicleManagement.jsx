import React from "react";
import "./../../../../styles/VehicleManagement.css";
import { useState } from "react";
import Axios from "axios";

function VehicleManagement() {
  const [vID, setVID] = useState("");
  const [vModel, setVModel] = useState("");
  const [vType, setVType] = useState("");
  const [vRegNo, setVRegNo] = useState("");
  const [fuType, setFuType] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [ownerFName, setFName] = useState("");
  const [ownerLName, setLName] = useState("");
  const [ownerMobile, setOwnerMobile] = useState("");
  const [ownerNIC, setOwnerNIC] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:8000/vehicle/add", {
      vID:vID,
      vModel: vModel,
      vType:vType,
      vRegNo:vRegNo,
      fuType:fuType,
      maxWeight:maxWeight,
      ownerFName:ownerFName,
      ownerLName:ownerLName,
      ownerMobile:ownerMobile,
      ownerNIC:ownerNIC,
      date:date
    });
  };
  return (
    <div className="main_container">
      <div className="item fw-bold">
        <h5 className="pageName">
          Vehicle and route management &gt; add vehicle
        </h5>
      </div>
      <div className="item">
        <div className="row mt-5 px-3">
          <form onSubmit={handleSubmit} id="vehicleForm">
            <h3>Register</h3>
            <div style={{ display: "flex" }}>
              <button className="btn btnSearchV" style={{ marginLeft: "auto" }}>
                Add Photo
              </button>
            </div>

            <div className="row mt-4">
              <div class="w-20 p-1" className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vehicle Type"
                  onChange={(e) => {setVType(e.target.value)}}
                />
                <small
                  id="vehicle_type"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
              <div class="w-40 p-1" className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vehicle Model"
                  onChange={(e) => {setVModel(e.target.value)}}
                />
                <small
                  id="vehicle_model"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col col-3">
                <h6>Vehicle Reg. No:</h6>
              </div>
              <div className="col ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vehicle Registration Number"
                  onChange={(e) => {setVRegNo(e.target.value)}}
                />
                <small
                  id="vehicleRegNo"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col col-3">
                <h6>Fuel Type:</h6>
              </div>
              <div className="col ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Diesel"
                  onChange={(e) => {setFuType(e.target.value)}}
                />
                <small
                  id="fuel_type"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col col-3">
                <h6>Max load weight:</h6>
              </div>
              <div className="col ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Max load weight"
                  onChange={(e) => {setMaxWeight(e.target.value)}}
                />
                <small
                  id="max_load_weight"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col col-3">
                <h6>Date</h6>
              </div>
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter the date"
                  onChange={(e) => {setDate(e.target.value)}}
                />
                <small
                  id="date"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col col-3 justify-content-md-center ">
                <h6>Vehicle ID</h6>
              </div>
              <div className="col ">
                <input 
                type="text" 
                className="form-control" placeholder="ID" 
                onChange={(e) => {setVID(e.target.value)}}
                />
                <small
                  id="vehicle_id"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>

            <div className="row mt-4">
              <h6>Owner details</h6>
              <div className="col col-lg-1">
                <select type="text" className="form-control">
                  <option value="mr">Mr.</option>
                  <option value="mrs">Mrs.</option>
                </select>
                <small
                  id="owner_type"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
              <div className="col ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  onChange={(e) => {setFName(e.target.value)}}
                />
                <small
                  id="first_name"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={(e) => {setLName(e.target.value)}}
                />
                <small
                  id="last_name"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col col-3 justify-content-md-center ">
                <h6>Owner Mobile Number</h6>
              </div>
              <div className="col ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  onChange={(e) => {setOwnerMobile(e.target.value)}}
                />
                <small
                  id="owner_mobile"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col col-3 justify-content-md-center ">
                <h6>Owner NIC</h6>
              </div>
              <div className="col ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter NIC"
                  onChange={(e) => {setOwnerNIC(e.target.value)}}
                />
                <small
                  id="owner_nic"
                  className="d-block text-danger form-text invalid-feedback"
                ></small>
              </div>
            </div>
            <div className="row mt-5">
              <div className="d-flex justify-content-around align-items-center">
                <button type="submit" className="btn btnAdd">
                  Register
                </button>

                <button type="button" className="btn btnDelete">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VehicleManagement;
