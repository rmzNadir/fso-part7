import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import {
  Menu,
  MenuItem,
  IconButton,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  StyledToolbar,
  AppBody,
  CurrentUserInfo,
  StyledDivider,
  StyledAppBar,
} from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { logoutUser } from './reducers/userReducer';

// Components

import Blogs from './components/Blogs/Blogs';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm/LoginForm';
import Notification from './components/Notification';
import Blog from './components/Blog/Blog';
import Users from './components/Users/Users';
import User from './components/User/User';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState('/');

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, [dispatch]);

  // Service implementation for handling user logouts
  const handleLogout = () => {
    setAnchorEl(null);
    setTab('/');
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (e, tab) => {
    setTab(tab);
    history.push(tab);
  };

  const handleShowUserProfile = () => {
    setAnchorEl(null);
    history.push(`/users/${user.id}`);
    setTab('/users');
  };

  return (
    <>
      <Notification />
      <StyledAppBar position='static'>
        <Tabs value={tab} onChange={handleTabChange} variant='standard'>
          <Tab value='/' label={user ? 'Home' : 'Login'} />
          {user && [
            <Tab key='newBlog' value='/blogs/new' label='New blog' />,
            <Tab key='users' value='/users' label='Users' />,
          ]}
        </Tabs>
        <StyledToolbar>
          {user && (
            <CurrentUserInfo>
              <Typography variant='subtitle1'>{user && user.name} </Typography>
              <StyledDivider
                orientation='vertical'
                variant='fullWidth'
                flexItem
              />
              <IconButton onClick={handleMenu} color='inherit'>
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleShowUserProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </CurrentUserInfo>
          )}
        </StyledToolbar>
      </StyledAppBar>

      <AppBody>
        <Switch>
          <Route path='/blogs/new'>
            <NewBlogForm />
          </Route>
          <Route path='/blogs/:id'>
            {blog && <Blog blog={blog} User={user} />}
          </Route>
          <Route path='/blogs'>
            <Redirect to='/' />
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
      </AppBody>
    </>
  );
};

export default App;
