import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Strona Główna</Link></li>
                    <li><Link to="/about">O nas</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
};

export default App;
