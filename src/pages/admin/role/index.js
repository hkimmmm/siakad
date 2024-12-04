import { useEffect, useState } from 'react';
import RoleListScreen from '@/components/admin/screens/role';

export default function RolePage() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function fetchRoles() {
      const response = await fetch('/api/admin/role');
      const data = await response.json();
      setRoles(data.roles);
    }
    fetchRoles();
  }, []);

  return <RoleListScreen roles={roles} />;
}
