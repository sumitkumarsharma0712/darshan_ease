# DarshanEase - Temple & Hotel Booking Platform

DarshanEase is a comprehensive full-stack MERN web application that provides a seamless experience for temple darshan bookings and hotel accommodations for pilgrims. The platform features an intuitive interface with modern animations, dark/light mode toggle, and comprehensive booking management.

## ✨ Features

### 🏛️ Temple Management
- **10+ Famous Temples**: Tirupati Balaji, Kashi Vishwanath, Vaishno Devi, Golden Temple, and more
- **Darshan Slot Booking**: Real-time availability and booking system
- **Detailed Temple Information**: Location, timings, highlights, ratings, and Google Maps integration
- **Comprehensive Booking Forms**: Phone, age, gender, address, emergency contacts, and special requests

### 🏨 Hotel Booking System
- **Pilgrim Accommodations**: Hotels near major temples
- **Room Availability**: Real-time room booking with date selection
- **Detailed Hotel Information**: Amenities, pricing, ratings, and location maps
- **Complete Guest Details**: Full booking forms with all necessary information

### 🎨 Modern UI/UX
- **Animated Background**: Beautiful floating particles and gradient animations
- **Dark/Light Mode**: Complete theme system with persistent preferences
- **Responsive Design**: Mobile-first approach with Material-UI components
- **Watermark Branding**: Professional signature watermark

### 🔐 Authentication & Security
- **JWT Authentication**: Secure user login and registration
- **Role-Based Access**: Admin, Organizer, and User roles
- **Protected Routes**: Secure booking and dashboard access
- **Session Management**: Persistent login state

### 📊 Dashboard & Management
- **User Dashboard**: View and manage bookings
- **Booking History**: Complete booking records
- **Admin Panel**: Temple and hotel management (future feature)
- **Real-time Updates**: Live booking status

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI framework
- **Vite** - Fast build tool and development server
- **Material-UI** - Modern component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Notification system
- **Context API** - State management for auth and theme

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Database Models
- **User**: Authentication and role management
- **Temple**: Temple information and details
- **DarshanSlot**: Booking slots for temples
- **Booking**: Temple darshan bookings
- **Hotel**: Hotel information and availability
- **HotelBooking**: Hotel room reservations

## 📁 Project Structure

```
darshan_ease/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── hotelBookingController.js
│   │   ├── hotelController.js
│   │   ├── slotController.js
│   │   └── templeController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── DarshanSlot.js
│   │   ├── Hotel.js
│   │   ├── HotelBooking.js
│   │   ├── Temple.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── hotelBookingRoutes.js
│   │   ├── hotelRoutes.js
│   │   ├── slotRoutes.js
│   │   └── templeRoutes.js
│   ├── .env
│   ├── package.json
│   ├── seeder.js
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── temple-images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── HotelDetails.jsx
│   │   │   ├── Hotels.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── TempleDetails.jsx
│   │   │   └── Temples.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── vite.config.js
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/sumitkumarsharma0712/darshan_ease.git
cd darshan_ease
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy the example environment file and update with your values
cp .env.example .env
# Edit .env file with your actual values:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/darshanease
# JWT_SECRET=your_super_secret_jwt_key_here

# Seed initial data (temples, hotels, admin user)
npm run data:import

# Start the backend server
npm start
```
**Server runs on:** `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
**Frontend runs on:** `http://localhost:5173`

## 🎯 Usage

### For Users:
1. **Register/Login**: Create an account or sign in
2. **Explore Temples**: Browse available temples with detailed information
3. **Book Darshan**: Select temple, choose slot, fill booking details
4. **Book Hotels**: Find accommodations near temples
5. **Manage Bookings**: View and manage bookings in dashboard
6. **Toggle Theme**: Switch between light and dark modes

### Admin Features:
- **Default Admin Account**: `admin@example.com` / `password123`
- **Manage Temples**: Add/edit temple information
- **Manage Slots**: Create and manage darshan slots
- **User Management**: View user bookings and data

## 🎨 UI Features

### Animations & Effects
- **Floating Particles**: Subtle animated background elements
- **Gradient Backgrounds**: Multi-layered color transitions
- **Smooth Transitions**: Theme switching with CSS transitions
- **Hover Effects**: Interactive elements with smooth animations

### Dark Mode
- **Complete Theme System**: All components support dark/light modes
- **Persistent Preferences**: Theme choice saved in localStorage
- **Material-UI Integration**: Full MUI component theming
- **Accessibility**: Proper contrast ratios for both themes

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive layouts for tablets
- **Desktop Experience**: Full desktop functionality
- **Touch-Friendly**: Mobile-optimized interactions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Comprehensive form validation
- **CORS Protection**: Cross-origin resource sharing controls
- **Role-Based Access**: Different permissions for user types

## 🌟 Key Highlights

1. **Comprehensive Booking System**: Complete temple and hotel booking workflow
2. **Modern UI/UX**: Beautiful animations and professional design
3. **Theme Flexibility**: Dark/light mode with smooth transitions
4. **Real-time Availability**: Live slot and room availability
5. **Detailed Information**: Comprehensive temple and hotel data
6. **Mobile Responsive**: Works perfectly on all devices
7. **Secure Authentication**: Robust user management system
8. **Admin Dashboard**: Complete management interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Sumit Kumar Sharma**
- GitHub: [@sumitkumarsharma0712](https://github.com/sumitkumarsharma0712)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- Icons and images sourced from various free resources
- Material-UI for the component library
- React community for excellent documentation
- Open source contributors

---

**Made with ❤️ for devotees and pilgrims worldwide**
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Ensure the API endpoint is correctly mapped in `frontend/src/services/api.js` to point to `http://localhost:5000/api`.
4.  Start the Frontend Server:
    ```bash
    npm run dev
    ```
    *(App runs on http://localhost:5173)*

## Usage
-   **Users:** Can browse temples, search for specific locations, view available slots, and (after registering/logging in) book their darshan slots.
-   **Dashboard:** Logged-in users can manage (view or cancel) their darshan bookings.
-   **Booking Logic:** The application prevents booking if slots are full and correctly decrements/increments the available tickets during booking/cancellation.

## Testing
-   You can manually test the APIs directly via Postman using `http://localhost:5000/api`
-   Access the frontend from your browser to test the full User Interface.
