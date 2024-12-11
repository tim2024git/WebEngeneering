# React-Anwendung mit Bootstrap 
 - Routes in BrowserRouter anpassen (App.js)

 ```
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeView from './components/HomeView';
import AdminView from './components/AdminView';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import StudyProgramList from './components/StuyProgramList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/admin" element={<AdminView />} >
          <Route index element={<StudyProgramList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

 ```
 - Komponente StudyProgramList im Verzeichnis Components realisieren

 ```
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteStudyProgram, fetchStudyPrograms, activateSidebarLink } from './StudyProgramService';


function StudyProgramList() {

    const [studyprograms, setStudyprograms] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        findAll();
        activateSidebarLink("btnStudiengaenge");
    }, []);

    async function findAll() {
        try {
            const responseJson = await fetchStudyPrograms();
            setStudyprograms(responseJson);
        } catch (error) {
            console.error(error.message);
        }
    }

    function addStudyProgram() {
        navigator('/admin/add-study-program');
    }
    function editStudyProgram(id) {
        console.log(id);
        let url = `/admin/edit-study-program/${id}`;
        console.log(url);
        navigator(`/admin/edit-study-program/${id}`);

    }
    async function deleteProgram(id) {
        console.log(id);
        const response = await deleteStudyProgram(id);
        findAll();


    }

    return (
        <main className='content'>
            <div id="content" className="px-4 mx-auto table-responsive">
                <div className="contentwrapper d-flex flex-column">
                    <div className="bar d-flex justify-content-between mb-3 flex-row">
                        <h2 id="contentTitle">Studiengänge</h2>
                        <button onClick={addStudyProgram} className="btn btn-primary" type="submit" id="btnTopAction">+ Hinzufügen</button>
                    </div>
                    <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
                        <div className="d-flex text-muted" >
                            <table className='table table-hover table-responsive table-alignment'>
                                <thead>
                                    <tr>
                                        <th>Abkürzung</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studyprograms.map(studyprogram =>
                                            <tr key={studyprogram.id}>
                                                <td>{studyprogram.name}</td>
                                                <td>{studyprogram.shortName}</td>
                                                <td className='right-align-content'>
                                                    <button onClick={() => editStudyProgram(studyprogram.id)} className='btn btn-primary btn-small'> <span><i className='bi bi-pen'></i> Edit</span></button>
                                                    <button onClick={() => deleteProgram(studyprogram.id)} className='btn btn-primary btn-small ms-2'> <span><i className='bi bi-trash'></i> Delete</span></button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default StudyProgramList;

 ```


