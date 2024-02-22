import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar'; // Sidebar 컴포넌트를 임포트합니다.
import Container from './components/container';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/container/:id" element={<Container />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
