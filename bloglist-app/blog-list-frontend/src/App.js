import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { logoutUser } from './reducers/userReducer';

// Components

import Blogs from './components/Blogs';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';

// Styles

import './App.css';

// Services

import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch('/blogs/:id');
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, [dispatch]);

  // Service implementation for handling user logouts
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(
      setNotification(
        {
          type: 'success',
          title: `${user.username} successfully logged out`,
        },
        5
      )
    );
    history.push('/login');
  };

  const blog =
    match && blogs ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <>
      {user && (
        <>
          <div className='nav-bar'>
            <Link to='/'>home</Link>
            <Link to='/blogs/new'>new blog</Link>
            <Link to='/users'>users</Link>
            <div>
              {user && user.name} logged in. &nbsp;
              <button onClick={handleLogout}>Logout</button>
              <br />
            </div>
          </div>

          <h2>Blog app</h2>
        </>
      )}
      <Notification />
      <Switch>
        <Route path='/blogs/:id'>
          {blog && <Blog blog={blog} User={user} />}
        </Route>
        <Route path='/blogs'>
          <Redirect to='/' />
        </Route>
        <Route path='/blogs/new'>
          <NewBlogForm />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/login'>
          {user ? <Redirect to='/' /> : <LoginForm />}
        </Route>
        <Route path='/'>
          {user ? <Blogs blogs={blogs} /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </>
  );
};

export default App;
