import ReactDOM from 'react-dom/client';
import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AISearch from './pages/AISearch.tsx';
import About from './pages/About.tsx';
import Search from './pages/Search.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
)
