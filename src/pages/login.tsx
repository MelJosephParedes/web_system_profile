import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const router = useRouter();

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
        const response = await axios.post('/api/login', values);
        console.log('Login successful:', response.data);
        // Redirect to profile page upon successful login
        router.push('/profile');
      } catch (error) {
        const axiosError = error as AxiosError; // Type assertion
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          console.error('Error during login:', axiosError.response.data);
          setSnackbarMessage('Login failed. Please check your credentials.');
        } else if (axiosError.request) {
          // The request was made but no response was received
          console.error('No response received during login:', axiosError.request);
          setSnackbarMessage('No response received from the server. Please try again later.');
        } else {
          // Something happened in setting up the request that triggered an Error
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

      {/* Snackbar for displaying success or error message */}
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
