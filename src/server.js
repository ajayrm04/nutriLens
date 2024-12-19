import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the UserProfile schema
const userProfileSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  specialNeeds: {
    type: [String],
    default: [],
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

// Create the model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Endpoint to save user data
app.post('/api/save-user-data', async (req, res) => {
  try {
    const { clerkId, age, gender, specialNeeds, weight, height } = req.body;

    // Validate required fields
    if (!clerkId || !age || !gender || !weight || !height) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the profile already exists
    const existingProfile = await UserProfile.findOne({ clerkId });
    if (existingProfile) {
      return res.status(200).json({ message: 'Profile already exists' });
    }

    // Create a new profile
    const newProfile = new UserProfile({
      clerkId,
      age,
      gender,
      specialNeeds,
      weight,
      height,
    });

    await newProfile.save();
    res.status(201).json({ message: 'Profile saved successfully' });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the NutriLens API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
