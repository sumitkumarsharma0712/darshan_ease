import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Temples from "./pages/Temples.jsx";
import TempleDetail from "./pages/TempleDetail.jsx";
import Bookings from "./pages/Bookings.jsx";
import Donation from "./pages/Donation.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner text="Checking authentication..." />;
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner text="Checking permissions..." />;
  if (!user) return <Navigate to="/login" />;
  if (user.role === "ADMIN") return children;
  if (user.role === "ORGANIZER") {
    const path = location.pathname.toLowerCase();
    const isAllowed =
      path === "/admin" ||
      path.startsWith("/admin/slots");
    return isAllowed ? children : <Navigate to="/admin" />;
  }
  return <Navigate to="/" />;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-container">
        <LoadingSpinner text="Loading DarshanEase..." />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temples" element={<Temples />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/temples/:id" element={<TempleDetail />} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/donate/:id" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </div>
  );
}
