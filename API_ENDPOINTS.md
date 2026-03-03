# DarshanEase API

## Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (auth)

## Temples
- GET /api/temples
- GET /api/temples/:id
- POST /api/temples (admin)
- PUT /api/temples/:id (admin)
- DELETE /api/temples/:id (admin)

## Slots
- GET /api/slots/temple/:templeId
- POST /api/slots (admin|organizer)
- PUT /api/slots/:id (admin|organizer)
- DELETE /api/slots/:id (admin|organizer)

## Bookings
- POST /api/bookings (auth)
- GET /api/bookings/me (auth)
- DELETE /api/bookings/:id (auth)
- GET /api/bookings (admin)

## Donations
- POST /api/donations (auth)
- GET /api/donations/me (auth)
- GET /api/donations (admin)
