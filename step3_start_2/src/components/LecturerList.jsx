import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteLecturer, fetchLecturers, activateSidebarLink } from './LecturerService';

function LecturerList() {
    const [lecturers, setLecturers] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        findAll();
        activateSidebarLink("btnLecturers");
    }, []);

    async function findAll() {
        try {
            const responseJson = await fetchLecturers();
            setLecturers(responseJson);
        } catch (error) {
            console.error(error.message);
        }
    }

    function addLecturer() {
        navigator('/admin/add-lecturers');
    }

    function editLecturer(id) {
        let url = `/admin/edit-lecturers/${id}`;
        navigator(url);
    }

    async function deleteLecturerById(id) {
        const response = await deleteLecturer(id);
        findAll();
    }

    return (
        <main className='content'>
            <div id="content" className="px-4 mx-auto table-responsive">
                <div className="contentwrapper d-flex flex-column">
                    <div className="bar d-flex justify-content-between mb-3 flex-row">
                        <h2 id="contentTitle">Dozenten</h2>
                        <button onClick={addLecturer} className="btn btn-primary" type="submit" id="btnTopAction">+ Hinzufügen</button>
                    </div>
                    <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
                        <div className="d-flex text-muted">
                            <table className='table table-hover table-responsive table-alignment'>
                                <thead>
                                    <tr>
                                        <th>Nachname</th>
                                        <th>Vorname</th>
                                        <th>Email</th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lecturers.map(lecturer =>
                                            <tr key={lecturer.id}>
                                                <td>{lecturer.lastName}</td>
                                                <td>{lecturer.firstName}</td>
                                                <td>{lecturer.email}</td>
                                                
                                                <td className='right-align-content'>
                                                    <button onClick={() => editLecturer(lecturer.id)} className='btn btn-primary btn-small'> <span><i className='bi bi-pen'></i> Edit</span></button>
                                                    <button onClick={() => deleteLecturerById(lecturer.id)} className='btn btn-primary btn-small ms-2'> <span><i className='bi bi-trash'></i> Delete</span></button>
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

export default LecturerList;