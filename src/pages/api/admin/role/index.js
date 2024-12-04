import {
  getRoles,
  addRole,
  updateRole,
  deleteRole
} from '@/controller/admin/role/index';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const roles = await getRoles();
      res.status(200).json({ roles });
    } catch (error) {
      console.error('Error fetching roles:', error);
      res.status(500).json({ error: 'Unable to fetch roles' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    try {
      await deleteRole(id);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      console.error('Error deleting role:', error);
      res.status(500).json({ error: 'Unable to delete role' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
