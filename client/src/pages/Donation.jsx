import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const PRESET_AMOUNTS = [101, 251, 501, 1001, 2501, 5001];

export default function Donation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [amount, setAmount] = useState(501);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);

  useEffect(() => {
    api.get(`/temples/${id}`)
      .then((res) => setTemple(res.data))
      .catch(() => {
        toast.error("Temple not found");
        navigate("/temples");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (amount < 1) {
      toast.error("Please enter a valid amount");
      return;
    }
    setDonating(true);
    try {
      await api.post("/donations", {
        templeId: id,
        amount,
        message,
        isAnonymous
      });
      toast.success("🙏 Thank you for your generous donation!");
      setAmount(501);
      setMessage("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Donation failed");
    } finally {
      setDonating(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading..." />;
  if (!temple) return null;

  return (
    <div className="page-container page-enter">
      <Link to={`/temples/${temple._id}`} className="btn btn-ghost" style={{ marginBottom: "1.5rem" }}>
        ← Back to {temple.name}
      </Link>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Donation Form */}
        <div style={{ flex: "1 1 400px" }}>
          <div className="card" style={{ cursor: "default" }}>
            <div className="card-body" style={{ padding: "2rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>💛 Make a Donation</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Support {temple.name} with your generous contribution
              </p>

              <form onSubmit={handleDonate} id="donation-form">
                <label className="form-label">Select Amount (₹)</label>
                <div className="donate-amounts">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      type="button"
                      key={a}
                      className={`amount-btn ${amount === a ? "active" : ""}`}
                      onClick={() => setAmount(a)}
                    >
                      ₹{a.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Custom Amount</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    id="donation-amount"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message (optional)</label>
                  <input
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Blessings for my family..."
                    maxLength={500}
                    id="donation-message"
                  />
                </div>

                <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    id="donation-anonymous"
                    style={{ accentColor: "var(--primary-500)" }}
                  />
                  <label htmlFor="donation-anonymous" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", cursor: "pointer" }}>
                    Make this donation anonymous
                  </label>
                </div>

                <button
                  className="btn btn-success btn-lg"
                  style={{ width: "100%" }}
                  disabled={donating || amount < 1}
                  id="donation-submit"
                >
                  {donating ? "Processing..." : `Donate ₹${amount.toLocaleString()}`}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Temple Info Sidebar */}
        <div style={{ flex: "0 1 320px" }}>
          <div className="card" style={{ cursor: "default" }}>
            <div className="card-image" style={{ height: "160px" }}>
              {temple.imageUrl ? (
                <img src={temple.imageUrl} alt={temple.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                "🛕"
              )}
            </div>
            <div className="card-body">
              <h4 className="card-title">{temple.name}</h4>
              <div className="card-subtitle">📍 {temple.location}</div>
              {temple.deity && <div className="card-subtitle">🙏 {temple.deity}</div>}
              {temple.description && (
                <p className="card-text" style={{ fontSize: "0.85rem" }}>{temple.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
