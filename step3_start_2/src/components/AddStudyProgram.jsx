import React, { useState, useEffect } from 'react';
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from 'react-router-dom';

function AddStudyProgram() {
  const [studyProgram, setStudyProgram] = useState({
    id: null,
    name: '',
    shortName: '',
    lectures: [],      // Array von IDs für die ausgewählten Vorlesungen
    lecturers: []      // Array von IDs für die ausgewählten Dozenten
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [lecturesOptions, setLecturesOptions] = useState([]);
  const [lecturersOptions, setLecturersOptions] = useState([]);

  const navigate = useNavigate();

  // Abrufen der Optionen für Vorlesungen und Dozenten
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const lecturesResponse = await fetch('http://localhost:9090/lectures');
        const lecturesData = await lecturesResponse.json();
        setLecturesOptions(Array.isArray(lecturesData) ? lecturesData : []);

        const lecturersResponse = await fetch('http://localhost:9090/lecturers');
        const lecturersData = await lecturersResponse.json();
        setLecturersOptions(Array.isArray(lecturersData) ? lecturersData : []);
      } catch (err) {
        console.error('Fehler beim Abrufen der Optionen:', err);
      }
    };

    fetchOptions();
  }, []);

  // Hier werden nur die IDs gespeichert
  const handleChange = (e) => {
    const { name, options } = e.target;

    if (name === 'lectures' || name === 'lecturers') {
      const selectedIds = Array.from(options)
        .filter(option => option.selected)  // Alle ausgewählten Optionen
        .map(option => option.value);  // IDs der ausgewählten Optionen

      // IDs in den State setzen
      setStudyProgram(prevProgram => ({
        ...prevProgram,
        [name]: selectedIds
      }));
    } else {
      const { value } = e.target;
      setStudyProgram(prevProgram => ({
        ...prevProgram,
        [name]: value
      }));
    }
  };

  // Bei der Formularübermittlung werden die IDs durch Objekte ersetzt
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    console.log(lecturesOptions);
    console.log(studyProgram.lectures);
    

    // Objekte für lectures und lecturers anhand der IDs abrufen
    const lecturesWithObjects = studyProgram.lectures.map(id => 
      lecturesOptions.find(lecture => lecture.id + "" === id)
    );

    const lecturersWithObjects = studyProgram.lecturers.map(id => 
      lecturersOptions.find(lecturer => lecturer.id + "" === id)
    );

    const studyProgramWithObjects = {
      ...studyProgram,
      lectures: lecturesWithObjects,
      lecturers: lecturersWithObjects
    };

    try {
      console.log('Daten werden gesendet:', JSON.stringify(studyProgramWithObjects));
      const response = await fetch('http://localhost:9090/studyprograms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studyProgramWithObjects)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fehler beim Hinzufügen des Studienprogramms');
      }

      const data = await response.json();
      setSuccess('Studienprogramm erfolgreich hinzugefügt!');
      console.log(data);

      // Nach einer kurzen Verzögerung den Benutzer zur Admin-Seite weiterleiten
      setTimeout(() => {
        navigate('/admin/studyprograms');
      }, 1000);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5 pt-5">
        <h1 className="mt-5">Add Study Program</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={studyProgram.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shortName" className="form-label">Short Name</label>
            <input
              type="text"
              className="form-control"
              id="shortName"
              name="shortName"
              value={studyProgram.shortName}
              onChange={handleChange}
            />
          </div>

          {/* Dropdown für Vorlesungen */}
          <div className="mb-3">
            <label htmlFor="lectures" className="form-label">Select Lectures</label>
            <select
              className="form-control"
              id="lectures"
              name="lectures"
              value={studyProgram.lectures}
              onChange={handleChange}
            >
              <option value="">Select lectures</option>
              {lecturesOptions.map((lecture) => (
                <option key={lecture.id} value={lecture.id}>
                  {lecture.lectureName} {/* Anzeigen des Namens der Vorlesung */}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown für Dozenten */}
          <div className="mb-3">
            <label htmlFor="lecturers" className="form-label">Select Lecturers</label>
            <select
              className="form-control"
              id="lecturers"
              name="lecturers"
              value={studyProgram.lecturers}
              onChange={handleChange}
            >
              <option value="">Select lecturers</option>
              {lecturersOptions.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name} {/* Anzeigen des Namens des Dozenten */}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Add Study Program</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </div>
    </div>
  );
}

export default AddStudyProgram;