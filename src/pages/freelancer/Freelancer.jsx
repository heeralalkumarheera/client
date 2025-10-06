import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGeneral } from '../../context/GeneralContext';

const Freelancer = () => {
  const { state } = useGeneral();

  if (!state.user || state.user.role !== 'freelancer') {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger">Access Denied. Freelancer privileges required.</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Freelancer Dashboard</h2>
      <p>Welcome back, {state.user.name}!</p>
      
      <Row className="mt-4">
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Browse Projects</Card.Title>
              <Card.Text>
                Find new projects that match your skills
              </Card.Text>
              <Link to="/freelancer/projects" className="btn btn-primary">
                Browse Projects
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>My Applications</Card.Title>
              <Card.Text>
                Track your project applications
              </Card.Text>
              <Link to="/freelancer/applications" className="btn btn-primary">
                View Applications
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>My Projects</Card.Title>
              <Card.Text>
                View your ongoing and completed projects
              </Card.Text>
              <Link to="/freelancer/my-projects" className="btn btn-primary">
                View Projects
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Freelancer;