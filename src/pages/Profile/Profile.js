import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import './Profile.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2ecc71',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

const Profile = () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    if (!account) {
        return (
            <Container component="main" maxWidth="md">
                <Box mt={4} className="profile-container">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Profile
                    </Typography>
                    <Typography variant="body1" className="no-account-message">
                        No account information available. Please log in.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <Box mt={4} mb={4} className="profile-container">
                    <Typography variant="h4" component="h1" gutterBottom className="profile-header">
                        Profile
                    </Typography>
                    <Paper elevation={3} className="profile-paper">
                        <Box p={3}>
                            <Grid container spacing={3} alignItems="center" className="profile-header-section">
                                <Grid item>
                                    <Avatar
                                        alt="Profile Picture"
                                        src={account.pictureUrl || '/default-profile.png'}
                                        className="profile-avatar"
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5" className="profile-name">
                                        {account.accountType === 'INDIVIDUAL'
                                            ? `${account.individual.firstName} ${account.individual.lastName}`
                                            : account.organization.organizationName}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" className="profile-email">
                                        {account.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Box mt={3}>
                                <Grid container spacing={2}>
                                    {account.accountType === 'INDIVIDUAL' && (
                                        <>
                                            <ProfileField label="Gender" value={account.individual.gender} />
                                            <ProfileField label="Notifications" value={account.individual.receiveNotifications ? 'Yes' : 'No'} />
                                        </>
                                    )}
                                    <ProfileField label="Biography" value={account.biography} fullWidth />
                                    <ProfileField 
                                        label="Location" 
                                        value={account.accountType === 'INDIVIDUAL'
                                            ? account.individual.location
                                            : account.organization.location} 
                                    />
                                    {account.accountType === 'ORGANIZATION' && (
                                        <>
                                            <ProfileField label="Industry" value={account.organization.industry} />
                                            <ProfileField label="Founded Date" value={new Date(account.organization.foundedDate).toLocaleDateString()} />
                                        </>
                                    )}
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

const ProfileField = ({ label, value, fullWidth = false }) => (
    <Grid item xs={12} sm={fullWidth ? 12 : 6} className="profile-field">
        <Typography variant="body2" color="textSecondary" className="profile-field-label">
            {label}
        </Typography>
        <Typography variant="body1" className="profile-field-value">
            {value || 'Not provided'}
        </Typography>
    </Grid>
);

export default Profile;