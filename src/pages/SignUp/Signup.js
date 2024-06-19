// Signup.js
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import { MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { API_URL } from '../../util/URL';

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [userType, setUserType] = useState('individual');

  const [individualFormData, setIndividualFormData] = useState({
    email: '',
    passwordHash: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    receiveNotifications: false,
    biography: '',
    lastActive: new Date().toISOString(),
    location: 0,
  });

  const [organizationFormData, setOrganizationFormData] = useState({
    email: '',
    passwordHash: '',
    organizationName: '',
    foundedDate: '',
    industry: '',
    receiveNotifications: false,
    biography: '',
    lastActive: new Date().toISOString(),
    verified: false,
    location: 0,
  });

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const formData = userType === 'individual' ? setIndividualFormData : setOrganizationFormData;

    formData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = userType === 'individual' ? individualFormData : organizationFormData;

    try {
      let response;
      if (userType === 'individual') {
        response = await axios.post(`${API_URL}/account/create-individual`, userData);
      } else if (userType === 'organization') {
        response = await axios.post(`${API_URL}/account/create-organization`, userData);
      }
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="account-type-label">Account Type</InputLabel>
                  <Select
                    labelId="account-type-label"
                    id="account-type"
                    value={userType}
                    label="Account Type"
                    onChange={handleUserTypeChange}
                  >
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userType === 'individual' ? individualFormData.email : organizationFormData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordHash"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userType === 'individual' ? individualFormData.passwordHash : organizationFormData.passwordHash}
                  onChange={handleChange}
                />
              </Grid>

              {userType === 'individual' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={individualFormData.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={individualFormData.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="dateOfBirth"
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={individualFormData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="gender"
                      label="Gender"
                      name="gender"
                      value={individualFormData.gender}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="biography"
                      label="Biography"
                      name="biography"
                      multiline
                      rows={4}
                      value={individualFormData.biography}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="location"
                      label="Location"
                      name="location"
                      value={individualFormData.location}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="receiveNotifications"
                          checked={individualFormData.receiveNotifications}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Receive Notifications"
                    />
                  </Grid>
                </>
              )}

              {userType === 'organization' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="organizationName"
                      label="Organization Name"
                      name="organizationName"
                      value={organizationFormData.organizationName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="foundedDate"
                      label="Founded Date"
                      name="foundedDate"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={organizationFormData.foundedDate}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="industry"
                      label="Industry"
                      name="industry"
                      value={organizationFormData.industry}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="biography"
                      label="Biography"
                      name="biography"
                      multiline
                      rows={4}
                      value={organizationFormData.biography}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="location"
                      label="Location"
                      name="location"
                      value={organizationFormData.location}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="receiveNotifications"
                          checked={organizationFormData.receiveNotifications}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Receive Notifications"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="verified"
                          checked={organizationFormData.verified}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Verified"
                    />
                  </Grid>
                </>
              )}

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
