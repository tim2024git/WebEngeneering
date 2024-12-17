import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

function SidebarComponent() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const apiUrl = 'http://localhost:9090'; // URL Ihrer API

  const seedData = async () => {
    try {
      // Beispiel-Dozenten
      const lecturer1 = await fetch(`${apiUrl}/lecturers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: 'Raymond',
          lastName: 'Bimazubute',
          email: 'john.doe@example.com'
        })
      }).then(response => response.json());

      const lecturer2 = await fetch(`${apiUrl}/lecturers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: 'Raymond',
          lastName: 'Bimazubute',
          email: 'jane.smith@example.com'
        })
      }).then(response => response.json());

      // Beispiel-Studiengänge
      const studyProgram1 = await fetch(`${apiUrl}/studyprograms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Informatik',
          shortName: 'INF'
        })
      }).then(response => response.json());

      const studyProgram2 = await fetch(`${apiUrl}/studyprograms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Wirtschaftsinformatik',
          shortName: 'WINF'
        })
      }).then(response => response.json());

      // Beispiel-Vorlesungen
      const lecture1 = await fetch(`${apiUrl}/lectures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lectureName: 'Datenbanken',
          duration: 120,
          modulName: 'DB'
        })
      }).then(response => response.json());

      const lecture2 = await fetch(`${apiUrl}/lectures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lectureName: 'Datenbanken',
          duration: 120,
          modulName: 'DB'
        })
      }).then(response => response.json());

      const lecture3 = await fetch(`${apiUrl}/lectures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lectureName: 'Datenbanken',
          duration: 120,
          modulName: 'DB'
        })
      }).then(response => response.json());

      // Beispiel-Vorlesungstermine
      const lectureDate1 = await fetch(`${apiUrl}/lecture-dates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: '2024-01-01T10:00:00',
          endDate: '2024-01-01T12:00:00'
        })
      }).then(response => response.json());

      const lectureDate2 = await fetch(`${apiUrl}/lecture-dates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: '2024-01-02T14:00:00',
          endDate: '2024-01-02T16:00:00'
        })
      }).then(response => response.json());

      console.log('Seed data loaded successfully');
      
      // Seite neu laden
      window.location.reload();

    } catch (error) {
      console.error('Error loading seed data:', error);
    }
  };

  return (
    <aside className="sidebar bg-body d-flex flex-column justify-content-between pt-3 ms-3" style={{ height: '90vh' }}>
      <ul className="nav sidebar-list align-items-start text-start mb-auto">
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
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnDozenten")}
            to="./lecturers"
            className="nav-link"
            id="btnDozenten"
          >
            <i className="fs-6 bi-people sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Dozenten</span>
          </Link>
        </li>
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
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnLectureDates")}
            to="./lecture-dates"
            className="nav-link"
            id="btnLectureDates"
          >
            <i className="fs-6 bi-calendar sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Vorlesungstermine</span>
          </Link>
        </li>
      </ul>
      <div className="settings">
        <hr />
        <div>
          <a href="#" className="nav-link" id="btnLoadSampleData" onClick={seedData}>
            <i className="bi bi-tools sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Beispieldaten laden</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default SidebarComponent;