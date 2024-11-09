import React, { useState, useEffect } from 'react';
import Glog from './components/Glog';
import CreatePost from './components/CreatePost';
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
    <>
      <div>
        <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253 288.98" fill="white" width="48px">
          <g id="Layer_1-2" data-name="Layer 1">
            <polygon points="253 81.14 253 219.71 229 233.56 229 122.71 205.01 136.56 205 136.56 205 136.57 181 150.42 157 164.28 157 247.41 181 233.56 181 178.13 205 164.28 205 247.42 181.01 261.27 181 261.27 157 275.13 133.01 288.98 133 288.98 133 150.42 181 122.7 205 108.85 229 94.99 253 81.14"/>
            <polygon points="24 205.84 48 219.7 72 233.55 72 233.56 72.01 233.56 96 247.41 96 219.7 72 205.85 72 205.84 48 191.99 48 164.27 72 178.13 72.01 178.13 96 191.98 96 191.99 120 205.84 120 288.98 96 275.13 72 261.27 48 247.42 0 219.7 0 81.14 24 95 47.99 108.85 48 108.85 72 122.71 95.99 136.56 96 136.56 96 136.57 120 150.42 120 178.13 96 164.28 72 150.42 48 136.56 24 122.71 24 205.84"/>
            <polygon points="246 69.28 222.01 83.14 222 83.14 198 97 174 110.85 150 124.71 126 138.56 102 124.71 102 124.7 78 110.85 54 96.99 30 83.14 6 69.28 30 55.43 54 41.57 54.01 41.57 78 27.72 78 27.71 102 13.86 102.01 13.86 126 0 150 13.86 126 27.71 102 41.57 78 55.42 54 69.28 77.99 83.14 78 83.14 102 96.99 102 97 125.99 110.85 126 110.85 150 96.99 174 83.14 174 83.13 198 69.28 174.01 55.42 174 55.42 174 55.43 150 69.28 126 83.14 102 69.28 125.99 55.42 126 55.42 150 41.57 150 41.56 174 27.71 198 41.57 222 55.42 222 55.43 246 69.28"/>
          </g>
        </svg>
        <h1>Hi, I'm Gavin Picard</h1>
        <p>Here is a placeholder for what will eventually be my bio</p>
        <div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
        <CreatePost />
        <Glog />
      </div>
    </>
  )
}

export default App
