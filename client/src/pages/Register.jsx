import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="neu-card p-8">
          <h2 className="text-2xl font-bold mb-1">Sign up</h2>
          <p className="text-muted text-sm mb-6">Create your account.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className="neu-input"
              required
            />
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
            <button type="submit" className="neu-btn-accent w-full">Sign up</button>
          </form>

          {error && <p className="text-coral text-sm mt-4">{error}</p>}

          <p className="text-sm text-muted mt-6 text-center">
            Already have an account? <Link to="/login" className="text-accent font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;