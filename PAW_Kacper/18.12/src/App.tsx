import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
