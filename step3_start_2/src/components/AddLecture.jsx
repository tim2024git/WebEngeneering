import React, { useState } from 'react';
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from 'react-router-dom';

function AddLecture() {
  const [lecture, setLecture] = useState({
    id: null,
    lectureName: '',
    modulName: '',
    duration: '',
    lectureDates: [],
    lecturers: [],
    studyProgram: null
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecture((prevLecture) => ({
      ...prevLecture,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log('Sending data:', JSON.stringify(lecture));
      const response = await fetch('http://localhost:9090/lectures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lecture)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fehler beim Hinzufügen der Vorlesung');
      }

      const data = await response.json();
      setSuccess('Vorlesung erfolgreich hinzugefügt!');
      console.log(data);

      // Nach einer kurzen Verzögerung den Benutzer zur Admin-Seite weiterleiten
      setTimeout(() => {
        navigate('/admin/lectures');
      }, 1000);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5 pt-5">
        <h1 className="mt-5">Vorlesung hinzufügen</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="lectureName" className="form-label">Vorlesungsname</label>
            <input
              type="text"
              className="form-control"
              id="lectureName"
              name="lectureName"
              value={lecture.lectureName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="modulName" className="form-label">Kürzel</label>
            <input
              type="text"
              className="form-control"
              id="modulName"
              name="modulName"
              value={lecture.modulName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Zeit in min</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              value={lecture.duration}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Hinzufügen</button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </div>
    </div>
  );
}

export default AddLecture;