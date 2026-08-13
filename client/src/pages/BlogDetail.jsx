import {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
import {useAuth} from "../context/AuthContext.jsx";

const BlogDetail = () =>{
    const {slug} = useParams();
    const {user} = useAuth();
    const [blog,setBlog]=useState(null);
    const [comments,setComments]=useState([]);
    const [content,setContent]=useState("");
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const load = async () =>{
            const {data}=await api.get(`/blogs/${slug}`);
            setBlog(data.blog);
            const commentsRes=await api.get(`/blogs/${data.blog._id}/comments`);
            setComments(commentsRes.data.comments);
            setLoading(false);

        };
        load();
    },[slug]);

    const handleAddComment = async (e) =>{
        e.preventDefault();
        const {data} = await api.post(`/blogs/${blog._id}/comments`,{content});
        setComments([data.comment,...comments]);
        setContent("");

    };
    if (loading) return <p className="text-center py-20">Loading...</p>;

    return (
        <article className="max-w-3xl mx-auto px-6 py-10">
              <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-muted mb-6">by {blog.author?.name}</p>
      <div className="whitespace-pre-wrap leading-relaxed mb-10">{blog.content}</div>

      <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

      {user ? (
        <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="neu-input"
            required
          />
          <button type="submit" className="neu-btn-accent">Post</button>
        </form>
      ) : (
        <p className="text-muted mb-6">Log in to comment.</p>
      )}

      <ul className="flex flex-col gap-3">
        {comments.map((c) => (
          <li key={c._id} className="neu-card p-4">
            <p className="text-sm font-semibold">{c.author?.name}</p>
            <p className="text-sm">{c.content}</p>
          </li>
        ))}
      </ul>
        </article>
    );

};

export default BlogDetail;