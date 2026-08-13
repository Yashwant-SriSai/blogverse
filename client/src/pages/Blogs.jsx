import { useEffect,useState} from "react";
import api from "../api/axios.js";
import BlogCard from "../components/BlogCard.jsx";

const Blogs = () =>{
    const [blogs,setBlogs]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(() =>{
        const load =async ()=>{
            try {
                const {data} = await api.get("/blogs");
                setBlogs(data.blogs);
            }finally{
                setLoading(false);
            }
        };
        load();

    },[]);

    if (loading) return <p className="text-center py-20">Loading posts...</p>;
    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">All posts</h1>
      {blogs.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((b) => <BlogCard key={b._id} blog={b} />)}
        </div>
      )}
    </div>
   );


};

export default Blogs;