// src/components/roles/PermissionMatrix.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRole } from '../../store/rolesSlice';

const RESOURCES = [
  'dashboard', 'users', 'roles', 'threat_monitoring', 'reports', 'settings'
];

const PERMISSIONS = ['none', 'view', 'create', 'edit', 'delete', 'full'];

const PermissionMatrix = ({ role }) => {
  const dispatch = useDispatch();
  const [permissions, setPermissions] = useState(role.permissions || {});

  const handlePermissionChange = (resource, permission) => {
    const updatedPermissions = {
      ...permissions,
      [resource]: permission
    };
    
    setPermissions(updatedPermissions);
    dispatch(updateRole({
      ...role,
      permissions: updatedPermissions
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Permission Matrix for {role.name}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Resource</th>
              {PERMISSIONS.map(perm => (
                <th key={perm} className="border p-2 text-center">
                  {perm.charAt(0).toUpperCase() + perm.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RESOURCES.map(resource => (
              <tr key={resource} className="hover:bg-gray-50">
                <td className="border p-2">
                  {resource.replace('_', ' ').charAt(0).toUpperCase() + 
                   resource.replace('_', ' ').slice(1)}
                </td>
                {PERMISSIONS.map(perm => (
                  <td key={perm} className="border p-2 text-center">
                    <input
                      type="radio"
                      name={`${resource}-permission`}
                      checked={permissions[resource] === perm}
                      onChange={() => handlePermissionChange(resource, perm)}
                      className="form-radio"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionMatrix;