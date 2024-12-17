import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

function SidebarComponent() {

  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  function activateSidebarLink(e, id) {
    const linkElement = document.getElementById(id);
    const sidebarLinks = document.getElementsByClassName('nav-link');
    Array.from(sidebarLinks).forEach((element) =>
      element.classList.remove('active')
    );
    if (linkElement) {
      linkElement.classList.add('active');
    }
  }

  return (

    <aside className="sidebar bg-body d-flex flex-column justify-content-between  pt-3 ms-3" style={{ height: '90vh' }}>
      <ul className="nav sidebar-list  align-items-start text-start mb-auto">



        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnStudiengaenge")}
            to="./studyprograms"
            className="nav-link"
            id="btnStudiengaenge"
          >
            <i className="fs-6 bi-speedometer2 sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Studiengänge</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnVorlesungen")}
            to="./lectures"
            className="nav-link"
            id="btnVorlesungen"
          >
            <i className="fs-6 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Vorlesungen</span>
          </Link>
        </li>
          <Link
            onClick={(e) => activateSidebarLink(e, "btnDozenten")}
            to="./lecturers"
            className="nav-link"
            id="btnDozenten"
          >
            <i className="fs-6 bi-people sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Dozenten</span>
          </Link>
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnStudienjahrgaenge")}
            
            className="nav-link"
            id="btnStudienjahrgaenge"
            >
            <i className="fs-6 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Studienjahrgänge</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnSemester")}
            
            className="nav-link"
            id="btnSemester"
            >
            <i className="fs-6 bi-grid sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Semester</span>
        </Link>
        </li>
        <Link
            onClick={(e) => activateSidebarLink(e, "btnLectureDates")}
            to="./lecture-dates"
            className="nav-link"
            id="btnLectureDates"
        >
            <i className="fs-6 bi-calendar sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Vorlesungstermine</span>
        </Link>
      </ul>
      <div className="settings">
        <hr />
        <div>
          <a href="#" className="nav-link" id="btnLoadSampleData">
            <i className="bi bi-tools sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Beispieldaten laden</span>
          </a>
        </div>
      </div>
    </aside>


  );
}

export default SidebarComponent;


{/*
import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet } from "react-router-dom";
import { MenuItem, Menu, Sidebar } from 'react-pro-sidebar';
import HomeView from './HomeView';


function SidebarComponent() {

  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  function activateSidebarLink(e, id) {
    let navlinkId = id;
    let linkElement = document.getElementById(navlinkId);
    let sidebarLinks = document.getElementsByClassName('nav-link');
    for (let element of sidebarLinks) {
      element.classList.remove('active');
    }
    if (linkElement != undefined) {
      linkElement.classList.add('active');
    }
  }

  return (

    <aside className="sidebar bg-body d-flex flex-column">

      <ul className="nav sidebar-list max-margin-bottom align-items-start mb-auto">
        <li className="nav-item">
          <Link onClick={(e) => activateSidebarLink(e, "btnStudiengaenge")} to="./studyprograms" className="nav-link" id="btnStudiengaenge">
            <i className="fs-4 bi-speedometer2 sidebar-icon" ></i>
            <span className="d-none d-lg-inline ms-2">Studiengänge</span>
          </Link>

        </li>
        <li className="nav-item ">
          <Link onClick={(e) => activateSidebarLink(e, "btnVorlesungen")} to="./lectures" className="nav-link" id="btnVorlesungen">
            <i className="fs-6 bi-table sidebar-icon" ></i>
            <span className="d-none d-lg-inline ms-2">Vorlesungen</span>

          </Link>

        </li>
        <li className="nav-item">
          <a href="#" className="nav-link" id="btnDozenten">

            <i className="fs-6 bi-people sidebar-icon" ></i>
            <span className="d-none d-lg-inline ms-2">Dozenten</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link" id="btnStudienjahrgaenge">
            <i className="fs-6 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Studienjahrgänge</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link link-dark" id="btnSemester">
            <i className="fs-6 bi-grid sidebar-icon" ></i>
            <span className="d-none d-lg-inline ms-2">Semester</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link" id="btnVorlesungstermine">

            <i className="fs-6 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Vorlesungstermine</span>
          </a>
        </li>
      </ul>
      <div className="settings">
        <hr />
        <div>
          <a href="#" className="nav-link" id="btnLoadSampleData">

            <i className="bi bi-tools sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Beispieldaten laden</span>
          </a>
        </div>
      </div>
    </aside>

  );
}

export default SidebarComponent;*/}