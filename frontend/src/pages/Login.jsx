import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../services/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
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
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      const userData = data.user || data;
      const sessionPayload = { ...userData, token: data.token };
      
      toast.success(`Welcome back, ${sessionPayload.name}!`);
      
      // Delay exactly 3 seconds so this appears perfectly right after the welcome toast exits
      setTimeout(() => {
        toast.success('Token generated successfully!');
      }, 3000);
      
      const storageContext = rememberMe ? localStorage : sessionStorage;
      storageContext.setItem('user', JSON.stringify(sessionPayload));
      
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error(err.response?.data?.message || 'Please verify your email.');
        navigate('/verify-email', { state: { email: formData.email } });
      } else {
        toast.error(err.response?.data?.message || err.message || 'Invalid login credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Welcome Back" subtitle="Log in to access your dashboard">
      <form onSubmit={handleSubmit} className="fade-in">
        <Input 
          label="Email Address" 
          type="email" 
          name="email" 
          placeholder="john@example.com" 
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
        
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          <input 
            type="checkbox" 
            id="rememberMe" 
            checked={rememberMe} 
            onChange={(e) => setRememberMe(e.target.checked)} 
            style={{ marginRight: '0.5rem', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
          <label htmlFor="rememberMe" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
            Remember Me
          </label>
        </div>

        <Button type="submit" loading={loading}>
          Login
        </Button>
        <div style={{ textAlign: 'right', marginTop: '0.75rem' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
            Forgot password?
          </Link>
        </div>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <p style={{ fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Register now</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
