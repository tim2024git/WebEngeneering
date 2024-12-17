import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteLectureDate, fetchLectureDates, activateSidebarLink } from './LectureDateService';

function LectureDateList() {
    const [lectureDates, setLectureDates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        findAll();
        activateSidebarLink("btnLectureDates");
    }, []);

    async function findAll() {
        try {
            const responseJson = await fetchLectureDates();
            setLectureDates(responseJson);
        } catch (error) {
            console.error(error.message);
        }
    }

    function addLectureDate() {
        navigate('/admin/add-lecture-date');
    }

    function editLectureDate(id) {
        let url = `/admin/edit-lecture-date/${id}`;
        navigate(url);
    }

    async function deleteLectureDateById(id) {
        const response = await deleteLectureDate(id);
        findAll();
    }

    return (
        <main className='content'>
            <div id="content" className="px-4 mx-auto table-responsive">
                <div className="contentwrapper d-flex flex-column">
                    <div className="bar d-flex justify-content-between mb-3 flex-row">
                        <h2 id="contentTitle">Vorlesungstermine</h2>
                        <button onClick={addLectureDate} className="btn btn-primary" type="submit" id="btnTopAction">+ Hinzufügen</button>
                    </div>
                    <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
                        <div className="d-flex text-muted">
                            <table className='table table-hover table-responsive table-alignment'>
                                <thead>
                                    <tr>
                                        <th>Startdatum</th>
                                        <th>Enddatum</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lectureDates.map(lectureDate =>
                                            <tr key={lectureDate.id}>
                                                <td>{lectureDate.startDate}</td>
                                                <td>{lectureDate.endDate}</td>
                                                <td className='right-align-content'>
                                                    <button onClick={() => editLectureDate(lectureDate.id)} className='btn btn-primary btn-small'> <span><i className='bi bi-pen'></i> Edit</span></button>
                                                    <button onClick={() => deleteLectureDateById(lectureDate.id)} className='btn btn-primary btn-small ms-2'> <span><i className='bi bi-trash'></i> Delete</span></button>
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

export default LectureDateList;