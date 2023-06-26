import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/admin/">
            <span className="icon">
              <i className="fa fa-tachometer" />
            </span>
            <span className="title">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/sstg">
            <span className="icon">
              <i className="fa-solid fa-user-group" />
            </span>
            <span className="title">SSGT</span>
          </Link>
        </li>
        <li>
          <Link>
            <div
              className="col-lg-6 col-md-12 col-sm-12"
              data-bs-toggle="collapse"
              data-bs-target="#collapseStore"
              aria-expanded="false"
              aria-controls="collapse Store"
            >
              <span className="icon">
                <i className="fa-solid fa-jar-wheat"></i>
              </span>
              <span className="title">Store</span>
            </div>
            <div className="collapse mt-3" id="collapseStore">
              <Link>
                <div
                  className="col-lg-6 col-md-12 col-sm-12"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTeaLeaves"
                  aria-expanded="false"
                  aria-controls="collapse Store"
                >
                  <span className="icon">
                    <i className="fa-solid fa-seedling"></i>
                  </span>
                  <span className="title">Raw Tea Leave</span>
                </div>
                <div className="collapse mt-3" id="collapseTeaLeaves">
                  <Link to="/admin/purchaseTeaLeaves">
                    <span className="icon">
                      <i className="fa-solid fa-cart-flatbed-suitcase"></i>
                    </span>
                    <span className="title">Purchase</span>
                  </Link>
                  <Link to="/admin/sellTeaLeaves">
                    <span className="icon">
                      <i className="fa-solid fa-truck-ramp-box"></i>
                    </span>
                    <span className="title">Sell</span>
                  </Link>
                  <Link to="/admin/findSSTG">
                    <span className="icon">
                      <i
                        className="fa-solid fa-location-arrow"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="title">Find SSTG</span>
                  </Link>
                </div>
              </Link>
              <Link>
                <div
                  className="col-lg-6 col-md-12 col-sm-12"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTeaPowder"
                  aria-expanded="false"
                  aria-controls="collapse Store"
                >
                  <span className="icon">
                    <i className="fa-solid fa-mug-hot" aria-hidden="true" />
                  </span>
                  <span className="title">Tea Powder</span>
                </div>
                <div className="collapse mt-3" id="collapseTeaPowder">
                  <Link to="/admin/purchaseTeaPowder">
                    <span className="icon">
                      <i className="fa-solid fa-cart-flatbed-suitcase"></i>
                    </span>
                    <span className="title">Purchase</span>
                  </Link>
                  <Link to="/admin/sellTeaPowder">
                    <span className="icon">
                      <i className="fa-solid fa-truck-ramp-box"></i>
                    </span>
                    <span className="title">Sell</span>
                  </Link>
                </div>
              </Link>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/admin/item">
            <span className="icon">
              <i className="fa-solid fa-leaf" />
            </span>
            <span className="title">Item</span>
          </Link>
        </li>

        <li>
          <Link>
            <div
              className="col-lg-6 col-md-12 col-sm-12"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEmployee"
              aria-expanded="false"
              aria-controls="collapse Employee"
            >
              <span className="icon">
                <i className="fa-solid fa-id-badge"></i>
              </span>
              <span className="title">Employee</span>
            </div>

            <div className="collapse mt-3" id="collapseEmployee">
              <Link to="/admin/register">
                <span className="icon">
                  <i className="fa-solid fa-keyboard"></i>
                </span>
                <span className="title">Register</span>
              </Link>
              <Link to="/admin/attendance">
                <span className="icon">
                  <i
                    className="fa-solid fa-calendar-check"
                    aria-hidden="true"
                  />
                </span>
                <span className="title">Attendance</span>
              </Link>
            </div>
          </Link>
        </li>
        <li>
          <Link>
            <div
              className="col-lg-6 col-md-12 col-sm-12"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFertilize"
              aria-expanded="false"
              aria-controls="collapse Example"
            >
              <span className="icon">
                <i className="fa-solid fa-seedling"></i>
              </span>
              <span className="title">Fertilzed & Vitamin</span>
            </div>

            <div className="collapse mt-3" id="collapseFertilize">
              <Link to="admin/fertilized/register">
                <span className="icon">
                  <i className="fa-solid fa-keyboard"></i>
                </span>
                <span className="title">Register</span>
              </Link>
              <Link to="admin/fertilized/order">
                <span className="icon">
                  <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
                </span>
                <span className="title">Order</span>
              </Link>
            </div>
          </Link>
        </li>

        <li>
          <Link to="/admin/vehicle">
            <div
              className="col-lg-6 col-md-12 col-sm-12"
              data-bs-toggle="collapse"
              data-bs-target="#collapseVehicle"
              aria-expanded="false"
              aria-controls="collapse Example"
            >
              <span className="icon">
                <i className="fa-solid fa-seedling"></i>
              </span>
              <span className="title">Vehicle Management</span>
            </div>
            <div className="collapse mt-3" id="collapseVehicle">
              <Link to="/admin/vehicleAdd">
                <span className="icon">
                  <i className="fa-solid fa-truck" aria-hidden="true" />
                </span>
                <span className="title">New Vehicle</span>
              </Link>
              <Link to="/admin/vehicleDetails">
                <span className="icon">
                  <i className="fa-solid fa-truck" aria-hidden="true" />
                </span>
                <span className="title">Vehicle Details</span>
              </Link>
              <Link to="/admin/trackRoute">
                <span className="icon">
                  <i className="fa-solid fa-truck" aria-hidden="true" />
                </span>
                <span className="title">Track Routes</span>
              </Link>
              <Link to="/admin/generateReport">
                <span className="icon">
                  <i className="fa-solid fa-truck" aria-hidden="true" />
                </span>
                <span className="title">Generate Reports</span>
              </Link>
            </div>{" "}
          </Link>
        </li>

        <li>
          <Link to="/admin/salary">
            <span className="icon">
              <i className="fa fa-sack-dollar" aria-hidden="true" />
            </span>
            <span className="title">Salary</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/transaction">
            <span className="icon">
              <i
                className="fa-solid fa-scale-unbalanced-flip"
                aria-hidden="true"
              />
            </span>
            <span className="title">Transaction</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
