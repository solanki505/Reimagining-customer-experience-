const User = require('../models/user'); 
const bcrypt = require('bcryptjs');

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received signup request:", req.body);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    await user.save();
    console.log("User created successfully:", user);
    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request:", req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    console.log("User logged in successfully:", user);
    req.session.user = user;
    return res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.error("Login error:", err); // Add this line
    return res.status(500).json({ message: "Server error." });
  }
};
exports.postLogout=async(req,res,next)=>{
  console.log("came to post logout");
  await req.session.destroy(()=>{
    console.log("session destroyed");
    res.redirect('/login');
  });
}