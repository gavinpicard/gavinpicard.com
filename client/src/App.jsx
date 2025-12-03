import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Glog from './components/Glog';
import BlogPost from './components/BlogPost';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './components/AdminLogin';
import './App.css';

function App() {

  return (
    <div className="flex flex-col min-h-screen relative">
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/glog" element={<Glog />} />
            <Route path="/glog/:id" element={<BlogPost />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App
