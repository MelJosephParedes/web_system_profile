import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import axios from 'axios';

const CreateAccountPage = () => {
  const [isSuccess, setIsSuccess] = useState(false); // State variable to track success status
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      bio: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      bio: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/users', values);
        console.log('Response:', response.data);
        setIsSuccess(true); // Set success status to true
      } catch (error) {
        console.error('Error creating user account:', error);
        setIsError(true);
      }
    },
  });

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
        <h2>Create an Account</h2>
        <TextField
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
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
        <TextField
          id="bio"
          name="bio"
          label="Bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio && formik.errors.bio}
        />
        {/* Other form fields */}
        <Button type="submit">Create Account</Button>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={isSuccess}
        autoHideDuration={15000}
        onClose={() => setIsSuccess(false)}
        message="Account created successfully"
      />
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError(false)}
        message="Error creating user account"
      />
    </Box>
  );
};

export default CreateAccountPage;
