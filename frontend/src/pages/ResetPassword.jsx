import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

const ResetPassword = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({ 
    email: location.state?.email || '', 
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/reset-password', {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      toast.success('Password successfully reset! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed. Check OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Reset Password" subtitle="Enter your newly received OTP">
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
        <Input 
          label="New Password" 
          type="password"
          name="newPassword" 
          placeholder="********" 
          value={formData.newPassword} 
          onChange={handleInputChange} 
          required 
        />
        <Input 
          label="Confirm New Password" 
          type="password"
          name="confirmPassword" 
          placeholder="********" 
          value={formData.confirmPassword} 
          onChange={handleInputChange} 
          required 
        />
        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" loading={loading}>
            Reset Password
          </Button>
        </div>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ fontSize: '0.875rem' }}>
          <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Back to Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default ResetPassword;
