import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [temples, setTemples] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [donations, setDonations] = useState([]);
  const [donationStats, setDonationStats] = useState({ totalAmount: 0, totalCount: 0 });
  const [loading, setLoading] = useState(true);

  // Temple form
  const [templeForm, setTempleForm] = useState({
    name: "", location: "", description: "", deity: "", imageUrl: "", timings: ""
  });

  // Slot form
  const [slotForm, setSlotForm] = useState({
    temple: "", date: "", startTime: "", endTime: "", capacity: 10, price: 0
  });

  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const [templesRes, bookingsRes, donationsRes, statsRes] = await Promise.all([
        api.get("/temples"),
        api.get("/bookings").catch(() => ({ data: [] })),
        api.get("/donations").catch(() => ({ data: [] })),
        api.get("/donations/stats").catch(() => ({ data: { totalAmount: 0, totalCount: 0 } }))
      ]);
      setTemples(templesRes.data.temples || templesRes.data || []);
      setBookings(bookingsRes.data || []);
      setDonations(donationsRes.data || []);
      setDonationStats(statsRes.data || { totalAmount: 0, totalCount: 0 });
    } catch {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTemple = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/temples", templeForm);
      toast.success("Temple created! 🛕");
      setTempleForm({ name: "", location: "", description: "", deity: "", imageUrl: "", timings: "" });
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create temple");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTemple = async (id) => {
    if (!confirm("Are you sure you want to delete this temple?")) return;
    try {
      await api.delete(`/temples/${id}`);
      toast.success("Temple deleted");
      loadData();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/slots", slotForm);
      toast.success("Slot created! 📅");
      setSlotForm({ temple: "", date: "", startTime: "", endTime: "", capacity: 10, price: 0 });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create slot");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");

  return (
    <div className="page-container page-enter">
      <div className="section-header">
        <h2>Admin Dashboard</h2>
        <p>Manage temples, slots, bookings, and donations</p>
      </div>

      {/* Stats Cards */}
      <div className="admin-grid">
        <div className="stat-card">
          <div className="stat-icon">🛕</div>
          <div className="stat-value">{temples.length}</div>
          <div className="stat-label">Total Temples</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{confirmedBookings.length}</div>
          <div className="stat-label">Active Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{donationStats.totalAmount?.toLocaleString() || 0}</div>
          <div className="stat-label">{donationStats.totalCount || 0} Donations</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["overview", "temples", "slots", "bookings", "donations"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            id={`admin-tab-${tab}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div className="admin-section">
            <h3>Recent Bookings</h3>
            {bookings.length === 0 ? (
              <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem" }}>No bookings yet</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Temple</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 10).map((b) => (
                    <tr key={b._id}>
                      <td>{b.user?.name || "N/A"}</td>
                      <td>{b.temple?.name || "N/A"}</td>
                      <td>{b.slot?.date || "N/A"}</td>
                      <td>{b.slot?.startTime || ""} - {b.slot?.endTime || ""}</td>
                      <td>
                        <span className={`booking-status ${b.status?.toLowerCase()}`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="admin-section">
            <h3>Recent Donations</h3>
            {donations.length === 0 ? (
              <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem" }}>No donations yet</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Temple</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.slice(0, 10).map((d) => (
                    <tr key={d._id}>
                      <td>{d.isAnonymous ? "Anonymous" : d.user?.name || "N/A"}</td>
                      <td>{d.temple?.name || "N/A"}</td>
                      <td style={{ color: "var(--primary-400)", fontWeight: 600 }}>₹{d.amount?.toLocaleString()}</td>
                      <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Temples Tab */}
      {activeTab === "temples" && (
        <div>
          <div className="admin-section">
            <h3>Create New Temple</h3>
            <form onSubmit={handleCreateTemple} id="admin-temple-form">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Temple Name *</label>
                  <input
                    className="form-control"
                    value={templeForm.name}
                    onChange={(e) => setTempleForm({ ...templeForm, name: e.target.value })}
                    placeholder="e.g. Tirupati Balaji Temple"
                    required
                    id="admin-temple-name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    className="form-control"
                    value={templeForm.location}
                    onChange={(e) => setTempleForm({ ...templeForm, location: e.target.value })}
                    placeholder="e.g. Tirumala, Andhra Pradesh"
                    required
                    id="admin-temple-location"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Deity</label>
                  <input
                    className="form-control"
                    value={templeForm.deity}
                    onChange={(e) => setTempleForm({ ...templeForm, deity: e.target.value })}
                    placeholder="e.g. Lord Venkateswara"
                    id="admin-temple-deity"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Timings</label>
                  <input
                    className="form-control"
                    value={templeForm.timings}
                    onChange={(e) => setTempleForm({ ...templeForm, timings: e.target.value })}
                    placeholder="e.g. 6 AM - 9 PM"
                    id="admin-temple-timings"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={templeForm.description}
                  onChange={(e) => setTempleForm({ ...templeForm, description: e.target.value })}
                  placeholder="Brief description of the temple..."
                  id="admin-temple-desc"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  className="form-control"
                  value={templeForm.imageUrl}
                  onChange={(e) => setTempleForm({ ...templeForm, imageUrl: e.target.value })}
                  placeholder="https://example.com/temple.jpg"
                  id="admin-temple-image"
                />
              </div>
              <button className="btn btn-primary" disabled={submitting} id="admin-temple-submit">
                {submitting ? "Creating..." : "Create Temple"}
              </button>
            </form>
          </div>

          <div className="admin-section">
            <h3>All Temples ({temples.length})</h3>
            {temples.length === 0 ? (
              <p style={{ color: "var(--text-tertiary)" }}>No temples created yet</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Deity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {temples.map((t) => (
                    <tr key={t._id}>
                      <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{t.name}</td>
                      <td>{t.location}</td>
                      <td>{t.deity || "—"}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteTemple(t._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Slots Tab */}
      {activeTab === "slots" && (
        <div className="admin-section">
          <h3>Create Darshan Slot</h3>
          <form onSubmit={handleCreateSlot} id="admin-slot-form">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Temple *</label>
                <select
                  className="form-control"
                  value={slotForm.temple}
                  onChange={(e) => setSlotForm({ ...slotForm, temple: e.target.value })}
                  required
                  id="admin-slot-temple"
                >
                  <option value="">Select a temple</option>
                  {temples.map((t) => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={slotForm.date}
                  onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })}
                  required
                  id="admin-slot-date"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Start Time *</label>
                <input
                  type="time"
                  className="form-control"
                  value={slotForm.startTime}
                  onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
                  required
                  id="admin-slot-start"
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Time *</label>
                <input
                  type="time"
                  className="form-control"
                  value={slotForm.endTime}
                  onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                  required
                  id="admin-slot-end"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Capacity *</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={slotForm.capacity}
                  onChange={(e) => setSlotForm({ ...slotForm, capacity: Number(e.target.value) })}
                  required
                  id="admin-slot-capacity"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={slotForm.price}
                  onChange={(e) => setSlotForm({ ...slotForm, price: Number(e.target.value) })}
                  id="admin-slot-price"
                />
              </div>
            </div>
            <button className="btn btn-primary" disabled={submitting} id="admin-slot-submit">
              {submitting ? "Creating..." : "Create Slot"}
            </button>
          </form>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="admin-section">
          <h3>All Bookings ({bookings.length})</h3>
          {bookings.length === 0 ? (
            <p style={{ color: "var(--text-tertiary)" }}>No bookings yet</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Temple</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td style={{ fontWeight: 500 }}>{b.user?.name || "N/A"}</td>
                    <td>{b.user?.email || "N/A"}</td>
                    <td>{b.temple?.name || "N/A"}</td>
                    <td>{b.slot?.date || "N/A"}</td>
                    <td>{b.slot?.startTime || ""} - {b.slot?.endTime || ""}</td>
                    <td>
                      <span className={`booking-status ${b.status?.toLowerCase()}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Donations Tab */}
      {activeTab === "donations" && (
        <div className="admin-section">
          <h3>All Donations ({donations.length}) — Total: ₹{donationStats.totalAmount?.toLocaleString() || 0}</h3>
          {donations.length === 0 ? (
            <p style={{ color: "var(--text-tertiary)" }}>No donations yet</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Temple</th>
                  <th>Amount</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d._id}>
                    <td>{d.isAnonymous ? "Anonymous" : (d.user?.name || "N/A")}</td>
                    <td>{d.temple?.name || "N/A"}</td>
                    <td style={{ color: "var(--primary-400)", fontWeight: 600 }}>₹{d.amount?.toLocaleString()}</td>
                    <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {d.message || "—"}
                    </td>
                    <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
