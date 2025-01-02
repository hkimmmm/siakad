export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Logout logic is client-side; here, we simply return a response.
  res.status(200).json({ message: 'Logout successful.' });
}
