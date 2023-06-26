import React, { useMemo, useState, useEffect } from "react";
import Axios from "axios";
import "./../../../../../src/App.css";
import "../../../../styles/VehicleManagement.css";

import { Link } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";

export default function VehicleUpdate1() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    function getVehicles() {
      Axios.get("http://localhost:8000/vehicle/").then((res) => {
        console.log(res.data);
        setVehicles(res.data);
      });
    }
    getVehicles();
  }, []);

  const setData = (
    id,
    vId,
    vType,
    vModel,
    vRegNo,
    fuType,
    maxWeight,
    ownerFName,
    ownerNIC
  ) => {
    localStorage.setItem("id", id);
    localStorage.setItem("ID", vId);
    localStorage.setItem("firstName", vType);
    localStorage.setItem("lastName", vModel);
    localStorage.setItem("lastName", vRegNo);
    localStorage.setItem("lastName", fuType);
    localStorage.setItem("lastName", maxWeight);
    localStorage.setItem("lastName", ownerFName);
    localStorage.setItem("lastName", ownerNIC);
  };

  const onDelete = (id,e) => {
    e.preventDefault();
    Axios.delete(`http://localhost:8000/vehicle/delete/${id}`).then(res=>console.log('deleted!',res)).catch(err => console.log(err))
  };
  return (
    <div>
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
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
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

                <Table.Cell>
                  <Link to="/update">
                    <Button
                      className="btnAdd"
                      onClick={() =>
                        setData(data.id, data.firstName, data.lastName)
                      }
                    >
                      Update
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="btnDelete"
                    onClick={(e) =>
                      onDelete(
                        data.id,e
                      )
                    }
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

