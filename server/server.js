import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from "./Routes/authRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
console.log("CLIENT_URL is:", process.env.CLIENT_URL);   // temporary debug line
connectDB();

const app=express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.get("/api/health",(req,res)=>{
    res.json({success:true,message:"Server is running"});
});
app.use("/api/auth",authRoutes);
app.use("/api/blogs",blogRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});