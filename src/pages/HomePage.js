import React from 'react'
import useAuth from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';

const HomePage = () => {
  const auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      WelCome {auth.user?.username}
      <Button onClick={() => {
        auth.logout(() => navigate('/'))
      }} >
        Sign Out
      </Button>
    </div>
  )
}

export default HomePage

