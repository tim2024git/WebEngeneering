import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLecturer, updateLecturer } from './LecturerService';

function EditLecturer() {
    const { id } = useParams();
    const [lecturer, setLecturer] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchLecturer(id);
                setLecturer(response);
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
        setLecturer({ ...lecturer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateLecturer(id, lecturer);
            navigator('/admin/lecturers'); // Zurück zur Dozentenliste
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Dozenten:', error);
        }
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Dozent bearbeiten</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Vorname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={lecturer.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Nachname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={lecturer.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={lecturer.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Speichern</button>
            </form>
        </div>
    );
}

export default EditLecturer;