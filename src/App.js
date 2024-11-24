import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import FaceRegister from './components/FaceRegister';
import FaceLogin from './components/FaceLogin';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/register" element={<FaceRegister/>} />
        <Route path="/login" element={<FaceLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
