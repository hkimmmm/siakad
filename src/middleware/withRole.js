import jwt from 'jsonwebtoken';

export const withRole = (role) => (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token tidak ada' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== role)
      return res.status(403).json({ message: 'Akses ditolak' });

    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    console.error('Error dalam verifikasi token:', error);
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};
