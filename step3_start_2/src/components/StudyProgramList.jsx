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