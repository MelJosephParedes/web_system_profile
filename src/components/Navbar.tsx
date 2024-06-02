// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/authContext'; // Adjust the import to match your project structure

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: 'black',
}));

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'pink' }}>
      <Toolbar>
        <Title variant="h6">
          Create Profile App
        </Title>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button color="inherit" sx={{ color: 'black' }}>Home</Button>
          </Link>
        </Box>
        {isLoggedIn ? (
          <>
            <Link href="/update-account" passHref>
              <Button color="inherit" sx={{ color: 'black' }}>Update Account</Button>
            </Link>
            <Button color="inherit" sx={{ color: 'black' }} onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/create-account" passHref>
              <Button color="inherit" sx={{ color: 'black' }}>Create Account</Button>
            </Link>
            <Link href="/login" passHref>
              <Button color="inherit" sx={{ color: 'black' }}>Login</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
