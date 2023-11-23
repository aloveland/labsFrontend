import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import AuthenticatedHomePage from './AuthenticatedHomePage';
import LearnerDashboard from './LearnerDashboard'; // Import the LearnerDashboard component
import ReviewerDashboard from './ReviewerDashboard'
import AssignmentEditForm from './AssignmentEditForm';
import ReviewEditForm from './ReviewEditForm';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<AuthenticatedHomePage />} />
          <Route path="/learner-dashboard" element={<LearnerDashboard />} /> {/* LearnerDashboard route */}
          <Route path="/reviewer-dashboard" element={<ReviewerDashboard />} />
          <Route path="/edit-assignment/:id" element={<AssignmentEditForm />} />
          <Route path="/edit-assignment-review/:id" element={<ReviewEditForm />}/>
          {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
