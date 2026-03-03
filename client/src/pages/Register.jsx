import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created! Welcome 🙏");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join DarshanEase for seamless temple bookings</p>
        <form onSubmit={submit} id="register-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Your full name"
              required
              id="register-name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              type="email"
              placeholder="you@example.com"
              required
              id="register-email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              type="password"
              placeholder="Min 6 characters"
              required
              minLength={6}
              id="register-password"
            />
          </div>
          <button
            className="btn btn-primary btn-lg"
            style={{ width: "100%" }}
            disabled={loading}
            id="register-submit"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
