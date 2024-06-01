// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../utils/dbConnect';
import { AccountModel } from '../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const MAX_RETRIES = 3;

  async function createUserWithRetry(userData: any , attempt = 0) {
    try {
      await dbConnect();
      return await AccountModel.create(userData);
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        console.log(`Attempt ${attempt + 1} failed, retrying...`);
        return createUserWithRetry(userData, attempt + 1);
      } else {
        throw error; // Rethrow the last error after max retries
      }
    }
  }
  
  // Usage within your API route
  if (req.method === 'POST') {
    try {
      await dbConnect();
      
      const userData = req.body;
      const newUser = await createUserWithRetry(userData);
  
      res.status(201).json({ message: 'User account created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user account:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

};


/*
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      
      const userData = req.body;
      const newUser = await AccountModel.create(userData);

      res.status(201).json({ message: 'User account created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user account:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};*/
