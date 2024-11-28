import React from 'react';
import { useSelector } from 'react-redux';
import { 
  UserIcon, 
  ShieldCheckIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/solid';

const Dashboard = () => {
  const { users = [], status: userStatus } = useSelector(state => state.users);
  const { roles = [], status: roleStatus } = useSelector(state => state.roles);

  const DashboardCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
      <div className={`p-3 rounded-full mr-4 ${color}`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Total Users" 
          value={users.length} 
          icon={UserIcon} 
          color="bg-blue-500" 
        />
        <DashboardCard 
          title="Total Roles" 
          value={roles.length} 
          icon={ShieldCheckIcon} 
          color="bg-green-500" 
        />
        <DashboardCard 
          title="Active Users" 
          value={users.filter(user => user.status === 'Active').length} 
          icon={ChartBarIcon} 
          color="bg-purple-500" 
        />
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          {users.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map(user => (
                  <tr key={user.id} className="border-b last:border-b-0">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No users found</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Role Distribution</h2>
          {roles.length > 0 ? (
            <div className="space-y-2">
              {roles.map(role => (
                <div key={role.id} className="flex justify-between items-center">
                  <span>{role.name}</span>
                  <span className="text-gray-500">
                    {users.filter(user => user.role === role.name).length} users
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No roles found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;