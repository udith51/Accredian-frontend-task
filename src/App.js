import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  const [authState, setAuthState] = useState("signup");
  return (
    <div className="App">
      <div className="area" >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
      <div className='context'>
        <Routes>
          <Route path="/home" element={<Home setAuthState={setAuthState} />} />
          <Route path="/" element={<Auth authState={authState} setAuthState={setAuthState} />} />


        </Routes>
      </div>
    </div>
  );
}

export default App;
