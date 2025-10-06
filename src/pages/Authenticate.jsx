import React, { useState } from 'react';
import { Container, Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import Login from '../components/Login';
import Register from '../components/Register';
import './Authenticate.css';

const Authenticate = () => {
  const [key, setKey] = useState('login');

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
      </div>
      
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={5} md={7}>
            <Card className="auth-card">
              <Card.Body className="p-5">
                <div className="auth-header text-center mb-4">
                  <div className="auth-logo">
                    <span className="logo-icon">💼</span>
                    <span className="logo-text">FreelancePro</span>
                  </div>
                  <p className="auth-subtitle">Welcome back! Please enter your details.</p>
                </div>
                
                <Tabs 
                  activeKey={key} 
                  onSelect={(k) => setKey(k)} 
                  className="auth-tabs mb-4"
                  justify
                >
                  <Tab eventKey="login" title={
                    <div className="tab-title">
                      <span className="tab-icon">🔐</span>
                      Sign In
                    </div>
                  }>
                    <Login onSwitchToRegister={() => setKey('register')} />
                  </Tab>
                  <Tab eventKey="register" title={
                    <div className="tab-title">
                      <span className="tab-icon">✨</span>
                      Sign Up
                    </div>
                  }>
                    <Register onSwitchToLogin={() => setKey('login')} />
                  </Tab>
                </Tabs>
                
                <div className="auth-divider">
                  <span>or continue with</span>
                </div>
                
                <div className="social-auth">
                  <button className="social-btn google-btn">
                    <span className="social-icon">🔍</span>
                    Google
                  </button>
                  <button className="social-btn github-btn">
                    <span className="social-icon">💻</span>
                    GitHub
                  </button>
                </div>
              </Card.Body>
            </Card>
            
            <div className="auth-footer text-center mt-4">
              <p>
                By continuing, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Authenticate;