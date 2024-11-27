// src/components/roles/RoleList.jsx
import React, { useState } from 'react';
import { mockRoles } from '../../data/mockUsers';

const RoleList = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState(null);

  const renderPermissions = (permissions) => {
    return Object.entries(permissions).map(([resource, actions]) => (
      <div key={resource} className="mb-2">
        <strong>{resource.charAt(0).toUpperCase() + resource.slice(1)}:</strong>{' '}
        {actions.join(', ')}
      </div>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Role Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div 
            key={role.id} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3">{role.name}</h3>
            <div className="text-sm text-gray-600">
              {renderPermissions(role.permissions)}
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setSelectedRole(role)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleList;