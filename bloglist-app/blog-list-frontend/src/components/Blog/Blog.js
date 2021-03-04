import React, { useState, useEffect, useRef } from 'react';
import { likeBlog, removeBlog } from '../../reducers/blogsReducer';
import { useDispatch } from 'react-redux';
import blogs from '../../services/blogs';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grow,
  List,
  ListItem,
  ListItemText,
  Divider,
  Zoom,
} from '@material-ui/core';
import { ThumbUpOutlined, Link, ChatBubbleOutline } from '@material-ui/icons';
import { CardWrapper, ActionsArea, MainInfo, CommentsArea } from './styles';

const Blog = ({ blog, User }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const commentsRef = useRef(null);

  const { title, author, url, likes, user, comments: blogComments, id } = blog;
  const { id: userId } = User;

  useEffect(() => {
    setComments(blogComments);
  }, [blogComments]);

  const scrollToBottom = () =>
    commentsRef && commentsRef.current.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  // Service implementation for handling removal of blogs

  const handleRemove = async (blog) => {
    const { title, author, id } = blog;
    const confirmResult = window.confirm(
      `Are you sure you want to remove blog ${title} by ${author}?`
    );
    if (confirmResult) {
      dispatch(removeBlog(id));
    }
  };

  const sendComments = async () => {
    try {
      const newComment = { content: comment };
      const res = await blogs.createComment(id, newComment);
      const { success, data } = res;
      if (success) {
        setComments([...comments, data]);
        setComment('');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CardWrapper>
      <Grow in style={{ transitionDelay: '100ms' }}>
        <Card variant='elevation'>
          <CardContent className='card-content'>
            <MainInfo>
              <Typography variant='h4'>{title}</Typography>
              <Typography color='textSecondary' className='main-info-bottom'>
                <span>
                  by <i> {author}</i>
                </span>
                <span>Posted by: {user.username}</span>
              </Typography>
            </MainInfo>

            <ActionsArea>
              <Button
                color='secondary'
                variant='outlined'
                startIcon={<ThumbUpOutlined />}
                onClick={() => dispatch(likeBlog(blog))}
              >
                Like ({likes})
              </Button>

              <Button
                variant='outlined'
                color='secondary'
                startIcon={<ChatBubbleOutline />}
                href='#new-comment-input'
              >
                Comment
              </Button>

              <Button
                color='secondary'
                href={url}
                target='_blank'
                variant='outlined'
                startIcon={<Link />}
              >
                Visit
              </Button>
            </ActionsArea>
            <Typography variant='body2' component='p'>
              {userId === user.id && (
                <button id='removeButton' onClick={() => handleRemove(blog)}>
                  Remove
                </button>
              )}
            </Typography>
            <CommentsArea>
              <List className='comments-list'>
                {comments.map(({ id, content }, i) => (
                  <React.Fragment key={id}>
                    <Zoom in style={{ transitionDelay: '100ms' }}>
                      <ListItem className='comment-list-content'>
                        <ListItemText>{content}</ListItemText>
                      </ListItem>
                    </Zoom>
                    {i !== comments.length - 1 && <Divider key={id} />}
                  </React.Fragment>
                ))}
                <div ref={commentsRef} />
              </List>
              <TextField
                fullWidth
                multiline
                rowsMax={6}
                id='new-comment-input'
                variant='outlined'
                color='secondary'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='comment-text-area'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (comment) {
                      sendComments();
                    }
                  }
                }}
              />
            </CommentsArea>
          </CardContent>
        </Card>
      </Grow>
    </CardWrapper>
  );
};

export default Blog;
