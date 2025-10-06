import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGeneral } from '../../context/GeneralContext';

const Admin = () => {
  const { state } = useGeneral();

  if (!state.user || state.user.role !== 'admin') {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger">Access Denied. Admin privileges required.</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      <Row className="mt-4">
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Users Management</Card.Title>
              <Card.Text>
                Manage all users, clients, and freelancers
              </Card.Text>
              <Link to="/admin/users" className="btn btn-primary">
                Manage Users
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Projects</Card.Title>
              <Card.Text>
                View and manage all projects
              </Card.Text>
              <Link to="/admin/projects" className="btn btn-primary">
                View Projects
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Applications</Card.Title>
              <Card.Text>
                Monitor all project applications
              </Card.Text>
              <Link to="/admin/applications" className="btn btn-primary">
                View Applications
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;