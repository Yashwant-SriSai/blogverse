import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Title is Required"],
            trim:true,
            maxlength:[150,"Title must be less than 150 characters"],
        },
        slug:{
            type:String,
            unique:true,
        },
        content:{
            type:String,
            required:[true,"Content is Required"],
        },
        excerpt:{
            type:String,
            maxlength:[300,"Excerpt must be less than 300 characters"],
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        status:{
            type:String,
            enum:["draft","published"],
            default:"published",
        },
    }, 
    {timestamps:true}// add createdAt and updatedAt fields automatically
);

blogSchema.pre("validate", function () {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + "-" + Date.now().toString(36);
  }
  if (this.content && !this.excerpt) {
    const plainText = this.content.replace(/<[^>]+>/g, "");
    this.excerpt = plainText.substring(0, 200) + (plainText.length > 200 ? "..." : "");
  }

});

export default mongoose.model("Blog",blogSchema);