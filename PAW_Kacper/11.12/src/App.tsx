import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Categories from './pages/Categories';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