- Komponente StudyProgramService.jsx realisieren

 ```
 

var apiUrlStudyPrograms = "http://localhost:9090/studyprograms";
async function fetchStudyPrograms() {
    const apiUrl = apiUrlStudyPrograms;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error: The status is ${response.status}`);
        }
        const studyPrograms = await response.json();
        return studyPrograms;
    } catch (error) {
        throw new Error(`Error fetching study programs: ${error.message}`);
    }
}
async function saveStudyProgram(studyProgram) {
    const apiUrl = apiUrlStudyPrograms;

    //let studyProgram ={name, shortName};
    console.log(studyProgram);
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studyProgram),
    });

    if (response.ok) {
        console.log("Studiengang erfolgreich erstellt!");
    } else {
        console.log("Fehler bei der Erstellung des Studiengangs Vorlesung!");
    }
}
async function fetchStudyProgram(id) {
    const apiUrl = apiUrlStudyPrograms + `/${id}`;
    console.log("api url =" + apiUrl);
    try {

        // Use the fetch API to make a GET request to the API endpoint
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        let responseJson = await response.json();
        return responseJson;

    }
    catch (err) {
        console.log(err.message);
    }

}
async function updateStudyProgram(id, studyProgram) {

    const apiUrl = apiUrlStudyPrograms + `/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studyProgram),
        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }

    }
    catch (err) {
        console.log(err.message);
    }
}
async function deleteStudyProgram(id) {
    console.log("studyprogram Id =" + id);
    const apiUrl = apiUrlStudyPrograms + `/${id}`;
    console.log(apiUrl);
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);

        }
    }
    catch (err) {
        console.log(err.message);
    }
}
function activateSidebarLink(id) {

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
export { activateSidebarLink }
export { deleteStudyProgram };
export { updateStudyProgram };
export { fetchStudyProgram };
export { fetchStudyPrograms };
export { saveStudyProgram };


```



 - Komponente SidebarComponent.jsx realisieren
 ```
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
            <i className="fs-4 bi-speedometer2 sidebar-icon"></i>
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
          <a href="#" className="nav-link" id="btnDozenten">
            <i className="fs-6 bi-people sidebar-icon"></i>
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
            <i className="fs-6 bi-grid sidebar-icon"></i>
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

export default SidebarComponent;

 ```


- Css-Styles anpassen:
# React-Anwendung mit Bootstrap 
 - Routes in BrowserRouter anpassen (App.js)

 ```
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeView from './components/HomeView';
import AdminView from './components/AdminView';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import StudyProgramList from './components/StuyProgramList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/admin" element={<AdminView />} >
          <Route index element={<StudyProgramList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

 ```
 - Komponente StudyProgramList im Verzeichnis Components realisieren

 ```
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteStudyProgram, fetchStudyPrograms, activateSidebarLink } from './StudyProgramService';


function StudyProgramList() {

    const [studyprograms, setStudyprograms] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        findAll();
        activateSidebarLink("btnStudiengaenge");
    }, []);

    async function findAll() {
        try {
            const responseJson = await fetchStudyPrograms();
            setStudyprograms(responseJson);
        } catch (error) {
            console.error(error.message);
        }
    }

    function addStudyProgram() {
        navigator('/admin/add-study-program');
    }
    function editStudyProgram(id) {
        console.log(id);
        let url = `/admin/edit-study-program/${id}`;
        console.log(url);
        navigator(`/admin/edit-study-program/${id}`);

    }
    async function deleteProgram(id) {
        console.log(id);
        const response = await deleteStudyProgram(id);
        findAll();


    }

    return (
        <main className='content'>
            <div id="content" className="px-4 mx-auto table-responsive">
                <div className="contentwrapper d-flex flex-column">
                    <div className="bar d-flex justify-content-between mb-3 flex-row">
                        <h2 id="contentTitle">Studiengänge</h2>
                        <button onClick={addStudyProgram} className="btn btn-primary" type="submit" id="btnTopAction">+ Hinzufügen</button>
                    </div>
                    <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
                        <div className="d-flex text-muted" >
                            <table className='table table-hover table-responsive table-alignment'>
                                <thead>
                                    <tr>
                                        <th>Abkürzung</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studyprograms.map(studyprogram =>
                                            <tr key={studyprogram.id}>
                                                <td>{studyprogram.name}</td>
                                                <td>{studyprogram.shortName}</td>
                                                <td className='right-align-content'>
                                                    <button onClick={() => editStudyProgram(studyprogram.id)} className='btn btn-primary btn-small'> <span><i className='bi bi-pen'></i> Edit</span></button>
                                                    <button onClick={() => deleteProgram(studyprogram.id)} className='btn btn-primary btn-small ms-2'> <span><i className='bi bi-trash'></i> Delete</span></button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default StudyProgramList;

 ```


- Komponente StudyProgramService.jsx realisieren

 ```
 

var apiUrlStudyPrograms = "http://localhost:9090/studyprograms";
async function fetchStudyPrograms() {
    const apiUrl = apiUrlStudyPrograms;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error: The status is ${response.status}`);
        }
        const studyPrograms = await response.json();
        return studyPrograms;
    } catch (error) {
        throw new Error(`Error fetching study programs: ${error.message}`);
    }
}
async function saveStudyProgram(studyProgram) {
    const apiUrl = apiUrlStudyPrograms;

    //let studyProgram ={name, shortName};
    console.log(studyProgram);
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studyProgram),
    });

    if (response.ok) {
        console.log("Studiengang erfolgreich erstellt!");
    } else {
        console.log("Fehler bei der Erstellung des Studiengangs Vorlesung!");
    }
}
async function fetchStudyProgram(id) {
    const apiUrl = apiUrlStudyPrograms + `/${id}`;
    console.log("api url =" + apiUrl);
    try {

        // Use the fetch API to make a GET request to the API endpoint
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        let responseJson = await response.json();
        return responseJson;

    }
    catch (err) {
        console.log(err.message);
    }

}
async function updateStudyProgram(id, studyProgram) {

    const apiUrl = apiUrlStudyPrograms + `/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studyProgram),
        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }

    }
    catch (err) {
        console.log(err.message);
    }
}
async function deleteStudyProgram(id) {
    console.log("studyprogram Id =" + id);
    const apiUrl = apiUrlStudyPrograms + `/${id}`;
    console.log(apiUrl);
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);

        }
    }
    catch (err) {
        console.log(err.message);
    }
}
function activateSidebarLink(id) {

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
export { activateSidebarLink }
export { deleteStudyProgram };
export { updateStudyProgram };
export { fetchStudyProgram };
export { fetchStudyPrograms };
export { saveStudyProgram };


```



 - Komponente SidebarComponent.jsx realisieren
 ```
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
            <i className="fs-4 bi-speedometer2 sidebar-icon"></i>
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
          <a href="#" className="nav-link" id="btnDozenten">
            <i className="fs-6 bi-people sidebar-icon"></i>
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
            <i className="fs-6 bi-grid sidebar-icon"></i>
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

 ```

 - Komponente Footer realisieren

 ```
 

import React from 'react';

function Footer() {
  return (
    <footer className="footer">
    </footer>
  );
}

export default Footer;



```


- Css-Styles anpassen:
 ```

#root {

  margin: 0 auto;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}



:root {
  --primary-color: rgb(38, 34, 98);
  --secondary-color: rgb(201, 32, 139);
  --secondary-hover-color: rgb(206, 147, 216);
  --light-grey: rgb(241, 243, 243);
  --darker-grey: rgb(212, 218, 218);
}

.navbar-custom {
  background-color: var(--primary-color) !important;
}

.bg-navbar-bg-color {
  background-color: var(--primary-color) !important;
}

/* style for the sidebar and footer*/

.sidebar .nav-link {
  display: block;
  padding: .5rem 1rem;
  color: var(--primary-color);
  text-decoration: none;

}

.sidebar-icon {
  color: rgb(201, 32, 139);
  font-size: 1rem;
}

.sidebar-list {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.nav-item {
  width: 100%;

}

.nav-link {
  display: flex;
  /* Ensures icons and text align properly */
  align-items: center;
  
}




/* style for the sidebar and footer*/

.sidebar {
  width: 280px;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  display: flex;
  flex-direction: column;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  color: #000133;
}

.content-container {

  display: flex;
  flex-direction: row;
  flex: 1;
  min-width: 100%;
  padding-top: 1.5rem;

}

.footer {
  width: 100%;
  height: 4rem;
  background-color: var(--primary-color);
}

main {
  flex-grow: 1;
  background: #f7f5f5;
  padding-top: 1.5rem;

}

.table-alignment th,
.table-alignment td {
  text-align: left;
  vertical-align: middle;
}
.table-alignment td:last-child {
  text-align: right;
}


/* Button */
.btn-primary,
.btn-primary:focus {
  color: white !important;
  background-color: var(--secondary-color) !important;
  border: 1px solid var(--secondary-color) !important;
  font-weight: bolder !important;
}

/* Header color */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--primary-color) !important;
}






@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
 ```
 
    
 
    