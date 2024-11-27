import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockRoles } from '../data/mockUsers';
import toast from 'react-hot-toast';

// Async thunks for more robust role management
export const createRole = createAsyncThunk(
  'roles/createRole',
  async (roleData, { rejectWithValue }) => {
    try {
      const newRole = {
        ...roleData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      // Validation
      if (!roleData.name) {
        return rejectWithValue('Role name is required');
      }

      return newRole;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async (roleData, { rejectWithValue }) => {
    try {
      if (!roleData.id) {
        return rejectWithValue('Role ID is required');
      }
      
      return {
        ...roleData,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async (roleId, { rejectWithValue }) => {
    try {
      return roleId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: mockRoles,
    selectedRole: null,
    isModalOpen: false,
    status: 'idle',
    error: null
  },
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
        state.isModalOpen = false;
        toast.success('Role created successfully');
      })
      .addCase(createRole.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to create role');
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
          state.isModalOpen = false;
          toast.success('Role updated successfully');
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to update role');
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(r => r.id !== action.payload);
        toast.success('Role deleted successfully');
      })
      .addCase(deleteRole.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to delete role');
      });
  }
});

export const { setSelectedRole, toggleModal } = rolesSlice.actions;
export default rolesSlice.reducer;