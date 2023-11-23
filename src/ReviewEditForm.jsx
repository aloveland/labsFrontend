import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewEditForm = () => {
  const [assignmentDetails, setAssignmentDetails] = useState({
    id: '',
    githubUrl: '',
    branch: '',
    reviewVideoUrl: ''
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
       console.log(response.data)
       console.log("ASSIGNMENTDETAILS");
       console.log(assignmentDetails);
    })
    .catch(error => {
      console.error('Failed to fetch assignment details', error);
    });
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setAssignmentDetails(prevState => ({
      ...prevState,
      reviewVideoUrl: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');


    axios.put(`http://localhost:8080/assignments/${id}`, assignmentDetails, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      navigate('/reviewer-dashboard');
    })
    .catch(error => {
      console.error('Failed to update review', error);
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Review Edit View</h1>
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
            type="text"
            value={assignmentDetails.githubUrl || ''}
            disabled
          />
        </div>
        <div>
          <label>Branch</label>
          <input
            type="text"
            value={assignmentDetails.branch || ''}
            disabled
          />
        </div>
        <div>
          <label>Review Video URL</label>
          <input
            type="text"
            value={assignmentDetails.reviewVideoUrl || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Review</button>
        <button type="button" onClick={() => navigate('/reviewer-dashboard')}>Back to Dashboard</button>
      </form>
    </div>
  );
};

export default ReviewEditForm;
