import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Navbar from '../components/navbar.js';
const Layout = ({ children }) => {
    return (
        <div>
            {/* Navigation Bar */}
            <Navbar />
            {/* Content Area */}
            <Container style={{ marginTop: '20px' }}>
                {children}
            </Container>
        </div>
    );
};

export default Layout;
