# RBAC Management Dashboard

## Project Overview

This is a Role-Based Access Control (RBAC) management dashboard developed for VRV Security's frontend developer internship assignment. The application provides a comprehensive solution for managing users, roles, and permissions with a focus on security and user experience.

## Tech Stack

- **Frontend Framework**: React
- **State Management**: Redux
- **Styling**: Tailwind CSS
- **Additional Tools**: 
  - React Router (for navigation)
  - Axios (for API calls)
  - React Hook Form (for form management)

## Features

### User Management
- View, add, edit, and delete users
- Assign roles to users
- Manage user status (Active/Inactive)

### Role Management
- Create and edit roles
- Define custom permissions for roles
- Granular permission control (Read, Write, Delete)

### Key Functionalities
- Dynamic permission assignment
- Responsive design
- Intuitive user interface
- Mock API integration for CRUD operations

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/RBAC.git
cd rbac-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm start
# or
yarn start
```

## Project Structure
```
src/
│
├── components/
│   ├── users/
│   ├── roles/
│   └── permissions/
│
├── redux/
│   ├── actions/
│   ├── reducers/
│   └── store.js
│
├── services/
│   └── api.js
│
├── utils/
│   └── validation.js
│
└── App.js
```

## Security Considerations
- Input validation
- Error handling
- Secure mock API calls
- Responsive design for various devices

## Future Enhancements
- Implement actual backend integration
- Add more advanced filtering and search capabilities
- Enhance permission granularity
- Implement comprehensive logging

## Acknowledgments
- VRV Security for the internship assignment
- Open-source community for invaluable tools and libraries
