import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignmentEditForm = () => {
  const [assignmentDetails, setAssignmentDetails] = useState({
    id: '',
    githubUrl: '',
    branch: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8080/assignment/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {

      setAssignmentDetails(response.data);
    })
    .catch(error => {
      console.error('Failed to fetch assignment details', error);

    });
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignmentDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:8080/assignments/${id}`, assignmentDetails, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      navigate('/learner-dashboard');
    })
    .catch(error => {
      console.error('Failed to submit assignment', error);
      // Handle error
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Learner Assignment View</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Assignment #</label>
          <input
            type="text"
            value={assignmentDetails.id || ''}
            disabled
          />
        </div>
        <div>
          <label>GitHub URL</label>
          <input
            name="githubUrl"
            type="text"
            value={assignmentDetails.githubUrl || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Branch</label>
          <input
            name="branch"
            type="text"
            value={assignmentDetails.branch || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/learner-dashboard')}>Back to Dashboard</button>
      </form>
    </div>
  );
};

export default AssignmentEditForm;
