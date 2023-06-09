import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Send login data to the server using Axios
    axios
      .post('/login', { email, password })
      .then((response) => {
        // Handle response from the server
        console.log(response.data.Username);
        onLogin(response.data.Username);
        // Call the onLogin function to update the parent component
        navigate('/home');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Error occurred during signup');
        }
      });
  };


  return (
    <div className="section">
      <div className="signupParentDiv">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="femail">Email</label>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lpassword">Password</label>
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="rememberMe" className='checkbox'>
            <input
            className='checkbox'
              type="checkbox"
              id="rememberMe"
              
            />
            Remember me
          </label>
          <br />
          <button  className='loginbtn' type="submit">Login</button>
          {error && <p className="error mt-3" style={{color:"red"}}>{error}</p>}   
        </form>
      </div>
    </div>
  );
};

export default Login;
