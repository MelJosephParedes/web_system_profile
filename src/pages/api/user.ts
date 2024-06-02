import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../utils/dbConnect';
import { AccountModel } from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const apiKey = req.headers['x-api-key'] as string;

      console.log('API Key from header:', apiKey); // Check if this logs the correct value
      console.log('API Key from env:', process.env.API_KEY);

      if (!apiKey) {
        res.status(401).json({ error: 'Unauthorized: Missing API Key' });
        return;
      }

      if (apiKey !== process.env.API_KEY) {
        res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
        return;
      }

      // Fetch user data
      const email = req.query.email as string;
      const userData = await AccountModel.findOne({ email }).select('name email bio');

      if (!userData) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}