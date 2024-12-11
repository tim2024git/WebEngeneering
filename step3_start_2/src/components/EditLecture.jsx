import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLecture, updateLecture } from './LectureService';

function EditLecture() {
    const { id } = useParams();
    const [lecture, setLecture] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchLecture(id);
                setLecture(response);
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
        setLecture({ ...lecture, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateLecture(id, lecture);
            navigator('/admin/lectures'); // Zurück zur Vorlesungsliste
        } catch (error) {
            console.error('Fehler beim Aktualisieren der Vorlesung:', error);
        }
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Vorlesung bearbeiten</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="lectureName" className="form-label">Vorlesungsname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lectureName"
                        name="lectureName"
                        value={lecture.lectureName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="modulName" className="form-label">Modulname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="modulName"
                        name="modulName"
                        value={lecture.modulName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Dauer</label>
                    <input
                        type="text"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={lecture.duration}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Speichern</button>
            </form>
        </div>
    );
}

export default EditLecture;