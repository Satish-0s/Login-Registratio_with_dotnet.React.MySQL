import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { getUserProfile } from '../services/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      // Validate session existence locally first
      const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (!storedUser) {
        toast.error('Session expired. Please log in.');
        navigate('/login');
        return;
      }
      
      try {
        // Fetch protected user profile via JWT
        const profileData = await getUserProfile();
        setUser(profileData);
      } catch (err) {
        toast.error('Session invalid. Please log in again.');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) return null;

  return (
    <Layout title="Dashboard" subtitle="Your secure workspace">
      <div className="fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>
          Welcome back, <span style={{ color: 'var(--primary)' }}>{user.name}</span>!
        </h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
          You've successfully authenticated and accessed your secure dashboard.
        </p>
        <Button onClick={handleLogout} variant="secondary">
          Logout Securely
        </Button>
      </div>
    </Layout>
  );
};

export default Dashboard;
