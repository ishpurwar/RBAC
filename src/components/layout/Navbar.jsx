import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-100/90 text-white border-b border-b-gray-200">
      <div className="container mx-auto px-8 py-3 flex justify-between items-center ">
        <Link to="/" className="text-2xl font-bold text-indigo-500">
         RBAC
        </Link>
        <div className="space-x-4">
          <Link 
            to="/users" 
            className="text-slate-600 hover:text-slate-700 px-3 py-2 rounded"
          >
            Users
          </Link>
          <Link 
            to="/roles" 
            className="text-slate-600  hover:text-slate-700 px-3 py-2 rounded"
          >
            Roles
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;