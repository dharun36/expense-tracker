import React from 'react';  
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './RecentTra.css';
import TableData from './TableData';
function Header() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
  
    // Check for logged-in user
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }, []);
  
    const handleLogin = () => navigate('/login');
    const handleLogout = () => {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    };
  
  return (
    
    <header>
    <a href="#" className="logo" aria-label="Dashboard home link">
        <i className="fas fa-th-large" aria-hidden="true"></i>
        <Link to = "/home">Expense Tracker</Link>
    </a>
    <Nav className="ms-auto">
    <nav>
    <Link to = "/"> Dashboard </Link>
      <Link to = "/recent"> Recent Transactions </Link>
      
      <Link to = "/analytics">Analytics  </Link>&nbsp;&nbsp;&nbsp;&nbsp;

    </nav>
      {user ? (
        <Button variant="outline-light" size="sm" onClick={handleLogout} className="me-2">
          <i className="bi bi-box-arrow-right me-1"></i>Logout
        </Button>
      ) : (
        <Button variant="outline-light" size="sm" onClick={handleLogin} className="me-2">
          <i className="bi bi-box-arrow-in-right me-1"></i>Login
        </Button>
      )}
    </Nav>
  </header>

  );
} 

export default Header;