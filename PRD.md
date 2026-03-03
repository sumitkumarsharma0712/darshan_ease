# DarshanEase — Product Requirements Document

## 1. Product Overview
**DarshanEase** is a full-stack web application that enables devotees to book temple darshan (worship) slots online. The platform eliminates long queues and provides a seamless, digital-first experience for temple visits across India.

## 2. Target Users
- **Devotees (Users):** Register, browse temples, book darshan slots, make donations
- **Temple Organizers:** Manage their temple's darshan slots and schedules
- **Admins:** Full platform management — temples, slots, bookings, donations

## 3. Core Features

### 3.1 Authentication & Authorization
- User registration with email/password (role always defaults to USER for security)
- JWT-based login with 7-day token expiry
- Role-based access control: USER, ORGANIZER, ADMIN
- Protected routes for authenticated and role-specific actions

### 3.2 Temple Management
- Browse temples with search (by name, location, deity)
- Paginated temple listing with total count
- Temple details with description, deity, timings, image, and contact info
- ADMIN-only: Create, update, and delete temples

### 3.3 Darshan Slot Booking
- View available slots for each temple (date, time, capacity)
- Real-time seat availability tracking
- One booking per user per slot (with duplicate prevention)
- Booking cancellation with automatic seat restoration
- Slot auto-status: OPEN → FULL when seats run out

### 3.4 Donations
- Donate to any temple with preset or custom amounts
- Optional message and anonymous donation support
- Donation history for users
- Admin donation analytics with aggregated stats

### 3.5 Admin Dashboard
- Overview with stat cards (temples, bookings, donations)
- Tabbed interface for managing each entity
- Data tables for all bookings and donations
- Temple CRUD with image URL and extended fields
- Slot creation with date, time, capacity, and pricing

## 4. Non-Functional Requirements
- Responsive design (mobile, tablet, desktop)
- Premium dark-themed UI with warm saffron/gold aesthetics
- Loading states and error handling on all pages
- Centralized API service with auto-auth token injection
- Security: role escalation prevention, input validation, bcrypt password hashing
