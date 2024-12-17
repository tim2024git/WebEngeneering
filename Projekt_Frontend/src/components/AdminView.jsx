
import React from 'react';
import AdminNavbar from "./AdminNavbar";
import SidebarComponent from "./SidebarComponent";
import Footer from "./Footer";

import { Link, Outlet } from "react-router-dom";


function AdminView() {
  return (

    <div className="page-container">
      <AdminNavbar />
      <div className="content-container mt-5">
        
        <SidebarComponent />
        <Outlet />
      </div>
      <Footer />
      
    </div>
    
  );
}

export default AdminView;
