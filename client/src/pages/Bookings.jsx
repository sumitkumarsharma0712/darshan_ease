import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings/me");
      setBookings(res.data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    setCancelling(id);
    try {
      await api.delete(`/bookings/${id}`);
      toast.success("Booking cancelled");
      loadBookings();
    } catch {
      toast.error("Cancellation failed");
    } finally {
      setCancelling(null);
    }
  };

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const cancelled = bookings.filter((b) => b.status === "CANCELLED");

  if (loading) return <LoadingSpinner text="Loading your bookings..." />;

  return (
    <div className="page-container page-enter">
      <div className="section-header">
        <h2>My Bookings</h2>
        <p>
          {confirmed.length > 0
            ? `${confirmed.length} active booking${confirmed.length > 1 ? "s" : ""}`
            : "Manage your darshan bookings"}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No bookings yet</h3>
          <p>Start by exploring and booking a temple darshan slot</p>
          <Link to="/temples" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
            Explore Temples
          </Link>
        </div>
      ) : (
        <>
          {confirmed.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1rem", fontFamily: "var(--font-sans)", color: "var(--success)", marginBottom: "1rem" }}>
                ✅ Active Bookings
              </h3>
              {confirmed.map((b) => (
                <div className="booking-item" key={b._id} id={`booking-${b._id}`}>
                  <div className="booking-details">
                    <h4>{b.temple?.name || "Temple"}</h4>
                    <div className="booking-meta">
                      <span>📍 {b.temple?.location || ""}</span>
                      <span>📅 {b.slot?.date || "N/A"}</span>
                      <span>🕐 {b.slot?.startTime || ""} - {b.slot?.endTime || ""}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="booking-status confirmed">Confirmed</span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancel(b._id)}
                      disabled={cancelling === b._id}
                      id={`cancel-booking-${b._id}`}
                    >
                      {cancelling === b._id ? "Cancelling..." : "Cancel"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cancelled.length > 0 && (
            <div>
              <h3 style={{ fontSize: "1rem", fontFamily: "var(--font-sans)", color: "var(--text-tertiary)", marginBottom: "1rem" }}>
                Cancelled Bookings
              </h3>
              {cancelled.map((b) => (
                <div className="booking-item" key={b._id} style={{ opacity: 0.6 }}>
                  <div className="booking-details">
                    <h4>{b.temple?.name || "Temple"}</h4>
                    <div className="booking-meta">
                      <span>📅 {b.slot?.date || "N/A"}</span>
                      <span>🕐 {b.slot?.startTime || ""} - {b.slot?.endTime || ""}</span>
                    </div>
                  </div>
                  <span className="booking-status cancelled">Cancelled</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
