import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useGeneral } from '../context/GeneralContext';
import { useNavigate } from 'react-router-dom';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'freelancer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useGeneral();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TOKEN', payload: data.token });
        dispatch({ type: 'SET_USER', payload: data.result });
        
        // Redirect based on role
        switch (data.result.role) {
          case 'client':
            navigate('/client');
            break;
          case 'freelancer':
            navigate('/freelancer');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      {error && (
        <Alert variant="danger" className="auth-alert">
          <div className="alert-icon">⚠️</div>
          {error}
        </Alert>
      )}
      
      <Form.Group className="mb-3 form-group-custom">
        <Form.Label className="form-label">Full Name</Form.Label>
        <div className="input-group-custom">
          <span className="input-icon">👤</span>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
            className="form-control-custom"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3 form-group-custom">
        <Form.Label className="form-label">Email Address</Form.Label>
        <div className="input-group-custom">
          <span className="input-icon">📧</span>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={loading}
            className="form-control-custom"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3 form-group-custom">
        <Form.Label className="form-label">Password</Form.Label>
        <div className="input-group-custom">
          <span className="input-icon">🔒</span>
          <Form.Control
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
            className="form-control-custom"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3 form-group-custom">
        <Form.Label className="form-label">Confirm Password</Form.Label>
        <div className="input-group-custom">
          <span className="input-icon">✅</span>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            disabled={loading}
            className="form-control-custom"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-4 form-group-custom">
        <Form.Label className="form-label">I am a</Form.Label>
        <div className="input-group-custom">
          <span className="input-icon">💼</span>
          <Form.Select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            disabled={loading}
            className="form-control-custom"
            style={{ paddingLeft: '45px' }}
          >
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </Form.Select>
        </div>
      </Form.Group>

      <Button 
        variant="primary" 
        type="submit" 
        className="auth-submit-btn"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Creating Account...
          </>
        ) : (
          'Create Your Account'
        )}
      </Button>
      
      <div className="auth-switch text-center mt-4">
        <span className="switch-text">Already have an account? </span>
        <Button variant="link" onClick={onSwitchToLogin} disabled={loading} className="switch-link">
          Sign in instead
        </Button>
      </div>
    </Form>
  );
};

export default Register;