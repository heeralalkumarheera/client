import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { useGeneral } from '../../context/GeneralContext';

const ProjectApplications = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { state } = useGeneral();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects/my-projects', {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchApplications = async (projectId) => {
    try {
      const response = await fetch(`/api/applications/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      const data = await response.json();
      setApplications(data);
      setSelectedProject(projectId);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleApplicationAction = async (applicationId, action) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/${action}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });

      if (response.ok) {
        fetchApplications(selectedProject);
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Project Applications</h3>
      {projects.length === 0 ? (
        <Alert variant="info">You haven't posted any projects yet.</Alert>
      ) : (
        projects.map(project => (
          <Card key={project._id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{project.title}</h5>
                  <p className="mb-1">{project.description.substring(0, 100)}...</p>
                  <Badge bg="secondary">Budget: ${project.budget}</Badge>
                  <Badge bg="info" className="ms-2">{project.status}</Badge>
                </div>
                <Button
                  variant="primary"
                  onClick={() => fetchApplications(project._id)}
                >
                  View Applications
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Project Applications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {applications.length === 0 ? (
            <Alert variant="info">No applications yet.</Alert>
          ) : (
            applications.map(application => (
              <Card key={application._id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6>{application.freelancer?.name}</h6>
                      <p>{application.proposal}</p>
                      <Badge bg="secondary">Bid: ${application.bidAmount}</Badge>
                      <Badge bg={
                        application.status === 'pending' ? 'warning' :
                        application.status === 'accepted' ? 'success' : 'danger'
                      } className="ms-2">
                        {application.status}
                      </Badge>
                    </div>
                    <div>
                      {application.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            className="me-2"
                            onClick={() => handleApplicationAction(application._id, 'accept')}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleApplicationAction(application._id, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProjectApplications;