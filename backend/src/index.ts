import express, { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import "dotenv/config";

import myHotelRoutes from './routes/my-hotels';
import hotelRoutes from './routes/hotels';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); 

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONEND_URL,
  credentials: true
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.listen(7000, () => {
  console.log("server is running on localhost:7000");
});

// SZ9HPdlQO0swTS6O


