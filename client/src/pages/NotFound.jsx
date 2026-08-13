import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center py-24">
    <h1 className="text-4xl font-bold mb-2">404</h1>
    <p className="text-muted mb-6">This page doesn't exist.</p>
    <Link to="/" className="neu-btn-accent">Back home</Link>
  </div>
);

export default NotFound;