import jwt from 'jsonwebtoken';

export const authenticate = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return handler(req, res);
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
