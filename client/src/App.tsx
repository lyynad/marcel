import './App.css'

import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import About from './pages/About';
import BookPage from './pages/BookPage';

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
          <Route path="/book/:id" element={<BookPage />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  )
}

export default App
