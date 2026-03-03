import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! 🙏");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your DarshanEase account</p>
        <form onSubmit={submit} id="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              type="email"
              placeholder="you@example.com"
              required
              id="login-email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              type="password"
              placeholder="••••••••"
              required
              id="login-password"
            />
          </div>
          <button
            className="btn btn-primary btn-lg"
            style={{ width: "100%" }}
            disabled={loading}
            id="login-submit"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-3 d-grid gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={async () => {
              const demo = { name: "Demo User", email: "demo.user@darshanease.local", password: "Demo1234!" };
              setLoading(true);
              try {
                try {
                  await login(demo.email, demo.password);
                } catch {
                  await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { ...demo, role: "USER" });
                  await login(demo.email, demo.password);
                }
                toast.success("Logged in as Demo User");
                navigate("/");
              } catch (err) {
                toast.error(err.response?.data?.message || "Demo login failed");
              } finally {
                setLoading(false);
              }
            }}
            id="login-demo-user"
          >
            Login as Demo User
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={async () => {
              const demo = { name: "Demo Admin", email: "demo.admin@darshanease.local", password: "AdminDemo123!" };
              setLoading(true);
              try {
                try {
                  await login(demo.email, demo.password);
                } catch {
                  await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { ...demo, role: "ADMIN" });
                  await login(demo.email, demo.password);
                }
                toast.success("Logged in as Demo Admin");
                navigate("/admin");
              } catch (err) {
                toast.error(err.response?.data?.message || "Demo admin login failed");
              } finally {
                setLoading(false);
              }
            }}
            id="login-demo-admin"
          >
            Login as Demo Admin
          </button>
        </div>
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}
