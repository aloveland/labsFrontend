import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/authenticate/login', {
        username,
        password
      });

      localStorage.setItem('token', response.data.jwt);
      navigate('/home');
    } catch (error) {
      setErrorMessage('Login failed. Please check your username and password.');
    }
  };


  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };
  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    width: '80%',
  };
  const buttonStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
  };
  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2>LOGIN</h2>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
