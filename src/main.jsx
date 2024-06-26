import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";

import BarChart from "./Pages/BarChart";
import Block from "./Pages/Block";
import ContractRequests from "./Pages/ContractRequests";
import LineChart from "./Pages/LineChart";
import PieChart from "./Pages/PieChart";
import Posts from "./Pages/Posts/Posts";
import Reports from "./Pages/Reports";
import Users from "./Pages/Users/Users";
import Login from "./Pages/Auth/Login";
import Roles from "./Pages/ManageTeam/Roles";
import AddEmployee from "./Pages/ManageTeam/AddEmployee";
import Permission from "./Pages/ManageTeam/Permission";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="/Roles" element={<Roles />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/Permission" element={<Permission />} />
        <Route path="/BarChart" element={<BarChart />} />
        <Route path="/Block" element={<Block />} />
        <Route path="/CompaniesRegistration" element={<ContractRequests />} />
        <Route path="/LineChart" element={<LineChart />} />
        <Route path="/PieChart" element={<PieChart />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
