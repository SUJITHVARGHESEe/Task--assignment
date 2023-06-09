import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    

    // Send signup data to the server using Axios
    axios
      .post('/signup', { username, email, password })
      .then((response) => {
        // Handle response from the server
        navigate('/login');
        console.log(response.data);
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
        <h5>Lets Go!</h5>
        <form onSubmit={handleSignup}>
          <label htmlFor="fname">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br/>
          <label htmlFor="femail">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>
          <label htmlFor="lpassword">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/> 
          <button className="signupbtn" type="submit">Signup</button>
          {error && <p className="error mt-3" style={{color:"red"}}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
