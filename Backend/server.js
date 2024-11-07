const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://role-authentication-k82t.vercel.app"],
  credentials:true 
}));

dotenv.config();
connectDB();



app.use(express.json());

// Simple route to check if backend is working
app.get('/hello', (req, res) => {
  res.send('Hello World! The backend is running.');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
