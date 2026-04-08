import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';

const getMapEmbedUrl = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

const Home = () => {
    const [featuredTemples, setFeaturedTemples] = useState([]);
    const [featuredHotels, setFeaturedHotels] = useState([]);

    useEffect(() => {
        const fetchTemples = async () => {
            try {
                const res = await api.get('/temples');
                setFeaturedTemples(res.data.slice(0, 3));
            } catch (err) {
                console.error('Failed to fetch featured temples', err);
            }
        };

        const fetchHotels = async () => {
            try {
                const res = await api.get('/hotels');
                setFeaturedHotels(res.data.slice(0, 3));
            } catch (err) {
                console.error('Failed to fetch featured hotels', err);
            }
        };

        fetchTemples();
        fetchHotels();
    }, []);

    const mapQuery = featuredTemples.length > 0 ? `${featuredTemples[0].name} ${featuredTemples[0].location}` : 'Indian temples';

    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                bgcolor: 'var(--primary-color)',
                color: 'white',
                py: 8,
                textAlign: 'center',
                backgroundImage: 'linear-gradient(rgba(255, 111, 0, 0.8), rgba(255, 213, 79, 0.8)), url("https://images.unsplash.com/photo-1542358913-92f7cf17b9d7")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.3)'
            }}>
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                        Define Your Spiritual Journey
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
                        Seamlessly book darshan tickets, stay connected with the almighty, and experience peace of mind like never before.
                    </Typography>
                    <Button variant="contained" size="large" component={Link} to="/temples" sx={{ bgcolor: 'white', color: 'var(--primary-color)', '&:hover': { bgcolor: '#f0f0f0' }, fontWeight: 'bold' }}>
                        Book Darshan Now
                    </Button>
                </Container>
            </Box>

            {/* Featured Temples Section */}
            <Container sx={{ py: 6 }} maxWidth="lg">
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
                    Featured Destinations
                </Typography>
                <Box sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: 3, minHeight: 280 }}>
                    <iframe
                        src={getMapEmbedUrl(mapQuery)}
                        title="Temple Map Preview"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: 280 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Box>
                <Grid container spacing={4}>
                    {featuredTemples.map((temple) => (
                        <Grid item key={temple._id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } }}>
                                <CardMedia
                                    component="div"
                                    sx={{ pt: '56.25%' }}
                                    image={temple.imageUrl}
                                    title={temple.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {temple.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        📍 {temple.location}
                                    </Typography>
                                    <Typography>
                                        {temple.description}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Button size="small" variant="contained" component={Link} to={`/temples/${temple._id}`} sx={{ bgcolor: 'var(--primary-color)', flexGrow: 1 }}>
                                        View Details
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${temple.name} ${temple.location}`)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        sx={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                                    >
                                        Open Map
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button variant="outlined" component={Link} to="/temples" sx={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
                        View All Temples
                    </Button>
                </Box>
            </Container>

            <Container sx={{ py: 6 }} maxWidth="lg">
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
                    Comfortable Pilgrim Stays
                </Typography>
                <Grid container spacing={4}>
                    {featuredHotels.map((hotel) => (
                        <Grid item key={hotel._id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } }}>
                                <CardMedia
                                    component="div"
                                    sx={{ pt: '56.25%' }}
                                    image={hotel.imageUrl}
                                    title={hotel.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {hotel.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        📍 {hotel.location}
                                    </Typography>
                                    <Typography sx={{ mb: 1 }}>
                                        {hotel.description.substring(0, 90)}...
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        ₹{hotel.pricePerNight} / night
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Button size="small" variant="contained" component={Link} to={`/hotels/${hotel._id}`} sx={{ bgcolor: 'var(--primary-color)', flexGrow: 1 }}>
                                        View Hotel
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button variant="outlined" component={Link} to="/hotels" sx={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
                        Browse All Hotels
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
