import { configureStore } from '@reduxjs/toolkit';
import { 
  localStorageMiddleware, 
  loadFromLocalStorage 
} from './localStorageMiddleware';
import usersReducer from './usersSlice';
import rolesReducer from './rolesSlice';

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware)
});