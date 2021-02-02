import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../reducers/usersReducer';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users[0]);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  if (user) {
    const { name, blogsPosted } = user;
    return (
      <>
        <h1>{name}</h1>
        <h3>Added blogs</h3>
        <ul>
          {blogsPosted.map(({ title, id }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      </>
    );
  }
  return null;
};

export default User;
