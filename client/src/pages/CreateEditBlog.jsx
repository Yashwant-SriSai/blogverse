import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const CreateEditBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/blogs", form);
    navigate(`/blogs/${data.blog.slug}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Write a new post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="neu-input text-lg font-semibold"
          required
        />
        <textarea
          name="content"
          placeholder="Write your post..."
          value={form.content}
          onChange={handleChange}
          rows={12}
          className="neu-input resize-y"
          required
        />
        <button type="submit" className="neu-btn-accent w-fit">Publish</button>
      </form>
    </div>
  );
};

export default CreateEditBlog;