import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import "./../../../../../src/App.css";
import "../../../../styles/VehicleManagement.css";

import { Link } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";

export default function AllVehicle() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    function getVehicles() {
      axios.get("http://localhost:8000/vehicle/").then((res) => {
        console.log(res.data);
        setVehicles(res.data);
      });
    }
    getVehicles();
  }, []);
  return (
    <div className="main_container ">
      <div className="item ">
        <h5 className="pageName">
          Vehicle and route management &gt; Vehicle details
        </h5>
      </div>
      <div className=" item mt-5 pt-5 pl-5 pr-3 ">
        <h6>Vehicle Details</h6>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Vehicle ID</Table.HeaderCell>
              <Table.HeaderCell>Vehicle Type</Table.HeaderCell>
              <Table.HeaderCell>Vehicle Model</Table.HeaderCell>
              <Table.HeaderCell>Vehicle Reg No</Table.HeaderCell>
              <Table.HeaderCell>Fuel Type</Table.HeaderCell>
              <Table.HeaderCell>Max weight</Table.HeaderCell>
              <Table.HeaderCell>Owner Name</Table.HeaderCell>
              <Table.HeaderCell>Owner NIC</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {vehicles.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.vId}</Table.Cell>
                  <Table.Cell>{data.vType}</Table.Cell>
                  <Table.Cell>{data.vModel}</Table.Cell>
                  <Table.Cell>{data.vRegNo}</Table.Cell>
                  <Table.Cell>{data.fuType}</Table.Cell>
                  <Table.Cell>{data.maxWeight}</Table.Cell>
                  <Table.Cell>{data.ownerFName}</Table.Cell>

                  <Table.Cell>{data.ownerNIC}</Table.Cell>

                  <Table.Cell></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="row">
        <div className="col mt-5 pl-5 d-flex justify-content-around align-items-center">
         <Link to='/admin/vehicleDetails/Update'>
          <Button className="btn btnUpdate"
          >
            Update
          </Button>
          </Link>
        </div>
        
        <div className="col mt-5 pl-5 d-flex justify-content-around align-items-center">
        <Button
            
            onClick={() => setData(data.id, data.firstName, data.lastName)}
            className="btn btnAdd align-items-center"
          >
            Generate report
          </Button>

        </div>
      </div>
    </div>
  );
}
