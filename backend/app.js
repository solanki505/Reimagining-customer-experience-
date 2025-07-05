const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/authRouter'); 
const storeRouter = require('./routes/storeRouter');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"secret",
  resave:false,
  saveUninitialized:true,
}));
app.use(authRouter); 
// app.use(storeRouter);
const db_path='mongodb+srv://tirthankarpal846:Hello123@cluster0.kypesgo.mongodb.net/';
mongoose.connect(db_path).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}).catch((err) => {
  console.error('MongoDB connection error:', err);
})