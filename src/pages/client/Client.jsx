import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGeneral } from '../../context/GeneralContext';

const Client = () => {
  const { state } = useGeneral();

  if (!state.user || state.user.role !== 'client') {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger">Access Denied. Client privileges required.</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Client Dashboard</h2>
      <p>Welcome back, {state.user.name}!</p>
      
      <Row className="mt-4">
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Post New Project</Card.Title>
              <Card.Text>
                Create a new project and find talented freelancers
              </Card.Text>
              <Link to="/client/new-project" className="btn btn-primary">
                Post Project
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>My Projects</Card.Title>
              <Card.Text>
                View and manage your posted projects
              </Card.Text>
              <Link to="/client/projects" className="btn btn-primary">
                View Projects
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Project Applications</Card.Title>
              <Card.Text>
                Review applications for your projects
              </Card.Text>
              <Link to="/client/applications" className="btn btn-primary">
                View Applications
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Client;