import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticatedHomePage = () => {
  const navigate = useNavigate();

  const navigateToLearnerDashboard = () => {
    navigate('/learner-dashboard');
  };

  const navigateToReviewerDashboard = () => {
    navigate('/reviewer-dashboard');
  };

  const buttonStyle = {
    padding: '15px 30px',
    fontSize: '20px',
    margin: '10px',
    cursor: 'pointer'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome to the Authenticated Home Page</h1>
      <button onClick={navigateToLearnerDashboard} style={buttonStyle}>Learner Dashboard</button>
      <button onClick={navigateToReviewerDashboard} style={buttonStyle}>Reviewer Dashboard</button>
    </div>
  );
};

export default AuthenticatedHomePage;
