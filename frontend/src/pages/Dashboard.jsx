import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Chip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

import api from '../services/api';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [hotelBookings, setHotelBookings] = useState([]);
    const [openCancel, setOpenCancel] = useState(false);
    const [openCancelHotel, setOpenCancelHotel] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedHotelBooking, setSelectedHotelBooking] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await api.get('/bookings/mybookings');
                const formatted = res.data.map(b => ({
                    _id: b._id,
                    templeName: b.slot?.temple?.name || 'Unknown Temple',
                    date: b.slot?.date || 'Unknown Date',
                    time: b.slot?.time || 'Unknown Time',
                    persons: b.persons,
                    status: b.status
                }));
                setBookings(formatted);
            } catch (err) {
                console.error('Failed to fetch bookings', err);
            }
        };

        const fetchHotelBookings = async () => {
            try {
                const res = await api.get('/hotel-bookings/mybookings');
                const formatted = res.data.map(b => ({
                    _id: b._id,
                    hotelName: b.hotel?.name || 'Unknown Hotel',
                    checkInDate: b.checkInDate || 'Unknown',
                    checkOutDate: b.checkOutDate || 'Unknown',
                    guests: b.guests,
                    rooms: b.rooms,
                    totalPrice: b.totalPrice,
                    status: b.status,
                }));
                setHotelBookings(formatted);
            } catch (err) {
                console.error('Failed to fetch hotel bookings', err);
            }
        };

        if (user) {
            fetchBookings();
            fetchHotelBookings();
        }
    }, [user]);

    const handleCancelClick = (id) => {
        setSelectedBooking(id);
        setOpenCancel(true);
    };

    const confirmCancel = async () => {
        try {
            await api.delete(`/bookings/${selectedBooking}`);
            setBookings(bookings.filter(b => b._id !== selectedBooking));
            toast.success('Booking cancelled successfully.');
            setOpenCancel(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to cancel booking');
        }
    };

    const confirmCancelHotel = async () => {
        try {
            await api.delete(`/hotel-bookings/${selectedHotelBooking}`);
            setHotelBookings(hotelBookings.filter(b => b._id !== selectedHotelBooking));
            toast.success('Hotel booking cancelled successfully.');
            setOpenCancelHotel(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to cancel hotel booking');
        }
    };

    if (!user) return null;

    return (
        <Container sx={{ py: 6 }} maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Welcome, {user.name}
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Your Bookings
                </Typography>
                {bookings.length === 0 ? (
                    <Typography color="text.secondary">You have no bookings right now.</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {bookings.map((booking) => (
                            <Grid item xs={12} md={6} key={booking._id}>
                                <Paper elevation={2} sx={{ p: 3, borderLeft: '5px solid var(--primary-color)' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {booking.templeName}
                                        </Typography>
                                        <Chip
                                            label={booking.status}
                                            color={booking.status === 'CONFIRMED' ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Date:</strong> {booking.date}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Time:</strong> {booking.time}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        <strong>Persons:</strong> {booking.persons}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleCancelClick(booking._id)}>
                                            Cancel Booking
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Hotel Reservations
                </Typography>
                {hotelBookings.length === 0 ? (
                    <Typography color="text.secondary">You have no hotel reservations yet.</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {hotelBookings.map((booking) => (
                            <Grid item xs={12} md={6} key={booking._id}>
                                <Paper elevation={2} sx={{ p: 3, borderLeft: '5px solid #1976d2' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {booking.hotelName}
                                        </Typography>
                                        <Chip
                                            label={booking.status}
                                            color={booking.status === 'CONFIRMED' ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Check-in:</strong> {booking.checkInDate}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Check-out:</strong> {booking.checkOutDate}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Rooms:</strong> {booking.rooms}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Guests:</strong> {booking.guests}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        <strong>Total:</strong> ₹{booking.totalPrice}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="outlined" color="error" size="small" onClick={() => { setSelectedHotelBooking(booking._id); setOpenCancelHotel(true); }}>
                                            Cancel Reservation
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Cancel Confirmation Dialog */}
            <Dialog open={openCancel} onClose={() => setOpenCancel(false)}>
                <DialogTitle>Cancel Booking?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel this darshan booking? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCancel(false)}>No, Keep it</Button>
                    <Button onClick={confirmCancel} color="error" autoFocus>
                        Yes, Cancel Default
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCancelHotel} onClose={() => setOpenCancelHotel(false)}>
                <DialogTitle>Cancel Hotel Reservation?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel this hotel reservation? Your room availability will be restored.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCancelHotel(false)}>No, Keep it</Button>
                    <Button onClick={confirmCancelHotel} color="error" autoFocus>
                        Yes, Cancel Reservation
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
