import { deleteComment } from "./controllers/commentController.js";
import { protect } from "./middleware/auth.js";
//Since deleteComment doesn't depend on blogId, give it a clean top-level path instead of nesting it.

// ... after your other app.use() lines
app.delete("/api/comments/:id", protect, deleteComment);
