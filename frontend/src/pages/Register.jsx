import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import { register } from '../services/auth';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please correct the errors in the form.');
      return;
    }

    setLoading(true);
    try {
      await register({ name: formData.name, email: formData.email, password: formData.password });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Create Account" subtitle="Sign up to get started">
      <form onSubmit={handleSubmit} className="fade-in">
        <Input
          label="Name"
          name="name"
          placeholder="Satish Kumar"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="satish@gmail.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="********"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="********"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          required
        />
        <Button type="submit" loading={loading} className="mt-4">
          Register
        </Button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
