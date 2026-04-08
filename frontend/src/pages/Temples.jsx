import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';

const getMapEmbedUrl = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

const Temples = () => {
    const [temples, setTemples] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTemples = async () => {
            try {
                const res = await api.get('/temples');
                setTemples(res.data);
            } catch (err) {
                console.error('Failed to fetch temples', err);
            }
        };
        fetchTemples();
    }, []);

    const filteredTemples = temples.filter(temple =>
        temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        temple.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const mapQuery = searchTerm.trim() || 'Indian temples';

    return (
        <Container sx={{ py: 6 }} maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Explore Temples
                </Typography>
                <TextField
                    label="Search Temples or Location"
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 250 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>

            <Box sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: 3, minHeight: 280 }}>
                <iframe
                    title="Temples Map"
                    src={getMapEmbedUrl(mapQuery)}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 280 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>

            <Grid container spacing={4}>
                {filteredTemples.map((temple) => (
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
                            <Box sx={{ p: 2, pt: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Button size="small" variant="contained" component={Link} to={`/temples/${temple._id}`} sx={{ bgcolor: 'var(--primary-color)', width: '100%' }}>
                                    View Details & Book
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${temple.name} ${temple.location}`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    sx={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
                                >
                                    Open Map
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {filteredTemples.length === 0 && (
                <Typography variant="h6" align="center" sx={{ mt: 5, color: 'text.secondary' }}>
                    No temples found matching your search.
                </Typography>
            )}
        </Container>
    );
};

export default Temples;
