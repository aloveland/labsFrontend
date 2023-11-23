import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const LearnerDashboard = () => {
   const truncate = (str, n) => {
       if (!str) return "N/A";
       return (str.length > n) ? str.substr(0, n-1) + '…' : str;
     };
  const [assignments, setAssignments] = useState({
    uncompleted: [],
    completed: [],
    inReview: [],
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

        const response = await axios.post(
          'http://localhost:8080/assignments',
          { username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    const uncompleted = fetchedAssignments.filter(a => !a.status || a.status === 'uncompleted');
    const completed = fetchedAssignments.filter(a => a.status === 'completed');
    const inReview = fetchedAssignments.filter(a => a.status === 'in_review');

    setAssignments({ uncompleted, completed, inReview });
  };
  const handleAssignmentClick = (id) => {
      navigate(`/edit-assignment/${id}`);
    };

  const renderAssignmentList = (assignmentsList) => (
    <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '1rem' }}>
      {assignmentsList.map((assignment) => (
        <div
          key={assignment.id}
          onClick={() => handleAssignmentClick(assignment.id)}
          style={{
            margin: '0 1rem',
            minWidth: '200px',
            border: '1px solid #ccc',
            padding: '1rem',
            cursor: 'pointer'
          }}
        >
          <p>ID: {assignment.id}</p>
          <p>Status: {assignment.status || 'Uncompleted'}</p>
          <p>Number: {assignment.number}</p>
          <p>GitHub URL: <a href={assignment.githubUrl} title={assignment.githubUrl} onClick={(e) => e.stopPropagation()}>{truncate(assignment.githubUrl, 30)}</a></p>
          <p>Branch: {assignment.branch}</p>
          <p>Review Video URL: <a href={assignment.reviewVideoUrl} onClick={(e) => e.stopPropagation()}>{truncate(assignment.reviewVideoUrl, 30)}</a></p>
          <p>User ID: {assignment.userId}</p>
          <p>Code Reviewer ID: {assignment.codeReviewerId}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>LEARNER DASHBOARD</h1>
      <section>
        <h2>Uncompleted</h2>
        {renderAssignmentList(assignments.uncompleted)}
      </section>
      <section>
        <h2>Completed</h2>
        {renderAssignmentList(assignments.completed)}
      </section>
      <section>
        <h2>In Review</h2>
        {renderAssignmentList(assignments.inReview)}
      </section>
    </div>
  );
};

export default LearnerDashboard;
