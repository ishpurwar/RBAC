import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createUser, 
  updateUser, 
  deleteUser, 
  setSelectedUser, 
  toggleModal 
} from '../../store/usersSlice';
import { useForm } from 'react-hook-form';
import { mockUsers } from '../../data/mockUsers';
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon 
} from '@heroicons/react/24/solid';

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const selectedUser = useSelector(state => state.users.selectedUser);
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();
  const onSubmit = (data) => {
    if (selectedUser) {
      dispatch(updateUser({ ...data, id: selectedUser.id }));
    } else {
      dispatch(createUser(data));
    }
    reset();
  };

  const handleEdit = (user) => {
    dispatch(setSelectedUser(user));
    dispatch(toggleModal());
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    setConfirmDelete(null);
  };

  const handleOpenCreateModal = () => {
    dispatch(setSelectedUser(null));
    dispatch(toggleModal());
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button 
          onClick={handleOpenCreateModal}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id} 
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <span 
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit User"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => setConfirmDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete User"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this user?</p>
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

export default UserManagement;