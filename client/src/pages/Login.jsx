import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="neu-card p-8">
          <h2 className="text-2xl font-bold mb-1">Log in</h2>
          <p className="text-muted text-sm mb-6">Welcome back.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="neu-input"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="neu-input"
              required
            />
            <button type="submit" className="neu-btn-accent w-full">Log in</button>
          </form>

          {error && <p className="text-coral text-sm mt-4">{error}</p>}

          <p className="text-sm text-muted mt-6 text-center">
            No account? <Link to="/register" className="text-accent font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;