import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLectureDate, updateLectureDate } from './LectureDateService';

function EditLectureDate() {
    const { id } = useParams();
    const [lectureDate, setLectureDate] = useState({
        id: '',
        startDate: '',
        endDate: '',
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchLectureDate(id);
                setLectureDate(response);
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
        setLectureDate({ ...lectureDate, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateLectureDate(id, lectureDate);
            navigate('/admin/lecture-dates'); // Zurück zur Vorlesungsterminliste
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Vorlesungstermins:', error);
        }
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Vorlesungstermin bearbeiten</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Startdatum</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={lectureDate.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">Enddatum</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={lectureDate.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Speichern</button>
            </form>
        </div>
    );
}

export default EditLectureDate;