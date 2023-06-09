import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { useState, useEffect } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [nameOfUser, setNameOfUser] = useState('');

  useEffect(() => {
    // Check if user is already logged in by checking browser storage
    const isLoggedIn = sessionStorage.getItem('isLogin');
    const username = sessionStorage.getItem('nameOfUser');
    if (isLoggedIn && username) {
      setIsLogin(true);
      setNameOfUser(username);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLogin(true);
    setNameOfUser(username);
    // Store login status and username in browser storage
    sessionStorage.setItem('isLogin', true);
    sessionStorage.setItem('nameOfUser', username);
  };

  const handleLogout = () => {
    setIsLogin(false);
    setNameOfUser('');
    // Clear login status and username from browser storage
    sessionStorage.removeItem('isLogin');
    sessionStorage.removeItem('nameOfUser');
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Routes>
          <Route
            path="/home"
            element={<Home nameOfUser={nameOfUser} onLogin={handleLogout} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
