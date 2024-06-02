import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../utils/dbConnect';
import { AccountModel } from '../../models/User';
import { env } from 'process';

import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { email, password } = req.body;

      // Retrieve user from MongoDB based on email
      const user = await AccountModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      // Check if password matches (plaintext comparison)
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      // Ensure JWT_SECRET is defined
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }

      // Generate JWT token
      const token = jwt.sign({ email: user.email, userId: user._id }, jwtSecret, { expiresIn: '1h' });

      // If authentication is successful, return user data and JWT token
      res.status(200).json({ success: true, user, token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
