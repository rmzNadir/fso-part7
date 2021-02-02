import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);
  console.log('users', users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    users && (
      <>
        <h1>Users</h1>
        <div className='users-info-header'>
          <strong>Name</strong>
          <strong>Blogs Created</strong>
        </div>
        {users.map(({ name, blogsPosted, id }) => (
          <div key={id} className='users-info-header'>
            <div>{name}</div>
            <div>{blogsPosted.length}</div>
          </div>
        ))}
      </>
    )
  );
};

export default Users;
