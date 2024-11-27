import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          VRV Security RBAC
        </Link>
        <div className="space-x-4">
          <Link 
            to="/users" 
            className="hover:bg-blue-700 px-3 py-2 rounded"
          >
            Users
          </Link>
          <Link 
            to="/roles" 
            className="hover:bg-blue-700 px-3 py-2 rounded"
          >
            Roles
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;