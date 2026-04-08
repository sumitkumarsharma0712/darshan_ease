import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'var(--text-primary)', color: 'white', py: 3, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    &copy; {new Date().getFullYear()} DarshanEase. All rights reserved.
                </Typography>
                <Typography variant="body2" align="center" color="var(--text-secondary)">
                    Seamless Travel and Darshan Experiences
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
