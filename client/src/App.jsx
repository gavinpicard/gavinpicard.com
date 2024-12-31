import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import Glog from './components/Glog';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/glog" element={<Glog />} />
      </Routes>
    </Router>
  )
}

export default App
