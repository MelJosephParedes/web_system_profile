// components/LogoutButton.tsx

import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Perform logout request to server using Axios
      await axios.post('/api/logout');
      // Redirect to login page after successful logout
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
