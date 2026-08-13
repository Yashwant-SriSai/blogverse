import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="max-w-5xl mx-auto px-6 py-5">
      <div className="flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Blogverse</Link>

        {/* Desktop nav links — hidden on mobile */}
        <nav className="hidden md:flex neu-card gap-2 px-2 py-1.5">
          <Link to="/" className="px-4 py-2 rounded-2xl hover:shadow-neu-pressed">Home</Link>
          <Link to="/blogs" className="px-4 py-2 rounded-2xl hover:shadow-neu-pressed">Blog</Link>
          <Link to="/about" className="px-4 py-2 rounded-2xl hover:shadow-neu-pressed">About</Link>
        </nav>

        {/* Desktop auth buttons — hidden on mobile */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="neu-btn">Dashboard</Link>
              <Link to="/write" className="neu-btn-accent">Write</Link>
              <button onClick={handleLogout} className="neu-btn text-coral">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="neu-btn">Log in</Link>
              <Link to="/register" className="neu-btn-accent">Sign up</Link>
            </>
          )}
        </div>

        {/* Hamburger button — only visible on mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden neu-icon-btn px-3 py-2">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 mt-4 neu-card p-3">
          <Link to="/" onClick={() => setOpen(false)} className="px-4 py-2 rounded-2xl hover:shadow-neu-pressed">Home</Link>
          <Link to="/blogs" onClick={() => setOpen(false)} className="px-4 py-2 rounded-2xl hover:shadow-neu-pressed">Blog</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="px-4 py-2 rounded-2xl hover:shadow-neu-pressed">About</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="neu-btn text-center">Dashboard</Link>
              <Link to="/write" onClick={() => setOpen(false)} className="neu-btn-accent text-center">Write</Link>
              <button onClick={handleLogout} className="neu-btn text-coral">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="neu-btn text-center">Log in</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="neu-btn-accent text-center">Sign up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;