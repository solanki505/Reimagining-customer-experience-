const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/authRouter'); // <-- Add this
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: "http://localhost:5173", // Allow frontend
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authRouter); // <-- Use the router
const db_path='mongodb+srv://tirthankarpal846:Hello123@cluster0.kypesgo.mongodb.net/';
mongoose.connect(db_path).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}).catch((err) => {
  console.error('MongoDB connection error:', err);
})

const sketchfabProxy = require('./routes/sketchfabProxy');
app.use('/api', sketchfabProxy);