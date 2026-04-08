import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Temples from './pages/Temples';
import TempleDetails from './pages/TempleDetails';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import Dashboard from './pages/Dashboard';

import { Box } from '@mui/material';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return children;
};

// Root Redirect Component
const RootRedirect = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;
    return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Box className="app-container" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Navbar />
                        <Box component="main" sx={{ flexGrow: 1 }}>
                        <Routes>
                            <Route path="/" element={<RootRedirect />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/temples" element={<Temples />} />
                            <Route path="/temples/:id" element={<TempleDetails />} />
                            <Route path="/hotels" element={<Hotels />} />
                            <Route path="/hotels/:id" element={<HotelDetails />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Box>
                    <Footer />
                </Box>
                <ToastContainer position="bottom-right" autoClose={3000} />
            </Router>
        </AuthProvider>
    </ThemeProvider>
    );
}

export default App;
