import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import Signup from './pages/SignUp/Signup';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import Discover from './pages/Discover/Discover';
import Jobs from './pages/Jobs/Jobs';
import Likes from './pages/Likes/Likes';
import Profile from './pages/Profile/Profile';
import Standouts from './pages/Standouts/Standouts';
import Message from './pages/Message/Message';
import JobPosting from './pages/JobPosting/JobPosting';
import JobApplication from './pages/JobApplication/JobApplication';

function App() {
    const { isLoggedIn } = useAuth();

    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={isLoggedIn ? <Discover /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/chat"
                        element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/discover"
                        element={isLoggedIn ? <Discover /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/jobs"
                        element={isLoggedIn ? <Jobs /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/likes"
                        element={isLoggedIn ? <Likes /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/profile"
                        element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/standouts"
                        element={isLoggedIn ? <Standouts /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/message/:accountId/:otherAccountId"
                        element={isLoggedIn ? <Message /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/post-job"
                        element={isLoggedIn ? <JobPosting /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/apply-job/:jobId"
                        element={isLoggedIn ? <JobApplication /> : <Navigate to="/login" />}
                    />

                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
