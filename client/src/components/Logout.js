import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    authService.logout();
    history.push('/');
  }, [history]);

  return null;
};

export default Logout;