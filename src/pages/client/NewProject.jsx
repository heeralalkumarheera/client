import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useGeneral } from '../../context/GeneralContext';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    skillsRequired: '',
    category: '',
    deadline: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { state } = useGeneral();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const projectData = {
        ...formData,
        budget: parseFloat(formData.budget),
        skillsRequired: formData.skillsRequired.split(',').map(skill => skill.trim())
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`
        },
        body: JSON.stringify(projectData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Project created successfully!');
        setFormData({
          title: '',
          description: '',
          budget: '',
          skillsRequired: '',
          category: '',
          deadline: ''
        });
        setTimeout(() => navigate('/client/projects'), 2000);
      } else {
        setError(data.message || 'Error creating project');
      }
    } catch (error) {
      setError('Error creating project. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h3>Post New Project</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project in detail..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Budget ($)</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter your budget"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Skills Required (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, MongoDB"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="content-writing">Content Writing</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Post Project
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewProject;