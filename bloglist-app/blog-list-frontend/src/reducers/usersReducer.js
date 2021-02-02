import usersService from '../services/users';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    case 'GET_USER':
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    const user = await usersService.getUser(id);
    dispatch({
      type: 'GET_USER',
      data: [user],
    });
  };
};

export default usersReducer;
