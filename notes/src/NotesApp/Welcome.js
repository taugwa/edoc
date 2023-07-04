import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLandingPage from './UserLandingPage';
import HiUser from './functions/HiUser';
import { AppProvider } from './components/AppContext';

const Welcome = (props) => {
  const navigate = useNavigate();
  const [welcomeData, setWelcomeData] = useState(null);

  useEffect(() => {

    const token = window.localStorage.getItem('token');
    if (!token) {
  
      navigate('/login');
    } else {
      fetch('http://localhost:3000/Welcome', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'Welcome');
          setWelcomeData(data.data);
        })
        .catch((error) => {
          console.error('Error fetching welcome data:', error);
        });
    }
  }, [navigate]);

  return (
    <div>
      <AppProvider>
        {welcomeData && (
          <UserLandingPage Username={welcomeData.Username} PageType={props.PageType} />
        )}
      </AppProvider>
    </div>
  );
};

export default Welcome;

