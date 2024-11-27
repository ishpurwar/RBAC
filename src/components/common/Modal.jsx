import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { 
  createUser, 
  updateUser, 
  toggleModal 
} from '../../store/usersSlice';
import { 
  createRole, 
  updateRole 
} from '../../store/rolesSlice';
import { mockRoles } from '../../data/mockUsers';

const RESOURCES = [
  'dashboard', 'users', 'roles', 'threat_monitoring', 'reports', 'settings'
];

const PERMISSION_LEVELS = [
  { value: 'none', label: 'No Access' },
  { value: 'view', label: 'View' },
  { value: 'create', label: 'Create' },
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
  { value: 'full', label: 'Full Access' }
];

const Modal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedUser } = useSelector(state => state.users);
  const { selectedRole } = useSelector(state => state.roles);

  const isEditMode = selectedUser || selectedRole;
  const isUserModal = !!selectedUser;

  const { 
    register, 
    handleSubmit, 
    control, 
    reset, 
    formState: { errors } 
  } = useForm({
    defaultValues: isEditMode 
      ? (selectedUser || selectedRole)
      : {}
  });

  const onSubmit = (data) => {
    if (isUserModal) {
      if (selectedUser) {
        dispatch(updateUser({ ...data, id: selectedUser.id }));
      } else {
        dispatch(createUser(data));
      }
    } else {
      const rolePermissions = RESOURCES.reduce((acc, resource) => {
        acc[resource] = data[`${resource}_permission`];
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
    }

    reset();
    dispatch(toggleModal());
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black opacity-50" 
        onClick={() => dispatch(toggleModal())}
      ></div>
      
      <div className="relative bg-white rounded-lg shadow-xl mx-auto mt-12 max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {isEditMode 
              ? `${isUserModal ? 'Edit' : 'Update'} ${isUserModal ? 'User' : 'Role'}` 
              : `Create ${isUserModal ? 'User' : 'Role'}`}
          </h2>
          <button 
            onClick={() => dispatch(toggleModal())}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isUserModal ? (
            // User Form Fields
            <>
              <div>
                <label>Name</label>
                <input 
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-2 border rounded"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              
              <div>
                <label>Email</label>
                <input 
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email format'
                    }
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              
              <div>
                <label>Role</label>
                <select 
                  {...register('role', { required: 'Role is required' })}
                  className="w-full p-2 border rounded"
                >
                  {mockRoles.map(role => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
              </div>
              
              <div>
                <label>Status</label>
                <select 
                  {...register('status', { required: 'Status is required' })}
                  className="w-full p-2 border rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </>
          ) : (
            // Role Form Fields
            <>
              <div>
                <label>Role Name</label>
                <input 
                  {...register('roleName', { required: 'Role name is required' })}
                  className="w-full p-2 border rounded"
                />
                {errors.roleName && <p className="text-red-500">{errors.roleName.message}</p>}
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Permissions</h3>
                {RESOURCES.map(resource => (
                  <div 
                    key={resource} 
                    className="flex justify-between items-center mb-3"
                  >
                    <span className="capitalize">
                      {resource.replace('_', ' ')}
                    </span>
                    <select
                      {...register(`${resource}_permission`)}
                      className="w-48 p-2 border rounded"
                      defaultValue={
                        selectedRole?.permissions?.[resource] || 'none'
                      }
                    >
                      {PERMISSION_LEVELS.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
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
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;