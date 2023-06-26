import React from "react";
import "../../../../styles/VehicleManagement.css";
//import SingleCard from "../../../../components/admin/common/vehicleManagement/dashboardCard";
import SingleCard from "../../../../components/admin/common/dashboardCard"



const totalObj = {
  title: "Total Vehicles",
  totalNumber: 7,
  icon: "ri-police-car-line",
};

const inObj = {
  title: "Vehicles In",
  totalNumber: 5,
};

const outObj = {
  title: "Vehicle Out",
  totalNumber: "2",
 
};



const Dashboard = () => {
  return (
    <div className="main_container">
      <div class="row item" >
        <div class="col all">
          <SingleCard item={totalObj} />
         
        </div>
        <div class="col all">
         <SingleCard item={inObj} />
          
        </div>
        <div class="col all">
        <SingleCard item={outObj} />
         
        </div>
        
      </div>

      <div className="row">
          <div className="col button">
            <button >1</button> 

          </div>
          <div className="col button">
            <button >2</button>
          </div>
         
      </div>
      <div class="row">
      <div className="col button">
            <button >
              3
            </button>

          </div>
          <div className="col button">
            <button>4</button>
          </div>

      </div>
    </div>
    
  );
};




export default Dashboard;