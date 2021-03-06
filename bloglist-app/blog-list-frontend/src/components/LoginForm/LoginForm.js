import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import blogService from '../../services/blogs';
import loginService from '../../services/login';
import { setNotification } from '../../reducers/notificationReducer';
import { loginUser } from '../../reducers/userReducer';
import {
  Typography,
  Grow,
  Card,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core';
import { LoginFormSpace, FieldSpace } from './styles';

const LoginForm = () => {
  const dispatch = useDispatch();

  // State only used by a single component that doesn't matter globally
  // and state for non critical UI elements can be local

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Service implementation for handling user logins

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(loginUser(user));

      dispatch(
        setNotification(
          {
            type: 'success',
            title: `${user.username} successfully logged in`,
          },
          5
        )
      );
    } catch (e) {
      dispatch(
        setNotification(
          {
            type: 'error',
            title: 'Login failed, check your username and password',
          },
          5
        )
      );

      console.log(e);
    }
  };

  const handleLoginChange = (e, type) => {
    if (type === 'username') {
      setUsername(e.target.value);
    }
    if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <LoginFormSpace>
      <Grow in>
        <Card>
          <CardContent>
            <Typography variant='h4' className='loginTitle'>
              Login
            </Typography>

            <form onSubmit={(e) => handleFormSubmit(e)}>
              <FieldSpace>
                <TextField
                  required
                  fullWidth
                  label='Username'
                  id='username'
                  name='username'
                  variant='outlined'
                  color='secondary'
                  value={username}
                  onChange={(e) => handleLoginChange(e, 'username')}
                />
                <TextField
                  required
                  fullWidth
                  id='password'
                  name='password'
                  label='Password'
                  type='password'
                  color='secondary'
                  autoComplete='current-password'
                  variant='outlined'
                  value={password}
                  onChange={(e) => handleLoginChange(e, 'password')}
                />
                <Button
                  variant='contained'
                  color='secondary'
                  id='submitButton'
                  type='submit'
                >
                  Login
                </Button>
              </FieldSpace>
            </form>
          </CardContent>
        </Card>
      </Grow>
    </LoginFormSpace>
  );
};

export default LoginForm;
