import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

export const register=async(req,res)=>{

    try{

        const {name,email,password}=req.body;

        if(!name||!email||!password){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const existing=await User.findOne({email});
        if (existing){
            return res.status(400).json({success:false,message:"Email alredy exists"});
        }
        const user=await User.create({name,email,password});
        generateToken(res,user.id);

        res.status(201).json({

            success:true,
            message:"User registered successfully",
        });
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
};


export const login=async(req,res)=>{
   try{

    const {email,password}= req.body;

    const user=await User.findOne({email}).select("+password");
    if(!user||!(await user.comparePassword(password))){

        return res.status(401).json({success:false,message:"Invalid email or password"});
    }
    generateToken(res,user.id);

    res.status(200).json({
        success:true,
        user: { id: user._id, name: user.name, email: user.email },
    });

}catch(error){
    res.status(500).json({success:false,message:error.message})
}
   


};

export const logout=(req,res)=>{
    res.cookie("token","",{ httpOnly: true, expires: new Date(0) });
    res.status(200).json({success:true,message:"Logged out successfully"});
};

export const getMe=async(req,res)=>{
    res.status(200).json({success:true,user:req.user});
};