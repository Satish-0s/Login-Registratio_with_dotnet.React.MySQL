import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', { email });
      const backendOtp = response.data?.otp;
      if (backendOtp) {
        toast.success(`OTP Sent! Your code is: ${backendOtp}`);
      } else {
        toast.success('If the email is verified/registered, an OTP was sent.');
      }
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to request password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Forgot Password" subtitle="Enter your email to receive an OTP">
      <form onSubmit={handleSubmit} className="fade-in">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" loading={loading}>
            Send OTP
          </Button>
        </div>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ fontSize: '0.875rem' }}>
          Remembered your password? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
