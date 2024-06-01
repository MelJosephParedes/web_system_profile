// pages/update-profile.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const UpdateProfilePage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      bio: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      bio: Yup.string(),
    }),
    onSubmit: (values) => {
      // Submit updated profile data to server using Axios
      axios.put('/api/user', values);
    },
  });

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
        helperText={formik.touched.name && formik.errors.name}
      />
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
        id="bio"
        name="bio"
        label="Bio"
        value={formik.values.bio}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bio && Boolean(formik.errors.bio)}
        helperText={formik.touched.bio && formik.errors.bio}
      />
      {/* Other fields like email, bio */}
      <Button type="submit">Update Profile</Button>
    </form>
  );
};

export default UpdateProfilePage;
