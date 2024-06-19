import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';

const defaultTheme = createTheme();

const Login = () => {
    const { isLoggedIn, login } = useAuth();
    const [accountType, setAccountType] = useState('individual');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginSuccessful = await login(accountType, email, password);
            console.log(isLoggedIn);

            if (loginSuccessful) {
                console.log('Login successful');
                setEmail('');
                setPassword('');
                window.location.href = '/discover';
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="account-type-label">Account Type</InputLabel>
                            <Select
                                labelId="account-type-label"
                                id="account-type"
                                value={accountType}
                                label="Account Type"
                                onChange={handleAccountTypeChange}
                            >
                                <MenuItem value="individual">Individual</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
