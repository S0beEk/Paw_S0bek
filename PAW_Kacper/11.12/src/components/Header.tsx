import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/categories">Categories</Link>
            </nav>
        </header>
    );
};

export default Header;
