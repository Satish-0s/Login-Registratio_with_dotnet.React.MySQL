import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

const VerifyEmail = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({ 
    email: location.state?.email || '', 
    otp: '' 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp) {
      toast.error('Both Email and OTP are required.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verify-email', formData);
      toast.success('Email verified successfully! You can now login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed. Please check your OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Verify Email" subtitle="Enter the 6-digit OTP from your console">
      <form onSubmit={handleSubmit} className="fade-in">
        <Input 
          label="Email Address" 
          type="email" 
          name="email" 
          placeholder="your@email.com" 
          value={formData.email} 
          onChange={handleInputChange} 
          required 
        />
        <Input 
          label="6-Digit OTP" 
          name="otp" 
          placeholder="123456" 
          value={formData.otp} 
          onChange={handleInputChange} 
          required 
        />
        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" loading={loading}>
            Verify Account
          </Button>
        </div>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ fontSize: '0.875rem' }}>
          Verified? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Back to Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
