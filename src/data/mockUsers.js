export const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@vrvsecurity.com",
      role: "Admin",
      status: "Active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@vrvsecurity.com", 
      role: "Security Analyst",
      status: "Active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@vrvsecurity.com",
      role: "Readonly User",
      status: "Inactive"
    }
  ];
  
  export const mockRoles = [
    {
      id: 1,
      name: "Admin",
      permissions: {
        users: ['read', 'create', 'update', 'delete'],
        roles: ['read', 'create', 'update', 'delete'],
        dashboard: ['full']
      }
    },
    {
      id: 2,
      name: "Security Analyst",
      permissions: {
        users: ['read', 'update'],
        roles: ['read'],
        dashboard: ['view']
      }
    },
    {
      id: 3,
      name: "Readonly User",
      permissions: {
        users: ['read'],
        roles: ['read'],
        dashboard: ['view']
      }
    }
  ];