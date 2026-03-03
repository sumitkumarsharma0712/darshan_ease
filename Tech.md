# DarshanEase — Technical Architecture

## Technology Stack

### Backend
| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | 18+ |
| Framework | Express.js | 4.19.x |
| Database | MongoDB | 7.x (Mongoose 8.x) |
| Auth | JWT (jsonwebtoken) | 9.x |
| Password Hashing | bcryptjs | 2.x (12 salt rounds) |
| Logging | Morgan | 1.10.x |
| Testing | Jest + Supertest + mongodb-memory-server | 29.x |

### Frontend
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.2.x |
| Build Tool | Vite | 5.x |
| Routing | React Router DOM | 6.22.x |
| HTTP Client | Axios | 1.6.x (centralized with interceptors) |
| Notifications | React Toastify | 9.x |
| Styling | Vanilla CSS (custom design system) | — |
| Fonts | Google Fonts (Inter + Playfair Display) | — |

## Architecture Decisions

### 1. Service Layer Pattern (Backend)
Controllers delegate all business logic to service modules. This separates HTTP concerns from domain logic, making the codebase testable and maintainable.

```
Routes → Controllers → Services → Models (Mongoose)
```

### 2. Security-First Auth
- Registration **always forces role=USER** — no client can escalate privilege via the registration endpoint
- JWT secrets are externalized via `.env`
- Password fields are stripped from all API responses via `toJSON()` on the User model
- Auth middleware validates tokens and populates `req.user`

### 3. Centralized API Client (Frontend)
A single Axios instance (`src/services/api.js`) handles:
- Base URL configuration
- Auto-attaching auth tokens via request interceptor
- Global 401 handling (auto-logout + redirect)
- Request timeout (15s)

### 4. CSS Design System
No CSS framework dependency. A custom design system in `index.css` provides:
- CSS custom properties for theming (colors, spacing, shadows, transitions)
- Component-scoped class names
- Responsive grid utilities
- Dark theme with warm saffron/gold palette
- Micro-animations and smooth transitions

### 5. Database Indexes
- `Temple`: text index on `(name, location, deity)` for fast search
- `DarshanSlot`: compound index on `(temple, date, startTime)` for sorted queries
- `Booking`: unique compound index on `(user, slot)` for duplicate prevention
- `User`: unique index on `email`

## Project Structure
```
├── server/
│   ├── config/          # DB connection
│   ├── controllers/     # HTTP handlers
│   ├── middleware/       # Auth + error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── services/        # Business logic
│   ├── tests/           # Jest integration tests
│   ├── app.js           # Express app setup
│   └── server.js        # Entry point
├── client/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React context (AuthContext)
│   │   ├── pages/       # Route-level page components
│   │   ├── services/    # API client
│   │   ├── App.jsx      # Root component + routing
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Design system
│   ├── index.html       # HTML entry
│   └── vite.config.js   # Vite configuration
```
