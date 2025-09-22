import React, { useContext, useRef, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import men from "../Assets/men.jpg";
import women from "../Assets/women.jpg";
import kids from "../Assets/kids.jpg";


const Sidebar = () => {
  return (
    <div className="sidebar h-[100vh] border-r-2">
      <h1>Choose Category</h1>
      <Link to={"/men"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={men} alt="" />
          <p>Men</p>
        </div>
      </Link>
      <Link to={"/women"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={women} alt="" />
          <p>Women</p>
        </div>
      </Link>
      <Link to={"/kids"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={kids} alt="" />
          <p>Kids</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
