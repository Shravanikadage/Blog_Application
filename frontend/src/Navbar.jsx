// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";  // Import custom CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
      <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link> {/* Link to Home Page */}
        </li>
        <li className="navbar-item">
          <Link to="/post-list" className="navbar-link">My Blog</Link>
        </li>
        <li className="navbar-item">
          <Link to="/add-post" className="navbar-link">Add Blog</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
