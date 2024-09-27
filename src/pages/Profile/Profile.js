import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import './Profile.css';

const theme = createTheme();

const Profile = () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    if (!account) {
        return (
            <Container component="main" maxWidth="md">
                <Box mt={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Profile
                    </Typography>
                    <Typography variant="body1">
                        No account information available. Please log in.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <Box mt={4} mb={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Profile
                    </Typography>
                    <Paper elevation={3} className="profile-paper">
                        <Box p={2}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Avatar
                                        alt="Profile Picture"
                                        src={account.pictureUrl || '/default-profile.png'}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">
                                        {account.accountType === 'INDIVIDUAL'
                                            ? `${account.individual.firstName} ${account.individual.lastName}`
                                            : account.organization.organizationName}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {account.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Box mt={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1"><strong>Gender:</strong> {account.individual?.gender}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1"><strong>Notifications:</strong> {account.individual?.receiveNotifications ? 'Yes' : 'No'}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1"><strong>Biography:</strong> {account.biography}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1"><strong>Location:</strong> {account.accountType === 'INDIVIDUAL'
                                            ? account.individual.location
                                            : account.organization.location}</Typography>
                                    </Grid>
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

export default Profile;
