import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockUsers } from '../data/mockUsers';
import toast from 'react-hot-toast';

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const newUser = {
        ...userData,
        id: Date.now(), // unique ID generation
        createdAt: new Date().toISOString()
      };
      
      if (!userData.name || !userData.email) {
        return rejectWithValue('Name and email are required');
      }

      return newUser;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      if (!userData.id) {
        return rejectWithValue('User ID is required');
      }
      
      return {
        ...userData,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: mockUsers,
    selectedUser: null,
    isModalOpen: false,
    status: 'idle',
    error: null
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
        state.isModalOpen = false;
        toast.success('User created successfully');
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(action.payload || 'Failed to create user');
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
          state.isModalOpen = false;
          toast.success('User updated successfully');
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
        toast.success('User deleted successfully');
      });
  }
});

export const { setSelectedUser, toggleModal } = usersSlice.actions;
export default usersSlice.reducer;