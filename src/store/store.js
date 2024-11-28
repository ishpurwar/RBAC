import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import rolesReducer from './rolesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false 
    })
});