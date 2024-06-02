import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { AccountModel } from '../../models/User'; // Import your user model here

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw new Error('No token provided');

      // Ensure JWT_SECRET is defined
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }

      const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload & { email: string };
      const email = decodedToken.email;

      // Fetch user data based on email
      const userData = await AccountModel.findOne({ email }).select('name email bio');

      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }

      // If user data is found, send it in the response
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
