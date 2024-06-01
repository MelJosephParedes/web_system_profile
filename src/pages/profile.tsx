// pages/profile.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import  useSWR  from 'swr';
import { TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const ProfilePage = () => {
  const { data: userData, error } = useSWR('/api/user', fetchUserData);

  const formik = useFormik({
    initialValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      bio: userData?.bio || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      bio: Yup.string(),
    }),
    onSubmit: (values) => {
      // Submit form data to server using Axios
      axios.put('/api/user', values);
    },
  });

  if (error) return <div>Error loading user data</div>;
  if (!userData) return <CircularProgress />;

  return (
    <form onSubmit={formik.handleSubmit}>
        <TextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && typeof formik.errors.name === 'string' ? formik.errors.name : ''}
        />
        <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && typeof formik.errors.email === 'string' ? formik.errors.email : ''}
        />
        <TextField
            id="bio"
            name="bio"
            label="Bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && typeof formik.errors.bio === 'string' ? formik.errors.bio : ''}
        />
      {/* Other fields like email, bio */}
      <Button type="submit">Save</Button>
    </form>
  );
};

async function fetchUserData() {
  const response = await axios.get('/api/user');
  return response.data;
}

export default ProfilePage;
