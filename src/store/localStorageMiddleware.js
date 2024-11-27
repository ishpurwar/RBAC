export const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const storageActions = [
      'users/addUser', 
      'users/updateUser', 
      'users/deleteUser',
      'roles/addRole', 
      'roles/updateRole', 
      'roles/deleteRole'
    ];
  
    if (storageActions.includes(action.type)) {
      const state = store.getState();
      localStorage.setItem('vrv-users', JSON.stringify(state.users.users));
      localStorage.setItem('vrv-roles', JSON.stringify(state.roles.roles));
    }
  
    return result;
  };

  export const loadFromLocalStorage = () => {
    try {
      const serializedUsers = localStorage.getItem('vrv-users');
      const serializedRoles = localStorage.getItem('vrv-roles');
  
      return {
        users: serializedUsers ? JSON.parse(serializedUsers) : [],
        roles: serializedRoles ? JSON.parse(serializedRoles) : []
      };
    } catch (err) {
      return undefined;
    }
  };