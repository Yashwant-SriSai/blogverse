import { Link } from "react-router-dom";

const Home = () => (
  <div className="max-w-3xl mx-auto text-center px-6 py-24">
    <h1 className="text-4xl font-extrabold mb-4">Ideas worth writing, thoughts worth reading.</h1>
    <p className="text-muted mb-8">A quiet corner of the internet for long-form writing and real discussion.</p>
    <Link to="/blogs" className="neu-btn-accent">Start reading</Link>
  </div>
);

export default Home;