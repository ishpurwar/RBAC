import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/index';
import Navbar from './components/layout/Navbar';
/* import Dashboard from './components/Dashboard'; */
import UserManagement from './components/users/UserManagement';
import RoleManagement from './components/roles/RoleManagement';
import PermissionManagement from './components/roles/PermissionMatrix';
import Modal from './components/common/Modal';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<UserManagement />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/permissions" element={<PermissionManagement />} />
            </Routes>
          </div>
          <Modal />
          <Toaster position="top-right" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;