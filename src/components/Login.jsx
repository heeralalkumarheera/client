import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useGeneral } from '../context/GeneralContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useGeneral();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed. Please check your connection and try again.');
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

      <Form.Group className="mb-4 form-group-custom">
        <Form.Label className="form-label">Password</Form.Label>
        <div className="input-group-custom">
          <span className="input-icon">🔒</span>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
            className="form-control-custom"
          />
        </div>
        <div className="form-options">
          <Form.Check 
            type="checkbox" 
            label="Remember me" 
            className="remember-check"
          />
          <a href="#forgot" className="forgot-link">Forgot password?</a>
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
            Signing In...
          </>
        ) : (
          'Sign In to Your Account'
        )}
      </Button>
      
      <div className="auth-switch text-center mt-4">
        <span className="switch-text">Don't have an account? </span>
        <Button variant="link" onClick={onSwitchToRegister} disabled={loading} className="switch-link">
          Sign up now
        </Button>
      </div>
    </Form>
  );
};

export default Login;