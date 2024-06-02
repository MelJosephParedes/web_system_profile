// pages/login.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/authContext'; // Adjust the import to match your project structure

const LoginPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Error during login:', axiosError.response.data);
          setSnackbarMessage('Login failed. Please check your credentials.');
        } else if (axiosError.request) {
          console.error('No response received during login:', axiosError.request);
          setSnackbarMessage('No response received from the server. Please try again later.');
        } else {
          console.error('Error during login setup:', axiosError.message);
          setSnackbarMessage('An error occurred. Please try again later.');
        }
        setSnackbarOpen(true);
      }
    }
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2>Login</h2>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit">Login</Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default LoginPage;
