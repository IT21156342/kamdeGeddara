import React from "react";
import AdminLayout from "../layouts/admin-layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import ItemManagement from "../pages/admin/ItemManagement/ItemManagement";
import SSTG from "../pages/admin/SSTG/SSTGManagement";
import Dashboard from "../pages/admin/ItemManagement/VehicleManagement/vehicleMain";
import VehicleManagement from "../pages/admin/ItemManagement/VehicleManagement/VehicleManagement";
import SalryMangement from "../pages/admin/Salary/salary";
import Salaryreprte from "../pages/admin/Salary/salaryreport";
import Transaction from "../pages/admin/Transaction/Transaction";
import LastProduct  from '../pages/admin/Lastproducte/Lastproducte' 
import SellingTeaLeaves from '../pages/admin/SellTeaLeaves/SellingTeaLeaves'
import PurchaseTeaLeaves from '../pages/admin/PurchaseTeaLeaves/PurchaseTeaLeaves' // import purchase page
import EmployeeReg from '../pages/admin/Employee/EmployeeReg'
import EmployeeAttendance from '../pages/admin/Employee/EmployeeAttendance'
import Register from "../pages/admin/Fertilized/Register";
import Order from "../pages/admin/Fertilized/Order";

function RouteComponent() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} exact />
        </Routes>
      </Router>

      <Router>
        <Routes>
        <Route path="admin/item" element={<ItemManagement />} />
            <Route path="admin/transaction" element={<Transaction />} />
            <Route path="admin/sstg" element={<SSTG />} />
            <Route path="admin/vehicle" element={<Dashboard />} />
            <Route path="admin/vehicleAdd" element={<VehicleManagement />} />
            <Route path="admin/salary" element={<SalryMangement />} />
            <Route path="admin/salarysd" element={<Salaryreprte />} />
            <Route path="admin/fertilized/register"element={<Register />}excat/>
            <Route path="admin/fertilized/order" element={<Order />} excat />
            <Route path = "admin/register" element={<EmployeeReg/>}/>
            <Route path = "admin/attendance" element={<EmployeeAttendance/>}/>
            <Route path = "admin/lastproduct" element={<LastProduct/>}/>
            <Route path = "admin/selltealeaves" element={<SellingTeaLeaves/>}/>
            <Route path = "admin/purchasetealeaves" element={<PurchaseTeaLeaves/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default RouteComponent;
