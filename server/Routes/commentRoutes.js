import express from "express";
import {getComments,addComment,deleteComment} from "../controllers//commentController.js";
import {protect} from "../middleware/auth.js";    

// mergeParams: true is what lets this router see :blogId, even though
// that param is actually defined on the PARENT router (blogRoutes), not here
const router = express.Router({ mergeParams: true });

router.get("/", getComments);
router.post("/", protect, addComment);
router.delete("/:id", protect, deleteComment);

export default router;