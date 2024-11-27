import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, toggleModal } from '../../store/usersSlice';
import { mockRoles } from '../../data/mockRoles';

const UserForm = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(state => state.users.selectedUser);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: selectedUser || {}
  });

  const onSubmit = (data) => {
    if (selectedUser) {
      dispatch(updateUser({ ...data, id: selectedUser.id }));
    } else {
      dispatch(addUser(data));
    }
    dispatch(toggleModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2">Name</label>
        <input 
          {...register('name', { required: 'Name is required' })}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      
      <div>
        <label className="block mb-2">Email</label>
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
        <label className="block mb-2">Role</label>
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
        <label className="block mb-2">Status</label>
        <select 
          {...register('status', { required: 'Status is required' })}
          className="w-full p-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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
          {selectedUser ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;