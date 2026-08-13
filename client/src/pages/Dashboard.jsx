import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/blogs/mine/all");
      setBlogs(data.blogs);
      setLoading(false);
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/blogs/${id}`);
    setBlogs(blogs.filter((b) => b._id !== id));
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your posts</h1>
        <Link to="/write" className="neu-btn-accent">New post</Link>
      </div>

      <div className="flex flex-col gap-3">
        {blogs.map((b) => (
          <div key={b._id} className="neu-card p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{b.title}</p>
              <p className="text-xs text-muted">{b.status}</p>
            </div>
            <button onClick={() => handleDelete(b._id)} className="neu-btn text-coral">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;