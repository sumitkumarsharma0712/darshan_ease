# DarshanEase Ticket Booking App

DarshanEase is a full-stack MERN web application that allows users to explore temples, view available darshan slots, and book tickets online seamlessly. It offers a convenient platform for devotees to reserve their spots for darshan.

## Tech Stack
-   **Frontend:** React.js, Vite, Material-UI, React Router Dom, Axios, React Toastify
-   **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth, Bcrypt
-   **Database:** MongoDB

## Folder Structure
-   `frontend/` - Contains the React Vite Application
-   `backend/` - Contains the Node.js Express Application

## Setup and Installation

### 1. Requirements
-   Node.js installed (v16+)
-   MongoDB installed locally and running on port 27017, OR a MongoDB Atlas URI

### 2. Backend Setup
1.  Open a terminal and navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    -   Ensure the `.env` file exists in `backend/` with the following variables:
      ```
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/darshanease
      JWT_SECRET=your_jwt_secret_key_here
      ```
4.  Seed Initial Data (Temples, Slots, Admin User):
    ```bash
    npm run data:import
    ```
    *(Note: This creates mock temples and an admin user: `admin@example.com` / `password123`)*
5.  Start the Backend Server:
    ```bash
    npm start
    ```
    *(Server runs on http://localhost:5000)*

### 3. Frontend Setup
1.  Open a second terminal and navigate to the frontend directory:
    ```bash
    cd frontend
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
