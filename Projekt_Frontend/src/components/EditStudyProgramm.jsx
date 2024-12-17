import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStudyProgram, updateStudyProgram } from './StudyProgramService';

function EditStudyProgram() {
    const { id } = useParams();
    const [studyProgram, setStudyProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchStudyProgram(id);
                setStudyProgram(response);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudyProgram({ ...studyProgram, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStudyProgram(id, studyProgram);
            navigator('/admin/studyprograms'); // Zurück zur Studiengangsliste
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Studienprogramms:', error);
        }
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Studiengang bearbeiten</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="shortName" className="form-label">Abkürzung</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shortName"
                        name="shortName"
                        value={studyProgram.shortName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={studyProgram.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Speichern</button>
            </form>
        </div>
    );
}

export default EditStudyProgram;