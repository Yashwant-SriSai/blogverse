import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => (
  <Link to={`/blogs/${blog.slug}`} className="neu-card p-5 flex flex-col gap-2 block">
    <h3 className="text-lg font-semibold">{blog.title}</h3>
    <p className="text-sm text-muted line-clamp-3">{blog.excerpt}</p>
    <p className="text-xs text-muted mt-2">by {blog.author?.name}</p>
  </Link>
);

export default BlogCard;