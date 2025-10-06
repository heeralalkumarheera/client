import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGeneral } from '../context/GeneralContext';
import './Navbar.css';

const NavigationBar = () => {
  const { state, dispatch } = useGeneral();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        {/* Brand - Left Side */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <span className="brand-icon">💼</span>
          FreelancePro
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom">
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Main Navigation - Center */}
          <Nav className="mx-auto main-navigation">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Nav.Link>
            
            {/* Conditional Links based on User Role */}
            {state.user ? (
              <>
                {state.user.role === 'client' && (
                  <>
                    <Nav.Link 
                      as={Link} 
                      to="/client"
                      className={location.pathname.startsWith('/client') ? 'nav-link active' : 'nav-link'}
                    >
                      Dashboard
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/client/new-project"
                      className={location.pathname === '/client/new-project' ? 'nav-link active' : 'nav-link'}
                    >
                      New Project
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/client/projects"
                      className={location.pathname === '/client/projects' ? 'nav-link active' : 'nav-link'}
                    >
                      My Projects
                    </Nav.Link>
                  </>
                )}
                
                {state.user.role === 'freelancer' && (
                  <>
                    <Nav.Link 
                      as={Link} 
                      to="/freelancer"
                      className={location.pathname.startsWith('/freelancer') ? 'nav-link active' : 'nav-link'}
                    >
                      Dashboard
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/freelancer/projects"
                      className={location.pathname === '/freelancer/projects' ? 'nav-link active' : 'nav-link'}
                    >
                      Find Work
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/freelancer/applications"
                      className={location.pathname === '/freelancer/applications' ? 'nav-link active' : 'nav-link'}
                    >
                      My Applications
                    </Nav.Link>
                  </>
                )}
                
                {state.user.role === 'admin' && (
                  <>
                    <Nav.Link 
                      as={Link} 
                      to="/admin"
                      className={location.pathname.startsWith('/admin') ? 'nav-link active' : 'nav-link'}
                    >
                      Dashboard
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/admin/users"
                      className={location.pathname === '/admin/users' ? 'nav-link active' : 'nav-link'}
                    >
                      Users
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/admin/projects"
                      className={location.pathname === '/admin/projects' ? 'nav-link active' : 'nav-link'}
                    >
                      Projects
                    </Nav.Link>
                  </>
                )}
              </>
            ) : (
              // Public navigation for non-logged in users
              <>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#how-it-works">How It Works</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </>
            )}
          </Nav>

          {/* User Actions - Right Side */}
          <Nav className="navbar-actions">
            {state.user ? (
              <div className="user-section">
                <NavDropdown 
                  title={
                    <div className="user-menu">
                      <div className="user-avatar">
                        {state.user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="user-name">{state.user.name}</span>
                    </div>
                  } 
                  id="user-dropdown"
                  align="end"
                  className="user-dropdown"
                >
                  <div className="dropdown-header">
                    <strong>Welcome back!</strong>
                    <small>{state.user.email}</small>
                  </div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-custom">
                    <span className="dropdown-icon">👤</span>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings" className="dropdown-item-custom">
                    <span className="dropdown-icon">⚙️</span>
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="dropdown-item-custom logout-item">
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <div className="auth-buttons">
                <Button 
                  as={Link} 
                  to="/auth" 
                  variant="outline-primary" 
                  className="login-btn"
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  to="/auth" 
                  variant="primary" 
                  className="signup-btn"
                >
                  Get Started Now
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;