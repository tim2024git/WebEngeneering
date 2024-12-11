import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteStudyClass, fetchStudyClasses, activateSidebarLink } from './StudyClassService';

function StudyClassList() {
    const [studyClasses, setStudyClasses] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        findAll();
        activateSidebarLink("btnStudyClasses");
    }, []);

    async function findAll() {
        try {
            const responseJson = await fetchStudyClasses();
            setStudyClasses(responseJson);
        } catch (error) {
            console.error(error.message);
        }
    }

    function addStudyClass() {
        navigator('/admin/add-studyclass');
    }

    function editStudyClass(id) {
        let url = `/admin/edit-studyclass/${id}`;
        navigator(url);
    }

    async function deleteStudyClassById(id) {
        const response = await deleteStudyClass(id);
        findAll();
    }

    return (
        <main className='content'>
            <div id="content" className="px-4 mx-auto table-responsive">
                <div className="contentwrapper d-flex flex-column">
                    <div className="bar d-flex justify-content-between mb-3 flex-row">
                        <h2 id="contentTitle">Studienklassen</h2>
                        <button onClick={addStudyClass} className="btn btn-primary" type="submit" id="btnTopAction">+ Hinzufügen</button>
                    </div>
                    <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
                        <div className="d-flex text-muted">
                            <table className='table table-hover table-responsive table-alignment'>
                                <thead>
                                    <tr>
                                        <th>Kurs Name</th>
                                        <th>Beschreibung</th>
                                        <th>Dozent</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studyClasses.map(studyClass =>
                                            <tr key={studyClass.id}>
                                                <td>{studyClass.className}</td>
                                                <td>{studyClass.description}</td>
                                                <td>{studyClass.lecturerName}</td>
                                                <td className='right-align-content'>
                                                    <button onClick={() => editStudyClass(studyClass.id)} className='btn btn-primary btn-small'> <span><i className='bi bi-pen'></i> Edit</span></button>
                                                    <button onClick={() => deleteStudyClassById(studyClass.id)} className='btn btn-primary btn-small ms-2'> <span><i className='bi bi-trash'></i> Delete</span></button>
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

export default StudyClassList;