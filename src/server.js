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

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

app.post('/api/save-user-data/', async (req, res) => {
  try {
    const { clerkId, age, gender, specialNeeds, weight, height } = req.body;

    if (!clerkId || !age || !gender || !weight || !height) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (typeof age !== 'number' || typeof weight !== 'number' || typeof height !== 'number') {
      return res.status(400).json({ error: 'Age, Weight, and Height must be numbers' });
    }

    const existingProfile = await UserProfile.findOne({ clerkId });
    if (existingProfile) {
      return res.status(409).json({ message: 'Profile already exists' });
    }

    const newProfile = new UserProfile({
      clerkId,
      age,
      gender,
      specialNeeds,
      weight,
      height,
    });

    await newProfile.save();
    res.status(201).json({ message: 'Profile saved successfully', userId: clerkId });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/check-user-data/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingProfile = await UserProfile.findOne({ clerkId: userId });
    res.status(200).json({ exists: !!existingProfile });
  } catch (error) {
    console.error('Error checking user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the NutriLens API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));