import React, { useState } from 'react';
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from 'react-router-dom';

function AddLecturer() {
  const [lecturer, setLecturer] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecturer((prevLecturer) => ({
      ...prevLecturer,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log('Sending data:', JSON.stringify(lecturer));
      const response = await fetch('http://localhost:9090/lecturers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lecturer)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fehler beim Hinzufügen des Dozenten');
      }

      const data = await response.json();
      setSuccess('Dozent erfolgreich hinzugefügt!');
      console.log(data);

      // Nach einer kurzen Verzögerung den Benutzer zur Admin-Seite weiterleiten
      setTimeout(() => {
        navigate('/admin/lecturers');
      }, 1000);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5 pt-5">
        <h1 className="mt-5">Add Lecturer</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={lecturer.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={lecturer.lastName}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={lecturer.department}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Lecturer</button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </div>
    </div>
  );
}

export default AddLecturer;