import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { authenticate } from '@/middleware/authMiddleware';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const user = await User.findById(req.user.id).populate('profile');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
}

export default authenticate(handler);
