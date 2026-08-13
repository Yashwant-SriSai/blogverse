import Blog from "../models/Blog.js";


// GET /api/blogs — list all published posts, newest first
export const getBlogs=async(req,res)=>{
    try{
        const blogs = await Blog.find({status:"published"})
          .populate("author","name")
          .sort("-createdAt");
        res.status(200).json({success:true,count:blogs.length,blogs});

    }catch(error){
        res.status(500).json({success:false,message:error.message});

    }
};

// GET /api/blogs/:slug — a single post
export const getBlogBySlug=async(req,res)=>{
    try{
        const blog=await Blog.findOne({slug:req.params.slug}).populate("author","name");

        if (!blog){
            return res.status(404).json({success:false,message:"Blog not found"});
        }
        res.status(200).json({success:true,blog});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
};

// POST /api/blogs — create a post (must be logged in)
export const createBlog=async(req,res)=>{
    console.log("creating blog was called");
    try{
        const {title,content,status}=req.body;

        if(!title || !content){
            return res.status(400).json({success :false,message :"Title and Content are required"});

        }
        const blog = await Blog.create({
            title,
            content,
            status,
            author:req.user._id,
        });

        res.status(201).json({success:true,blog});
    }catch(error){
        console.error("createBlog error:", error);   // add this line
        res.status(500).json({success:false,message:error.message});
    }
};

// PUT /api/blogs/:id — edit a post (author only)
export const updateBlog = async (req,res) =>{
       try{
        const blog = await Blog.findById(req.params.id);

        if (!blog){
            return res.status(404).json({success:false,message:"Blog not found"});
        }
         // The ownership check: compare the post's author to whoever is making this request
         if (blog.author.toString() !== req.user._id.toString()){
            return res.status(403).json({success:false,message:"You can only edit  your own posts"});
         }

         const {title,content,status}=req.body;
         if(title)blog.title=title;
         if(content)blog.content=content;
         if(status)blog.status=status;

         await blog.save();
         res.status(200).json({success:true,blog});
       }catch(error){
        res.status(500).json({success:false,message:error.message});
       }
};

// DELETE /api/blogs/:id — delete a post (author only)
export const deleteBlog = async (req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);

        if (!blog){
            return res.status(404).json({success:false,message:"Blog nit found"});
        }

        if(blog.author.toString() !== req.user._id.toString()){
            return res.status(403).json({success:false,message:"You can only delete your own posts"});

        }
        await blog.deleteOne();
        return res.status(200).json({success:true,message:"Blog Deleted"});
    }catch(error){
        return res.status(500).json({success : false,message:error.message});
    }


};

export const getMyBlogs =async (req,res)=>{
try{
    const blogs=await Blog.find({author:req.user._id}).sort("-createdAt");
    res.status(200).json({success:true,blogs});

}catch(error){
    res.status(500).json({success:false,message:error.message});
}
};