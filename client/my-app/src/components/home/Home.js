import React from 'react';
import cardData from '../card/card';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ nameOfUser, onLogin }) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    onLogin();
    navigate('/login');
  };

  return (
    <div>
      <header>
        <div>
          <div className="header-content">
            <div className="username">
            <h5 >Hi,{nameOfUser}</h5>
            </div>
            <button onClick={handleLogout} className="btn1">
              Logout
            </button>
          </div>
        </div>
      </header>
      <div>
        <h5 style={{ marginTop: '2rem' }}>Name your Organization</h5>
        <br />
        <input className='inputhome' type="text" placeholder="enter organization name" />
        <br />
        <div>
          <h5 style={{ marginBottom: '2.5rem' }}>select your organization type below</h5>
        </div>
        <div className="container">
          <div className="row">
            {cardData.slice(0, 8).map((card) => (
              <div key={card.id} className="card col-md-2">
                <i className={card.icon}></i>
                <h3>{card.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <button className="btn2">Next</button>
      </div>
    </div>
  );
};

export default Home;
