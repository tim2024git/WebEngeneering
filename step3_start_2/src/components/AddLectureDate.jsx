import React, { useState } from 'react';
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from 'react-router-dom';

function AddLectureDate() {
  const [lectureDate, setLectureDate] = useState({
    id: null,
    startDate: '',
    endDate: '',
    lecture: null, // Annahme: Hier wird die Vorlesung als Verweis verwendet
    location: '',
    studyProgram: null
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureDate((prevLectureDate) => ({
      ...prevLectureDate,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log('Sending data:', JSON.stringify(lectureDate));
      const response = await fetch('http://localhost:9090/lecture-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lectureDate)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fehler beim Hinzufügen des Vorlesungstermins');
      }

      const data = await response.json();
      setSuccess('Vorlesungstermin erfolgreich hinzugefügt!');
      console.log(data);

      // Nach einer kurzen Verzögerung den Benutzer zur Admin-Seite weiterleiten
      setTimeout(() => {
        navigate('/admin/lecture-dates');
      }, 1000);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5 pt-5">
        <h1 className="mt-5">Add Lecture Date</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="datetime-local"
              className="form-control"
              id="startDate"
              name="startDate"
              value={lectureDate.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="datetime-local"
              className="form-control"
              id="endDate"
              name="endDate"
              value={lectureDate.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={lectureDate.location}
              onChange={handleChange}
            />
          </div>
          {/* Optional: Hier könnte ein Dropdown für die Auswahl der Vorlesung sein */}
          <div className="mb-3">
            <label htmlFor="lecture" className="form-label">Select Lecture</label>
            <select
              className="form-control"
              id="lecture"
              name="lecture"
              value={lectureDate.lecture}
              onChange={handleChange}
            >
              <option value="">Select a lecture</option>
              {/* Dynamisch Vorlesungen hinzufügen, z.B. aus einer Liste */}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Lecture Date</button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </div>
    </div>
  );
}

export default AddLectureDate;