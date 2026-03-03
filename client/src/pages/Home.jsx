import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Home() {
    const { user } = useAuth();
    const [templeCount, setTempleCount] = useState(0);

    useEffect(() => {
        api.get("/temples?limit=1")
            .then((res) => setTempleCount(res.data.total || 0))
            .catch(() => { });
    }, []);

    return (
        <div className="page-enter">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Divine Darshan, Made Simple</h1>
                    <p>
                        Skip the queues and book your temple darshan slots in advance.
                        Seamless booking, peaceful worship — the way it should be.
                    </p>
                    <div className="hero-actions">
                        <Link to="/temples" className="btn btn-primary btn-lg" id="hero-explore-btn">
                            🏛️ Explore Temples
                        </Link>
                        {!user && (
                            <Link to="/register" className="btn btn-secondary btn-lg" id="hero-signup-btn">
                                Create Free Account
                            </Link>
                        )}
                        {user && (
                            <Link to="/bookings" className="btn btn-secondary btn-lg" id="hero-bookings-btn">
                                📋 My Bookings
                            </Link>
                        )}
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">{templeCount || "50+"}</div>
                            <div className="hero-stat-label">Temples Listed</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">10K+</div>
                            <div className="hero-stat-label">Happy Devotees</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">24/7</div>
                            <div className="hero-stat-label">Online Booking</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <div className="page-container">
                <div className="section-header" style={{ textAlign: "center", marginTop: "1rem" }}>
                    <h2>How It Works</h2>
                    <p>Book your darshan in 3 simple steps</p>
                </div>

                <div className="grid grid-3" style={{ marginBottom: "4rem" }}>
                    <div className="card" style={{ cursor: "default" }}>
                        <div className="card-image">🔍</div>
                        <div className="card-body" style={{ textAlign: "center" }}>
                            <h4 className="card-title">Find Your Temple</h4>
                            <p className="card-text">
                                Browse our curated list of temples or search by name, location, or deity.
                            </p>
                        </div>
                    </div>

                    <div className="card" style={{ cursor: "default" }}>
                        <div className="card-image">📅</div>
                        <div className="card-body" style={{ textAlign: "center" }}>
                            <h4 className="card-title">Pick a Slot</h4>
                            <p className="card-text">
                                Choose from available darshan time slots that suit your schedule.
                            </p>
                        </div>
                    </div>

                    <div className="card" style={{ cursor: "default" }}>
                        <div className="card-image">✅</div>
                        <div className="card-body" style={{ textAlign: "center" }}>
                            <h4 className="card-title">Confirm Booking</h4>
                            <p className="card-text">
                                Instantly confirm your darshan and arrive hassle-free at your time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Donation CTA */}
                <div className="card" style={{
                    padding: "3rem 2rem",
                    textAlign: "center",
                    background: "linear-gradient(135deg, rgba(255,160,0,0.06), rgba(198,40,40,0.04))",
                    marginBottom: "2rem",
                    cursor: "default"
                }}>
                    <h3 style={{ marginBottom: "0.75rem" }}>🙏 Support Temples with Donations</h3>
                    <p className="card-text" style={{ maxWidth: "480px", margin: "0 auto 1.5rem" }}>
                        Contribute to temple maintenance and community services. Every donation makes a difference.
                    </p>
                    <Link to="/temples" className="btn btn-success btn-lg">
                        💛 Browse & Donate
                    </Link>
                </div>
            </div>
        </div>
    );
}
