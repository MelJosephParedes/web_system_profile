// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../contexts/authContext'; // Adjust the import to match your project structure

const AppContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={{}}>
        <CssBaseline />
        <AppContainer>
          <Navbar />
          <Component {...pageProps} />
        </AppContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default MyApp;
