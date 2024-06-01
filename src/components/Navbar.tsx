// components/Navbar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: 'black', // Set font color to white
}));

const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = false; // Replace with actual authentication logic

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("User logged out");
    router.push('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'pink' }}>
      <Toolbar>
        <Title variant="h6">
          My Profile App
        </Title>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button color="inherit" sx={{ color: 'black' }}>Home</Button>
          </Link>
        </Box>
        {!isLoggedIn ? (
          <>
            <Link href="/create-account" passHref>
              <Button color="inherit" sx={{ color: 'black' }}>Create Account</Button>
            </Link>
            <Link href="/login" passHref>
              <Button color="inherit" sx={{ color: 'black' }}>Login</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/update-account" passHref>
              <Button color="inherit" sx={{ color: 'black' }}>Update Account</Button>
            </Link>
            <Button color="inherit" sx={{ color: 'black' }} onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
