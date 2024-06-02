import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Perform logout actions here (e.g., clearing session data)
      // For example:
      // req.session.destroy(); // Destroy session data (if using session-based authentication)
      // Clear cookies (if using cookie-based authentication)
      localStorage.removeItem('token');
      res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
      console.error('Logout failed:', error);
      res.status(500).json({ success: false, message: 'Logout failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
