import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeView from './components/HomeView';
import AdminView from './components/AdminView';

import StudyProgramList from './components/StudyProgramList';
import LectureList from './components/LectureList';
import LecturerList from './components/LecturerList';
import LectureDateList from './components/LectureDateList';
import StudyClassList from './components/StudyClassList';

import AddLecture from './components/AddLecture';
import AddStudyProgram from './components/AddStudyProgram';
import AddLectureDate from './components/AddLectureDate';
import AddLecturer from './components/AddLecturer';

import EditStudyProgram from './components/EditStudyProgramm';
import EditLecture from './components/EditLecture';
import EditLecturer from './components/EditLecturer';
import EditLectureDate from './components/EditLectureDate';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/admin" element={<AdminView />}>
          <Route index element={<Navigate to="studyprograms" />} />
          <Route path="studyprograms" element={<StudyProgramList />} />
          <Route path="lectures" element={<LectureList />} />
          <Route path="lecturers" element={<LecturerList />} />
          <Route path="lecture-dates" element={<LectureDateList />} />
          <Route path="studyclasses" element={<StudyClassList />} />

          <Route path="add-study-program" element={<AddStudyProgram />} />
          <Route path="add-lectures" element={<AddLecture />} />
          <Route path="add-lecture-date" element={<AddLectureDate />} />
          <Route path="add-lecturers" element={<AddLecturer />} />

          <Route path="/admin/edit-study-program/:id" element={<EditStudyProgram />} />
          <Route path="/admin/edit-lectures/:id" element={<EditLecture />} />
          <Route path="/admin/edit-lecturers/:id" element={<EditLecturer />} />
          <Route path="/admin/edit-lecture-date/:id" element={<EditLectureDate />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;