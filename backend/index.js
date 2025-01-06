import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config()


const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use(bodyParser.json())

app.listen(
    5000,
    ()=>{
      console.log('Server is running on port 5000');
    }
  )

