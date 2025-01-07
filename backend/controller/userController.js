import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

// Controller for logging in
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(404).json({ message: "User not found for the specified role" });
        }

        // Check if the user is blocked
        if (user.isBlocked) {
            return res.status(403).json({ message: "User is blocked. Please contact admin." });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role, fullName: user.fullName },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            message: "Login successful", 
            token, 
            role: user.role 
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Controller for signing up
/*export const signup = async (req, res) => {
    try {
        const { 
            fullName, 
            email, 
            phoneNumber, 
            password, 
            role, 
            medicalLicenseNumber, 
            specialization, 
            yearsOfExperience, 
            availableDays, 
            availableTimes 
        } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            medicalLicenseNumber: role === 'Doctor' ? medicalLicenseNumber : undefined,
            specialization: role === 'Doctor' ? specialization : undefined,
            yearsOfExperience: role === 'Doctor' ? yearsOfExperience : undefined,
            availableDays: role === 'Doctor' ? availableDays : undefined,
            availableTimes: role === 'Doctor' ? availableTimes : undefined,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};*/

export const signup = async (req, res) => {
    try {
        const { 
            fullName, 
            email, 
            phoneNumber, 
            password, 
            role, 
            medicalLicenseNumber, 
            specialization, 
            yearsOfExperience, 
            availableDays, 
            availableTimes 
        } = req.body;

        // Log payload
        console.log("Signup Payload:", req.body);

        // Validate role-specific fields
        if (role === 'Doctor') {
            if (!medicalLicenseNumber || !specialization || !yearsOfExperience || !availableDays || !availableTimes) {
                return res.status(400).json({
                    message: "Missing required fields for Doctor role",
                });
            }
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            medicalLicenseNumber: role === 'Doctor' ? medicalLicenseNumber : undefined,
            specialization: role === 'Doctor' ? specialization : undefined,
            yearsOfExperience: role === 'Doctor' ? yearsOfExperience : undefined,
            availableDays: role === 'Doctor' ? availableDays : undefined,
            availableTimes: role === 'Doctor' ? availableTimes : undefined,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};
