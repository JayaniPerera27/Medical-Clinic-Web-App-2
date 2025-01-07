/*import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from './router/userRouter.js';


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

app.use('/api/auth', userRouter);

app.listen(
    5000,
    ()=>{
      console.log('Server is running on port 5000');
    }
  )*/

    import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from './router/userRouter.js';
import path from 'path';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// API Routes
app.use('/api/auth', userRouter);

// Catch-All Route for Undefined Endpoints
app.use((req, res) => {
    res.status(404).send(`
        <h1>404: Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Go to Home</a>
    `);
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
