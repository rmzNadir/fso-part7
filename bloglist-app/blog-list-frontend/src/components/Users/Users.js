import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../../reducers/usersReducer';
import { UsersSpace } from './styles';
import {
  Paper,
  TableContainer,
  TableHead,
  Table,
  TableCell,
  TableBody,
  Link,
  TableRow,
  Typography,
  Card,
  CardContent,
  Grow,
} from '@material-ui/core';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    users && (
      <UsersSpace>
        <Grow in>
          <Card>
            <CardContent>
              <Typography className='users-header' variant='h4'>
                Users
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Blogs created</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {users.map(({ name, blogsPosted, id }) => (
                      <TableRow key={id}>
                        <TableCell component='th' scope='row'>
                          <Link component={RouterLink} to={`users/${id}`}>
                            {name}
                          </Link>
                        </TableCell>
                        <TableCell>{blogsPosted.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grow>
      </UsersSpace>
    )
  );
};

export default Users;
