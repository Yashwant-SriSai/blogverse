import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{

     type:String,
     required:[true,"Name is Required"],
     trim:true,

    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        minlength:[6,"Password must be at least 6 characters long"],
        select:false // this ensures the password is not returned when querying the user model like when we do User.find() or User.findOne()
    }
},
{
    timestamps:true
});
 
//select: false on password means when you do User.find(), the password hash is excluded by default. You have to explicitly ask for it (.select("+password")) when you actually need it, like during login. This is a safety net — it's very easy to accidentally send a full user object (hash included) back to the frontend otherwise.
//pre("save") is a Mongoose "middleware" — code that runs automatically before an action. Here it intercepts every save and hashes the password if it's new/changed.
//genSalt(10) generates random data mixed into the hash so two users with the same password get different hashes. The 10 is the "cost factor" — higher is slower but more resistant to brute-force attacks. 10 is a solid default.
userSchema.pre("save",async function(){

    if (!this.isModified("password")) return ;

    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    
});

userSchema.methods.comparePassword=async function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
};

export default mongoose.model("User",userSchema); //By wrapping it in mongoose.model("User", userSchema):

//Mongoose compiles your userSchema into a fully functioning Model object.

//It registers a collection named "users" (Mongoose automatically lowercases and pluralizes "User") inside MongoDB.

//It gives you access to database methods like User.findOne(), User.create(), and User.findById() inside your controllers.