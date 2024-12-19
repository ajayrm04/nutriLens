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
  clerkId: String,
  age: Number,
  gender: String,
  specialNeeds: [String],
  weight: Number,
  height: Number,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

app.post('/api/save-user-data', async (req, res) => {
  try {
    const { clerkId, age, gender, specialNeeds, weight, height } = req.body;

    const existingProfile = await UserProfile.findOne({ clerkId });
    if (existingProfile) {
      return res.status(200).json({ message: 'Profile already exists' });
    }

    const newProfile = new UserProfile({ clerkId, age, gender, specialNeeds, weight, height });
    await newProfile.save();
    res.status(201).json({ message: 'Profile saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the NutriLens API!');
});

app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));