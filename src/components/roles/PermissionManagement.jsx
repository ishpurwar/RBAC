import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRole } from '../../store/rolesSlice';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

const RESOURCES = [
  'dashboard', 'users', 'roles', 'threat_monitoring', 
  'reports', 'settings'
];

const PERMISSION_LEVELS = [
  { value: 'none', label: 'No Access', color: 'bg-red-100 text-red-800' },
  { value: 'view', label: 'View', color: 'bg-blue-100 text-blue-800' },
  { value: 'create', label: 'Create', color: 'bg-green-100 text-green-800' },
  { value: 'edit', label: 'Edit', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'delete', label: 'Delete', color: 'bg-red-200 text-red-900' },
  { value: 'full', label: 'Full Access', color: 'bg-purple-200 text-purple-900' }
];

const PermissionManagement = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.roles);
  const [selectedRole, setSelectedRole] = useState(null);

  const handlePermissionChange = (role, resource, permission) => {
    const updatedRole = {
      ...role,
      permissions: {
        ...role.permissions,
        [resource]: permission
      }
    };

    dispatch(updateRole(updatedRole));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-blue-500" />
        <h1 className="text-3xl font-bold">Permission Management</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Role Selector */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Roles</h2>
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`w-full text-left p-3 rounded-lg mb-2 ${
                selectedRole?.id === role.id 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>

        {/* Permission Matrix */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
          {selectedRole ? (
            <>
              <h2 className="text-2xl font-semibold mb-6">
                Permissions for {selectedRole.name}
              </h2>
              <div className="space-y-4">
                {RESOURCES.map(resource => (
                  <div key={resource} className="flex justify-between items-center">
                    <span className="capitalize font-medium">
                      {resource.replace('_', ' ')}
                    </span>
                    <div className="flex space-x-2">
                      {PERMISSION_LEVELS.map(level => (
                        <button
                          key={level.value}
                          onClick={() => handlePermissionChange(
                            selectedRole, 
                            resource, 
                            level.value
                          )}
                          className={`px-3 py-1 rounded text-xs ${
                            selectedRole.permissions?.[resource] === level.value
                              ? level.color
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              Select a role to manage its permissions
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionManagement;