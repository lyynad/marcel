import './App.css'

import { Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import About from './pages/About';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <div className="app-container">
      <Header />
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  )
}

export default App
