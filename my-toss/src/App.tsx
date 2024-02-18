import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar'; // Sidebar 컴포넌트를 임포트합니다.
import Container from './components/container';

function App() {
  return (
    <div className="App">
        <Sidebar />
        <Container />
    </div>
  );
}

export default App;
