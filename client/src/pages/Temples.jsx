import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function Temples() {
  const [temples, setTemples] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTemples = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const params = { limit: 50 };
      if (search.trim()) params.search = search.trim();
      const res = await api.get("/temples", { params });
      setTemples(res.data.temples || []);
      setTotal(res.data.total || 0);
    } catch {
      setTemples([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemples();
  }, [fetchTemples]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTemples(query);
  };

  return (
    <div className="page-container page-enter">
      <div className="section-header" style={{ textAlign: "center" }}>
        <h2>🛕 Explore Sacred Temples</h2>
        <p style={{ maxWidth: 560, margin: "0.5rem auto 0" }}>
          {total > 0
            ? `${total} temples across India — browse, discover, and plan your divine darshan`
            : "Discover sacred temples near you"}
        </p>
      </div>

      <form className="search-bar" onSubmit={handleSearch} id="temple-search-form">
        <input
          className="form-control"
          placeholder="Search temples by name, location, or deity..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id="temple-search-input"
        />
        <button className="btn btn-primary" type="submit" id="temple-search-btn">
          🔍 Search
        </button>
        {query && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => { setQuery(""); fetchTemples(); }}
          >
            Clear
          </button>
        )}
      </form>

      {loading ? (
        <LoadingSpinner text="Loading temples..." />
      ) : temples.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏛️</div>
          <h3>No temples found</h3>
          <p>{query ? "Try a different search term" : "Temples will appear here once added by admins"}</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {temples.map((t) => (
            <div className="temple-card-wrapper" key={t._id} id={`temple-card-${t._id}`}>
              <Link
                to={`/temples/${t._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card temple-explore-card">
                  <div className="card-image">
                    {t.imageUrl ? (
                      <img
                        src={t.imageUrl}
                        alt={t.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      "🛕"
                    )}
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{t.name}</h4>
                    <div className="card-subtitle">📍 {t.location}</div>
                    {t.deity && (
                      <div className="card-subtitle" style={{ marginBottom: "0.25rem" }}>
                        🙏 {t.deity}
                      </div>
                    )}
                    {t.timings && (
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(255,193,7,0.1)",
                        color: "var(--primary-400)",
                        marginBottom: "0.5rem"
                      }}>
                        🕐 {t.timings}
                      </div>
                    )}
                    {t.description && (
                      <p className="card-text" style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        {t.description}
                      </p>
                    )}
                  </div>
                  <div className="card-footer">
                    <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
                      View Details →
                    </span>
                    {(t.latitude && t.longitude) && (
                      <span style={{
                        fontSize: "0.75rem",
                        color: "var(--primary-400)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}>
                        📍 Map
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              {/* Google Maps link below each card */}
              {(t.latitude && t.longitude) && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${t.latitude},${t.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="temple-map-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  🗺️ Open in Google Maps
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
