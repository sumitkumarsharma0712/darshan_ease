import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Box, CardMedia, Button, Paper, List, ListItem, ListItemText, Divider, Modal, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../services/api';

const getMapEmbedUrl = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [hotel, setHotel] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [rooms, setRooms] = useState(1);
    const [guests, setGuests] = useState(1);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [emergencyContact, setEmergencyContact] = useState({ name: '', phone: '' });
    const [specialRequests, setSpecialRequests] = useState('');

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const res = await api.get(`/hotels/${id}`);
                setHotel(res.data);
            } catch (err) {
                console.error('Failed to fetch hotel details', err);
            }
        };
        fetchHotelData();
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            toast.info('Please login to book a room.');
            navigate('/login');
            return;
        }
        setOpenModal(true);
    };

    const confirmBooking = async () => {
        if (!checkInDate || !checkOutDate) {
            toast.error('Please select both check-in and check-out dates.');
            return;
        }
        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            toast.error('Check-out must be after check-in.');
            return;
        }
        if (!phone || !age || !gender || !address) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            await api.post('/hotel-bookings', {
                hotelId: hotel._id,
                rooms,
                guests,
                checkInDate,
                checkOutDate,
                phone,
                age: parseInt(age, 10),
                gender,
                address,
                emergencyContact,
                specialRequests,
            });
            toast.success(`Room booking confirmed for ${rooms} room(s)!`);
            setOpenModal(false);
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed.');
        }
    };

    if (!hotel) return <Container sx={{ py: 6 }}><Typography>Loading...</Typography></Container>;

    const mapQuery = `${hotel.name} ${hotel.location}`;

    return (
        <Container sx={{ py: 6 }} maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <CardMedia
                        component="img"
                        image={hotel.imageUrl}
                        alt={hotel.name}
                        sx={{ borderRadius: 2, height: 420, objectFit: 'cover' }}
                    />
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                            {hotel.name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            📍 {hotel.location}
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ mt: 2, fontSize: '1.05rem' }}>
                            {hotel.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Address: {hotel.address}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Rooms available: {hotel.availableRooms}
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 3 }}>
                            ₹{hotel.pricePerNight} per night
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                            Amenities
                        </Typography>
                        <List>
                            {hotel.amenities?.map((amenity, index) => (
                                <ListItem key={index} sx={{ py: 0 }}>
                                    <ListItemText primary={amenity} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Book Your Room
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                            Book instantly and secure your stay near this temple.
                        </Typography>

                        <Box sx={{ display: 'grid', gap: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="rooms-select-label">Rooms</InputLabel>
                                <Select
                                    labelId="rooms-select-label"
                                    value={rooms}
                                    label="Rooms"
                                    onChange={(e) => setRooms(e.target.value)}
                                >
                                    {[1, 2, 3, 4].map((n) => (
                                        <MenuItem key={n} value={n}>{n}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="guests-select-label">Guests</InputLabel>
                                <Select
                                    labelId="guests-select-label"
                                    value={guests}
                                    label="Guests"
                                    onChange={(e) => setGuests(e.target.value)}
                                >
                                    {[1, 2, 3, 4, 5, 6].map((n) => (
                                        <MenuItem key={n} value={n}>{n}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                type="date"
                                label="Check-in"
                                InputLabelProps={{ shrink: true }}
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                type="date"
                                label="Check-out"
                                InputLabelProps={{ shrink: true }}
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                fullWidth
                            />

                            <Button variant="contained" fullWidth sx={{ bgcolor: 'var(--primary-color)' }} onClick={handleBooking}>
                                Reserve Now
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mt: 4, borderRadius: 3, overflow: 'hidden', boxShadow: 3, minHeight: 280 }}>
                <iframe
                    title="Hotel Location Map"
                    src={getMapEmbedUrl(mapQuery)}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 280 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>

            <Button
                component="a"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                sx={{ mt: 3, borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
            >
                Open in Google Maps
            </Button>

            <Modal open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="booking-modal-title">
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 500, maxHeight: '90vh', overflow: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4
                }}>
                    <Typography id="booking-modal-title" variant="h6" component="h2" mb={2}>
                        Confirm Room Booking - {hotel.name}
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="rooms-select-label">Number of Rooms</InputLabel>
                        <Select
                            labelId="rooms-select-label"
                            value={rooms}
                            label="Number of Rooms"
                            onChange={(e) => setRooms(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="guests-select-label">Number of Guests</InputLabel>
                        <Select
                            labelId="guests-select-label"
                            value={guests}
                            label="Number of Guests"
                            onChange={(e) => setGuests(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Check-in Date"
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Check-out Date"
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            value={gender}
                            label="Gender"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Address"
                        multiline
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Emergency Contact</Typography>
                    <TextField
                        fullWidth
                        label="Emergency Contact Name"
                        value={emergencyContact.name}
                        onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Emergency Contact Phone"
                        value={emergencyContact.phone}
                        onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Special Requests"
                        multiline
                        rows={2}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <Button variant="contained" fullWidth sx={{ bgcolor: 'var(--primary-color)' }} onClick={confirmBooking}>
                        Confirm Reservation
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default HotelDetails;
