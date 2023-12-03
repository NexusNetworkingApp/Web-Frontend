import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Signup from './pages/SignUp/Signup';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import Discover from './pages/Discover/Discover';
import Jobs from './pages/Jobs/Jobs';
import Likes from './pages/Likes/Likes';
import Profile from './pages/Profile/Profile';
import Standouts from './pages/Standouts/Standouts';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/standouts" element={<Standouts />} />
            </Routes>
        </Router>
    );
}

export default App;
