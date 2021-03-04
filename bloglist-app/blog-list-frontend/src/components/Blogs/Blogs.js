import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Zoom,
} from '@material-ui/core';
import { BlogsArea, MainInfo, ExtraInfo } from './styles';

const Blogs = ({ blogs }) => {
  return (
    <BlogsArea>
      {blogs.map(({ title, id, author, comments, likes }, i) => (
        <Zoom
          key={id}
          in
          style={{ transitionDelay: (i * 100).toString() + 'ms' }}
        >
          <Card variant='elevation' className='blogs-card'>
            <CardContent className='card-content'>
              <MainInfo>
                <Typography variant='h5' component='h2'>
                  {title}
                </Typography>
                <Typography color='textSecondary' gutterBottom>
                  by <i> {author}</i>
                </Typography>
              </MainInfo>
              <ExtraInfo>
                <Typography variant='body2' component='p'>
                  Comments: {comments.length}
                  <br />
                  Likes: {likes}
                </Typography>
              </ExtraInfo>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                color='secondary'
                component={Link}
                to={`/blogs/${id}`}
              >
                More info
              </Button>
            </CardActions>
          </Card>
        </Zoom>
      ))}
    </BlogsArea>
  );
};

export default Blogs;
