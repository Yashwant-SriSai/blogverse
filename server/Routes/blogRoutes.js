import express from "express";
import {getBlogs,getBlogBySlug,createBlog,updateBlog,deleteBlog,getMyBlogs} from "../controllers/blogController.js";
import {protect} from "../middleware/auth.js"; 
import commentRouter from "./commentRoutes.js"; // new   

const router= express.Router();

router.use("/:blogId/comments",commentRouter);

router.get("/",getBlogs);
router.get("/mine/all",protect,getMyBlogs);
router.get("/:slug",getBlogBySlug);
router.post("/",protect,createBlog);
router.put("/:id",protect,updateBlog);
router.delete("/:id",protect,deleteBlog);


export default router;