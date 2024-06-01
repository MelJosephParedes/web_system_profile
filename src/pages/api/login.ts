import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../utils/dbConnect';
import { AccountModel } from '../../models/User';
import { Document } from 'mongoose'; // Import Document type from mongoose

interface Account extends Document {
  email: string;
  password: string;
  // Add other fields as needed
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { email, password } = req.body;

      // Retrieve user from MongoDB based on email
      const user: Account | null = await AccountModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      // Check if password matches
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      // If authentication is successful, return user data
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}