# 🙏 DarshanEase

> **Temple Darshan Booking Platform** — Book your temple visits online, skip the queues.

A full-stack MERN application for browsing temples, booking darshan slots, and making donations. Built with React + Vite frontend and Express + MongoDB backend.

---

## ✨ Features

- 🏛️ **Temple Browsing** — Search and explore temples by name, location, or deity
- 📅 **Slot Booking** — Book available darshan time slots with real-time availability
- 💛 **Donations** — Support temples with preset or custom donation amounts
- 📋 **Booking Management** — View, manage, and cancel your bookings
- ⚙️ **Admin Dashboard** — Full management panel with stats, tables, and CRUD
- 🔐 **Secure Auth** — JWT-based authentication with role-based access control
- 🎨 **Premium UI** — Dark saffron/gold themed design with smooth animations

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **MongoDB** running locally or [MongoDB Atlas](https://cloud.mongodb.com) (free tier)

### 1. Clone & Setup

```bash
git clone <your-repo>
cd "Mern Stack"
```

### 2. Backend Setup

```bash
cd server
cp .env.example .env     # Edit .env with your MongoDB URI
npm install
npm run dev              # Starts on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd client
cp .env.example .env     # Should point to http://localhost:5000/api
npm install
npm run dev              # Starts on http://localhost:3000
```

### 4. Run Tests

```bash
cd server
npm test                 # Uses mongodb-memory-server (no real DB needed)
```

---

## 🔑 Environment Variables

### Server (`server/.env`)
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/darshanease
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Client (`client/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/temples` | — | List temples (paginated, searchable) |
| GET | `/api/temples/:id` | — | Temple details |
| POST | `/api/temples` | Admin | Create temple |
| PUT | `/api/temples/:id` | Admin | Update temple |
| DELETE | `/api/temples/:id` | Admin | Delete temple |
| GET | `/api/slots/temple/:id` | — | List slots for temple |
| POST | `/api/slots` | Admin/Org | Create slot |
| PUT | `/api/slots/:id` | Admin/Org | Update slot |
| DELETE | `/api/slots/:id` | Admin/Org | Delete slot |
| POST | `/api/bookings` | ✅ | Create booking |
| GET | `/api/bookings/me` | ✅ | My bookings |
| DELETE | `/api/bookings/:id` | ✅ | Cancel booking |
| GET | `/api/bookings` | Admin | All bookings |
| POST | `/api/donations` | ✅ | Make donation |
| GET | `/api/donations/me` | ✅ | My donations |
| GET | `/api/donations` | Admin | All donations |
| GET | `/api/donations/stats` | Admin | Donation statistics |

---

## 🛡️ Security

- Passwords hashed with **bcrypt** (12 salt rounds)
- JWT tokens with 7-day expiry
- Registration **always** creates USER role (prevents privilege escalation)
- Input validation on all endpoints
- Error handler only exposes stack traces in development

---

## 📄 License

MIT
