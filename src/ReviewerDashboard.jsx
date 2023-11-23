import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const ReviewerDashboard = () => {
  const truncate = (str, n) => {
    if (!str) return "N/A";
    return (str.length > n) ? str.substr(0, n-1) + '…' : str;
  };


  const [assignments, setAssignments] = useState({
    inReview: [],
    submitted: [],
    completed: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const decoded = jwtDecode(token);
        const username = decoded.sub;

        const response = await axios.get(`http://localhost:8080/review/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fetchedAssignments = response.data;
        categorizeAssignments(fetchedAssignments);
      } catch (error) {
        console.error('Failed to fetch assignments', error);
        navigate('/login');
      }
    };

    fetchAssignments();
  }, [navigate]);

  const categorizeAssignments = (fetchedAssignments) => {
    const inReview = fetchedAssignments.filter(a => a.status === 'in_review');
    const submitted = fetchedAssignments.filter(a => a.status === 'submitted');
    const completed = fetchedAssignments.filter(a => a.status === 'completed');

    setAssignments({ inReview, submitted, completed });
  };
   const handleAssignmentClick = (id) => {
        navigate(`/edit-assignment-review/${id}`);
   };
  const renderAssignmentList = (assignmentsList) => (
    <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '1rem' }}>
      {assignmentsList.map(assignment => (
        <div key={assignment.id}
        onClick={() => handleAssignmentClick(assignment.id)}
        style={{
                    margin: '0 1rem',
                    minWidth: '200px',
                    border: '1px solid #ccc',
                    padding: '1rem',
                    cursor: 'pointer'
                  }}>
          <p>ID: {assignment.id}</p>
          <p>Status: {assignment.status}</p>
          <p>Number: {assignment.number}</p>
          <p>GitHub URL: <a href={assignment.githubUrl} title={assignment.githubUrl}>{truncate(assignment.githubUrl, 30)}</a></p>
          <p>Branch: {assignment.branch}</p>
          <p>Review Video URL: <a href={assignment.reviewVideoUrl}>{truncate(assignment.reviewVideoUrl, 30)}</a></p>
          <p>User ID: {assignment.userId}</p>
          <p>Code Reviewer ID: {assignment.codeReviewerId}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>REVIEWER DASHBOARD</h1>
      <section>
        <h2>In Review</h2>
        {renderAssignmentList(assignments.inReview)}
      </section>
      <section>
        <h2>Submitted</h2>
        {renderAssignmentList(assignments.submitted)}
      </section>
      <section>
        <h2>Completed</h2>
        {renderAssignmentList(assignments.completed)}
      </section>
    </div>
  );
};

export default ReviewerDashboard;
