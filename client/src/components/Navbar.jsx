import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? "active" : "";

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    nav("/");
  };

  const navLinks = (
    <>
      <Link className={isActive("/")} to="/" onClick={() => setMobileOpen(false)}>
        🏛️ Temples
      </Link>
      {user && (
        <Link className={isActive("/bookings")} to="/bookings" onClick={() => setMobileOpen(false)}>
          📋 My Bookings
        </Link>
      )}
      {user && (user.role === "ADMIN" || user.role === "ORGANIZER") && (
        <Link className={isActive("/admin")} to="/admin" onClick={() => setMobileOpen(false)}>
          ⚙️ Dashboard
        </Link>
      )}
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" style={{ textDecoration: "none" }}>
          <span className="brand-icon">🙏</span>
          DarshanEase
        </Link>

        {/* Desktop links */}
        <div className="navbar-links desktop" style={{ display: undefined }}>
          {navLinks}
        </div>

        <div className="navbar-user">
          {!user ? (
            <div className="navbar-links" style={{ display: 'flex' }}>
              <Link to="/login" className={isActive("/login")}>Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="navbar-user-badge">{user.role}</span>
              <span className="navbar-user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                Logout
              </button>
            </div>
          )}
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar-links mobile-open">
          {navLinks}
          {!user ? (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
}
