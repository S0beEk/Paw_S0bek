import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Blog</h1>
            <div className="post-list">
                <div className="post">
                    <h2>Post Title 1</h2>
                    <p>Post preview...</p>
                    <Link to="/post/1">Read More</Link>
                </div>
                <div className="post">
                    <h2>Post Title 2</h2>
                    <p>Post preview...</p>
                    <Link to="/post/2">Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
