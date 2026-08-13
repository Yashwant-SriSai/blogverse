import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

// GET /api/blogs/:blogId/comments

export const getComments=async (req,res)=>{
    try{
        const comments = await Comment.find({blog :req.params.blogId})
         .populate("author","name")
         .sort("-createdAt");
        res.status(200).json({success:true,count:comments.length,comments});


    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
};

// POST /api/blogs/:blogId/comments
export const addComment=async(req,res)=>{
    try{
        const {content}=req.body;

        if(!content || !content.trim()){
            return res.status(400).json({success:false,messgae:"Commennt cannot be empty"});

        }
        //confirm the blog actually exists before attaching a comment to it
        const blog =await Blog.findById(req.params.blogId);
        if(!blog){
            return res.status(404).json({success:false,message:"Blog not found"});

        }
        const comment = await Comment.create({
            content,
            author:req.user._id,
            blog:req.params.blogId,
        });
       // populate() only works on documents already saved/fetched — .populate() here
      // re-fetches just the author's name onto the comment we just created 
      await comment.populate("author","name");
      res.status(201).json({sccess:true,comment});
    }catch(error){
        res.status(500).json({success:false,message:error.message});

    }
};
// DELETE /api/comments/:id  (note: NOT nested — see routing step below)
export const deleteComment = async (req,res)=>{
     try{
        const comment = await Comment.findById(req.params.id);

        if(!comment){
            return res.status(404).json({success:false,message:
                "Comment not found"});
        }
        if (comment.author.toString() !== req.user._id.toString()){
            return res.status(403).json({success:false,message:"You can only delete your own comments"});

        }
        await comment.deleteOne();
        res.status(200).json({success:true,message:"Comment deleted"});

     }catch(error){
        res.status(500).json({success:false,message:error.message});
     }
};