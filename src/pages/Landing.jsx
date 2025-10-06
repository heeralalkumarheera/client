import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGeneral } from '../context/GeneralContext';
import './Landing.css';

const Landing = () => {
  const { state } = useGeneral();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '🚀',
      title: 'Quick Hiring',
      description: 'Find and hire top freelancers in minutes, not weeks.',
      color: '#667eea'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Pay safely with our escrow system. Only release funds when satisfied.',
      color: '#f093fb'
    },
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Track project progress and communicate in real-time.',
      color: '#4facfe'
    },
    {
      icon: '⭐',
      title: 'Quality Work',
      description: 'Get high-quality deliverables from vetted professionals.',
      color: '#43e97b'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Projects Completed', icon: '✅' },
    { number: '5K+', label: 'Freelancers', icon: '👨‍💻' },
    { number: '2K+', label: 'Happy Clients', icon: '😊' },
    { number: '98%', label: 'Success Rate', icon: '📈' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      content: 'This platform revolutionized how we find talent. Projects get completed 50% faster!',
      avatar: 'SJ'
    },
    {
      name: 'Mike Chen',
      role: 'Full Stack Developer',
      company: 'Freelancer',
      content: 'I doubled my income in 3 months. The quality of projects here is outstanding.',
      avatar: 'MC'
    },
    {
      name: 'Emily Davis',
      role: 'Startup Founder',
      company: 'InnovateLab',
      content: 'As a startup, this platform gave us access to world-class talent we could never afford full-time.',
      avatar: 'ED'
    }
  ];

  return (
    <div className={`landing-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <Badge bg="light" text="dark" className="hero-badge mb-4">
                🎉 Trusted by 10,000+ companies worldwide
              </Badge>
              
              <h1 className="hero-title">
                Hire the Best 
                <span className="gradient-text"> Freelancers</span>
                <br />
                for Your Projects
              </h1>
              
              <p className="hero-subtitle">
                Connect with top-tier talent across the globe. From web development to graphic design, 
                find the perfect match for your business needs. Fast, secure, and reliable.
              </p>

              <div className="hero-buttons">
                {!state.user ? (
                  <>
                    <Link to="/auth">
                      <Button className="hero-btn primary">
                        <span>Get Started Free</span>
                        <div className="btn-background"></div>
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button className="hero-btn secondary">
                        Watch Demo 🎬
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="welcome-section">
                    <h3>Welcome back, {state.user.name}! 🎉</h3>
                    <p>Ready to {state.user.role === 'client' ? 'create amazing projects' : 'find your next opportunity'}?</p>
                    <Link to={`/${state.user.role}`}>
                      <Button className="hero-btn primary">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <strong>24/7</strong>
                  <span>Support</span>
                </div>
                <div className="stat-item">
                  <strong>100%</strong>
                  <span>Secure</span>
                </div>
                <div className="stat-item">
                  <strong>5★</strong>
                  <span>Rated</span>
                </div>
              </div>
            </Col>
            
            <Col lg={6} className="hero-visual">
              <div className="floating-cards">
                <div className="card card-1">
                  <div className="card-header">
                    <div className="card-avatar">WD</div>
                    <div className="card-info">
                      <h6>Web Development</h6>
                      <span>25+ proposals</span>
                    </div>
                  </div>
                  <div className="card-budget">$2,500</div>
                </div>
                
                <div className="card card-2">
                  <div className="card-header">
                    <div className="card-avatar">GD</div>
                    <div className="card-info">
                      <h6>Logo Design</h6>
                      <span>15+ proposals</span>
                    </div>
                  </div>
                  <div className="card-budget">$800</div>
                </div>
                
                <div className="card card-3">
                  <div className="card-header">
                    <div className="card-avatar">MA</div>
                    <div className="card-info">
                      <h6>Marketing</h6>
                      <span>30+ proposals</span>
                    </div>
                  </div>
                  <div className="card-budget">$1,200</div>
                </div>
                
                <div className="floating-element element-1">💼</div>
                <div className="floating-element element-2">🚀</div>
                <div className="floating-element element-3">⭐</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} className="stat-col">
                <div className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <Container>
          <Row className="text-center section-header">
            <Col lg={8} className="mx-auto">
              <h2 className="section-title">Why Choose FreelancePro?</h2>
              <p className="section-subtitle">
                Everything you need to succeed in the modern freelance economy
              </p>
            </Col>
          </Row>
          
          <Row className="features-grid">
            {features.map((feature, index) => (
              <Col lg={3} md={6} key={index} className="feature-col">
                <Card className="feature-card">
                  <Card.Body>
                    <div 
                      className="feature-icon-wrapper"
                      style={{ '--feature-color': feature.color }}
                    >
                      <span className="feature-icon">{feature.icon}</span>
                    </div>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <Container>
          <Row className="text-center section-header">
            <Col lg={8} className="mx-auto">
              <h2 className="section-title">What Our Users Say</h2>
              <p className="section-subtitle">
                Don't just take our word for it
              </p>
            </Col>
          </Row>
          
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col lg={4} md={6} key={index} className="testimonial-col">
                <Card className="testimonial-card">
                  <Card.Body>
                    <div className="testimonial-content">
                      "{testimonial.content}"
                    </div>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        {testimonial.avatar}
                      </div>
                      <div className="author-info">
                        <strong>{testimonial.name}</strong>
                        <span>{testimonial.role} · {testimonial.company}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="cta-title">Ready to Transform Your Business?</h2>
              <p className="cta-subtitle">
                Join thousands of successful companies and freelancers who are already growing with FreelancePro.
              </p>
              {!state.user && (
                <Link to="/auth">
                  <Button className="cta-btn">
                    Start Your Free Trial Today
                  </Button>
                </Link>
              )}
              <div className="cta-stats">
                <div className="cta-stat">
                  <strong>No credit card required</strong>
                </div>
                <div className="cta-stat">
                  <strong>Free 14-day trial</strong>
                </div>
                <div className="cta-stat">
                  <strong>Cancel anytime</strong>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="footer-brand">
                <span className="brand-icon">💼</span>
                FreelancePro
              </div>
              <p className="footer-text">
                Connecting talent with opportunity since 2024.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="footer-links">
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
                <a href="#contact">Contact</a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Landing;