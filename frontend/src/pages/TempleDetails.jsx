import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Box, CardMedia, Button, Paper, List, ListItem, ListItemText, Divider, Modal, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

import api from '../services/api';

const getMapEmbedUrl = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

const TempleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [temple, setTemple] = useState(null);
    const [slots, setSlots] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [persons, setPersons] = useState(1);
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [emergencyContact, setEmergencyContact] = useState({ name: '', phone: '' });
    const [specialRequests, setSpecialRequests] = useState('');

    useEffect(() => {
        const fetchTempleData = async () => {
            try {
                const resTemple = await api.get(`/temples/${id}`);
                setTemple(resTemple.data);

                const resSlots = await api.get(`/slots/temple/${id}`);
                setSlots(resSlots.data);
            } catch (err) {
                console.error('Failed to fetch temple details', err);
            }
        };
        fetchTempleData();
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            toast.info('Please login to book a darshan.');
            navigate('/login');
            return;
        }
        setOpenModal(true);
    };

    const confirmBooking = async () => {
        if (!selectedSlot) {
            toast.error('Please select a slot.');
            return;
        }
        if (!phone || !age || !gender || !address) {
            toast.error('Please fill in all required fields.');
            return;
        }
        try {
            await api.post('/bookings', {
                slotId: selectedSlot,
                persons: parseInt(persons, 10),
                phone,
                age: parseInt(age, 10),
                gender,
                address,
                emergencyContact,
                specialRequests
            });
            toast.success(`Booking confirmed for ${persons} person(s)!`);
            setOpenModal(false);
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed.');
        }
    };

    if (!temple) return <Container sx={{ py: 6 }}><Typography>Loading...</Typography></Container>;

    const mapQuery = `${temple.name} ${temple.location}`;

    return (
        <Container sx={{ py: 6 }} maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <CardMedia
                        component="img"
                        image={temple.imageUrl}
                        alt={temple.name}
                        sx={{ borderRadius: 2, height: 400, objectFit: 'cover' }}
                    />
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                            {temple.name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            📍 {temple.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {temple.address}
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ mt: 2, fontSize: '1.1rem' }}>
                            {temple.description}
                        </Typography>
                        <Box sx={{ display: 'grid', gap: 1, mb: 2 }}>
                            <Typography variant="body2"><strong>Opening Hours:</strong> {temple.openingHours}</Typography>
                            <Typography variant="body2"><strong>Best time to visit:</strong> {temple.bestTimeToVisit}</Typography>
                            <Typography variant="body2"><strong>Rating:</strong> {temple.rating?.toFixed(1) || '4.7'}</Typography>
                        </Box>
                        {temple.highlights?.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" gutterBottom>Highlights</Typography>
                                <List>
                                    {temple.highlights.map((point, index) => (
                                        <ListItem key={index} sx={{ py: 0 }}>
                                            <ListItemText primary={point} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                            Temple Location
                        </Typography>
                        <Box sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3, minHeight: 280 }}>
                            <iframe
                                title="Temple Location Map"
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
                            sx={{ mt: 2, borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                        >
                            Open in Google Maps
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Available Darshan Slots
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                            Select a slot to book your visit.
                        </Typography>

                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {slots.length === 0 && (
                                <Typography sx={{ p: 2, color: 'text.secondary' }}>
                                    No slots are currently available for this temple.
                                </Typography>
                            )}
                            {slots.map((slot) => (
                                <React.Fragment key={slot._id}>
                                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                                        <ListItemText
                                            primary={`${slot.date} | ${slot.time}`}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                                        {slot.poojaType}
                                                    </Typography>
                                                    {` — ${slot.availableTickets} tickets available`}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))}
                        </List>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ mt: 3, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: '#e65100' } }}
                            onClick={handleBooking}
                        >
                            Book Darshan Slot
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Booking Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="booking-modal-title">
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 500, maxHeight: '90vh', overflow: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4
                }}>
                    <Typography id="booking-modal-title" variant="h6" component="h2" mb={2}>
                        Confirm Booking - {temple.name}
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="slot-select-label">Select Slot</InputLabel>
                        <Select
                            labelId="slot-select-label"
                            value={selectedSlot}
                            label="Select Slot"
                            onChange={(e) => setSelectedSlot(e.target.value)}
                        >
                            {slots.map(slot => (
                                <MenuItem key={slot._id} value={slot._id}>
                                    {slot.date} {slot.time} - {slot.poojaType}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="person-select-label">Number of Persons</InputLabel>
                        <Select
                            labelId="person-select-label"
                            value={persons}
                            label="Number of Persons"
                            onChange={(e) => setPersons(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5, 6].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                        </Select>
                    </FormControl>
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
                        Confirm & Proceed
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default TempleDetails;
