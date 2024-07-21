//controllers.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if  (!username || !email || !password){
        return res.status(400).json({ error: "username,Email and password are required." });
      }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await prisma.user.create({
      data: {
        username:username,
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', User });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error'});
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }
  

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      if (!newPassword || typeof newPassword !== 'string') {
        return res.status(400).json({ error: 'Invalid request' });
      }
  
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'No account found with that email' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
  
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
