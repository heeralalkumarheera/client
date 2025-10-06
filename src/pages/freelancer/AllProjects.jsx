import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { useGeneral } from '../../context/GeneralContext';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [proposal, setProposal] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [timeline, setTimeline] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const { state } = useGeneral();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, category]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filterProjects = () => {
    let filtered = projects.filter(project => 
      project.status === 'open' &&
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (category) {
      filtered = filtered.filter(project => project.category === category);
    }

    setFilteredProjects(filtered);
  };

  const handleApply = (project) => {
    setSelectedProject(project);
    setBidAmount(project.budget);
    setShowModal(true);
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`
        },
        body: JSON.stringify({
          project: selectedProject._id,
          proposal,
          bidAmount: parseFloat(bidAmount),
          timeline
        })
      });

      if (response.ok) {
        setShowModal(false);
        setProposal('');
        setBidAmount('');
        setTimeline('');
        alert('Application submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Available Projects</h3>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="content-writing">Content Writing</option>
            <option value="digital-marketing">Digital Marketing</option>
          </Form.Select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <Alert variant="info">No projects found matching your criteria.</Alert>
      ) : (
        filteredProjects.map(project => (
          <Card key={project._id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h5>{project.title}</h5>
                  <p className="text-muted">Posted by: {project.client?.name}</p>
                  <p>{project.description}</p>
                  <div className="mb-2">
                    {project.skillsRequired.map(skill => (
                      <Badge key={skill} bg="secondary" className="me-1">{skill}</Badge>
                    ))}
                  </div>
                  <div>
                    <Badge bg="primary">Budget: ${project.budget}</Badge>
                    <Badge bg="info" className="ms-2">Category: {project.category}</Badge>
                    <Badge bg="warning" className="ms-2">
                      Deadline: {new Date(project.deadline).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="primary"
                  onClick={() => handleApply(project)}
                  className="ms-3"
                >
                  Apply Now
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitApplication}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Your Proposal</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="Describe why you're the best fit for this project..."
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bid Amount ($)</Form.Label>
              <Form.Control
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estimated Timeline</Form.Label>
              <Form.Control
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g., 2 weeks, 1 month"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Application
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AllProjects;