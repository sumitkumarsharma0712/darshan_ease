import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import api from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function TempleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingSlot, setBookingSlot] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const [tRes, sRes] = await Promise.all([
          api.get(`/temples/${id}`),
          api.get(`/slots/temple/${id}`)
        ]);
        setTemple(tRes.data);
        setSlots(sRes.data);
      } catch {
        toast.error("Failed to load temple");
        navigate("/temples");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleBook = async (slotId) => {
    if (!user) {
      toast.info("Please login to book a slot");
      navigate("/login");
      return;
    }
    setBookingSlot(slotId);
    try {
      await api.post("/bookings", { templeId: id, slotId });
      toast.success("🎉 Darshan booked successfully!");
      setSlots((prev) =>
        prev.map((s) =>
          s._id === slotId ? { ...s, availableSeats: s.availableSeats - 1 } : s
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingSlot(null);
    }
  };

  if (loading) return <LoadingSpinner text="Loading temple details..." />;
  if (!temple) return null;

  const openSlots = slots.filter((s) => s.status !== "CLOSED");

  return (
    <div className="page-container page-enter">
      {/* Temple Header */}
      <div className="temple-header">
        <div className="temple-header-image">
          {temple.imageUrl ? (
            <img src={temple.imageUrl} alt={temple.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            "🛕"
          )}
        </div>
        <div className="temple-header-content">
          <h1>{temple.name}</h1>
          <div className="temple-meta">
            <span>📍 {temple.location}</span>
            {temple.deity && <span>🙏 {temple.deity}</span>}
            {temple.timings && <span>🕐 {temple.timings}</span>}
          </div>
          {temple.description && (
            <p style={{ marginTop: "1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {temple.description}
            </p>
          )}
          <div className="temple-actions">
            <Link to={`/donate/${temple._id}`} className="btn btn-success" id="donate-btn">
              💛 Donate to this Temple
            </Link>
            <Link to="/temples" className="btn btn-ghost">
              ← Back to Temples
            </Link>
          </div>
        </div>
      </div>

      {/* Map & Info Section */}
      {(temple.latitude && temple.longitude) && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            background: "var(--bg-secondary)",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid var(--border-color)",
            minHeight: "300px"
          }}>
            <iframe
              title={`${temple.name} Location`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${temple.latitude},${temple.longitude}&hl=en&z=14&output=embed`}
            />
          </div>
          <div style={{
            background: "var(--bg-secondary)",
            borderRadius: "12px",
            padding: "1.5rem",
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}>
            <h3 style={{ color: "var(--primary-400)", margin: 0 }}>📍 Temple Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {temple.location && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}>
                  <span style={{ fontSize: "1.2rem" }}>🗺️</span>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Location</div>
                    <div>{temple.location}</div>
                  </div>
                </div>
              )}
              {temple.timings && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}>
                  <span style={{ fontSize: "1.2rem" }}>🕐</span>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Timings</div>
                    <div>{temple.timings}</div>
                  </div>
                </div>
              )}
              {temple.contactInfo && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}>
                  <span style={{ fontSize: "1.2rem" }}>📞</span>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Contact</div>
                    <div>{temple.contactInfo}</div>
                  </div>
                </div>
              )}
              {temple.deity && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}>
                  <span style={{ fontSize: "1.2rem" }}>🙏</span>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Deity</div>
                    <div>{temple.deity}</div>
                  </div>
                </div>
              )}
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${temple.latitude},${temple.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: "auto", textAlign: "center", textDecoration: "none" }}
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </div>
      )}

      {/* Slots Section */}
      <div className="section-header">
        <h2>Available Darshan Slots</h2>
        <p>{openSlots.length > 0 ? `${openSlots.length} slots available` : "No slots available at the moment"}</p>
      </div>

      {openSlots.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No slots available</h3>
          <p>Please check back later for new darshan slots</p>
        </div>
      ) : (
        <div>
          {openSlots.map((s) => (
            <div className="slot-item" key={s._id} id={`slot-${s._id}`}>
              <div className="slot-info">
                <span className="slot-date">📅 {s.date}</span>
                <span className="slot-time">🕐 {s.startTime} - {s.endTime}</span>
                <span className={`slot-seats ${s.availableSeats > 0 ? "available" : "full"}`}>
                  {s.availableSeats > 0 ? `${s.availableSeats} seats left` : "Full"}
                </span>
                {s.price > 0 && (
                  <span style={{ fontSize: "0.85rem", color: "var(--primary-400)", fontWeight: 600 }}>
                    ₹{s.price}
                  </span>
                )}
              </div>
              <button
                className="btn btn-primary btn-sm"
                disabled={s.availableSeats <= 0 || bookingSlot === s._id}
                onClick={() => handleBook(s._id)}
                id={`book-slot-${s._id}`}
              >
                {bookingSlot === s._id ? "Booking..." : s.availableSeats <= 0 ? "Full" : "Book Now"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
