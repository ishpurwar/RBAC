import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { 
  createRole, 
  updateRole, 
  deleteRole, 
  setSelectedRole, 
  toggleModal 
} from '../../store/rolesSlice';
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon, 
  EyeIcon 
} from '@heroicons/react/24/solid';

const RESOURCES = ['users', 'roles', 'dashboard'];
const PERMISSION_LEVELS = ['none', 'view', 'read', 'create', 'update', 'delete', 'full'];

const RoleManagement = () => {
  const dispatch = useDispatch();
  const { roles, selectedRole, isModalOpen } = useSelector(state => state.roles);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [viewPermissions, setViewPermissions] = useState(null);

  const { 
    register, 
    handleSubmit, 
    control, 
    reset, 
    setValue,
    formState: { errors } 
  } = useForm();

  useEffect(() => {
    if (selectedRole) {
      setValue('roleName', selectedRole.name);
      RESOURCES.forEach(resource => {
        const resourcePermissions = selectedRole.permissions[resource] || [];
        setValue(`${resource}_permission`, resourcePermissions[0] || 'none');
      });
    } else {
      reset();
    }
  }, [selectedRole, setValue, reset]);

  const onSubmit = (data) => {
    const rolePermissions = RESOURCES.reduce((acc, resource) => {
      acc[resource] = [data[`${resource}_permission`]];
      return acc;
    }, {});

    const roleData = {
      name: data.roleName,
      permissions: rolePermissions
    };

    if (selectedRole) {
      dispatch(updateRole({ ...roleData, id: selectedRole.id }));
    } else {
      dispatch(createRole(roleData));
    }
    reset();
  };

  const handleEdit = (role) => {
    dispatch(setSelectedRole(role));
    dispatch(toggleModal());
  };

  const handleDelete = (roleId) => {
    dispatch(deleteRole(roleId));
    setConfirmDelete(null);
  };

  const renderPermissionBadge = (level) => {
    const colorMap = {
      'none': 'bg-red-100 text-red-800',
      'view': 'bg-blue-100 text-blue-800',
      'read': 'bg-green-100 text-green-800',
      'create': 'bg-yellow-100 text-yellow-800',
      'update': 'bg-purple-100 text-purple-800',
      'delete': 'bg-red-200 text-red-900',
      'full': 'bg-green-200 text-green-900'
    };

    return (
      <span 
        className={`px-2 py-1 rounded text-xs ${colorMap[level] || 'bg-gray-100'}`}
      >
        {level}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <button 
          onClick={() => {
            dispatch(setSelectedRole(null));
            dispatch(toggleModal());
          }}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(roles || []).map((role) => (
          <div 
            key={role.id} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">{role.name}</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewPermissions(role)}
                  className="text-blue-600 hover:text-blue-900"
                  title="View Permissions"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleEdit(role)}
                  className="text-green-600 hover:text-green-900"
                  title="Edit Role"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setConfirmDelete(role.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete Role"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {Object.entries(role.permissions || {}).slice(0, 3).map(([resource, levels]) => (
                <div key={resource} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 capitalize">
                    {resource.replace('_', ' ')}
                  </span>
                  {renderPermissionBadge(levels[0] || 'none')}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">
              {selectedRole ? 'Edit Role' : 'Create Role'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role Name</label>
                <input
                  {...register('roleName', { required: 'Role name is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
                {errors.roleName && <p className="text-red-500 text-xs mt-1">{errors.roleName.message}</p>}
              </div>

              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Permissions</h4>
                {RESOURCES.map(resource => (
                  <div key={resource} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {resource} Permissions
                    </label>
                    <select
                      {...register(`${resource}_permission`)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    >
                      {PERMISSION_LEVELS.map(level => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={() => dispatch(toggleModal())}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {selectedRole ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Permissions Modal */}
      {viewPermissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">
              Permissions for {viewPermissions.name}
            </h3>
            <div className="space-y-3">
              {Object.entries(viewPermissions.permissions || {}).map(([resource, levels]) => (
                <div 
                  key={resource} 
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <span className="text-sm text-gray-700 capitalize">
                    {resource.replace('_', ' ')}
                  </span>
                  {renderPermissionBadge(levels[0] || 'none')}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setViewPermissions(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Role Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this role? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;