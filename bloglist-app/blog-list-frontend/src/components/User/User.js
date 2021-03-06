import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getUser } from '../../reducers/usersReducer';
import { CardWrapper, MainInfo, BlogsPosted } from './styles';
import {
  Card,
  CardContent,
  Typography,
  Grow,
  List,
  ListItem,
  ListItemText,
  Divider,
  Zoom,
  Link,
} from '@material-ui/core';

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
      <CardWrapper>
        <Grow in style={{ transitionDelay: '100ms' }}>
          <Card variant='elevation'>
            <CardContent className='card-content'>
              <MainInfo>
                <Typography variant='h4'>{name}</Typography>
                <Typography className='main-info-bottom'>
                  Added blogs
                </Typography>
              </MainInfo>

              <BlogsPosted>
                <List className='blogs-list'>
                  {blogsPosted.map(({ id, title }, i) => (
                    <React.Fragment key={id}>
                      <Zoom
                        in
                        style={{ transitionDelay: (i * 100).toString() + 'ms' }}
                      >
                        <ListItem className='blog-list-content'>
                          <ListItemText>
                            <Link component={RouterLink} to={`/blogs/${id}`}>
                              {title}
                            </Link>
                          </ListItemText>
                        </ListItem>
                      </Zoom>
                      {i !== blogsPosted.length - 1 && <Divider key={id} />}
                    </React.Fragment>
                  ))}
                </List>
              </BlogsPosted>
            </CardContent>
          </Card>
        </Grow>
      </CardWrapper>
    );
  }
  return null;
};

export default User;
