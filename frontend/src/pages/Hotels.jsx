import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Box, TextField, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';

const getMapEmbedUrl = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await api.get('/hotels');
                setHotels(res.data);
            } catch (err) {
                console.error('Failed to fetch hotels', err);
            }
        };
        fetchHotels();
    }, []);

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const mapQuery = searchTerm.trim() || 'Popular hotels in India';

    return (
        <Container sx={{ py: 6 }} maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Hotel Rooms & Pilgrim Stays
                </Typography>
                <TextField
                    label="Search Hotels or Location"
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 250 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>

            <Box sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: 3, minHeight: 280 }}>
                <iframe
                    title="Hotels Map"
                    src={getMapEmbedUrl(mapQuery)}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 280 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>

            <Grid container spacing={4}>
                {filteredHotels.map((hotel) => (
                    <Grid item xs={12} sm={6} md={4} key={hotel._id}>
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
                                <Typography variant="body2" color="text.secondary">
                                    📍 {hotel.location}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                                    <Rating value={hotel.rating || 4.5} precision={0.1} readOnly size="small" />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                        {hotel.rating?.toFixed(1) || '4.5'}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {hotel.description.substring(0, 90)}...
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                    ₹{hotel.pricePerNight} / night
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Button size="small" variant="contained" component={Link} to={`/hotels/${hotel._id}`} sx={{ bgcolor: 'var(--primary-color)', width: '100%' }}>
                                    View & Book
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name} ${hotel.location}`)}`}
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
            {filteredHotels.length === 0 && (
                <Typography variant="h6" align="center" sx={{ mt: 5, color: 'text.secondary' }}>
                    No hotels found matching your search.
                </Typography>
            )}
        </Container>
    );
};

export default Hotels;
