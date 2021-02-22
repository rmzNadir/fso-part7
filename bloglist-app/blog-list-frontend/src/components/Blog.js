import React, { useState, useEffect } from 'react';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import blogs from '../services/blogs';

const BlogStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  margin: '1rem',
  padding: '1rem',
  borderRadius: '0.5rem',
};

const infoStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const Blog = ({ blog, User }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const { title, author, url, likes, user, id, comments: blogComments } = blog;
  const { id: userId } = User;

  useEffect(() => {
    setComments(blogComments);
  }, []);

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
    <div className='blog' style={BlogStyle}>
      <div>
        <span className='defaultInfo' style={{ marginRight: '1rem' }}>
          <i> {title}</i> by <strong>{author}</strong>
        </span>
      </div>

      <div className='extraInfo'>
        <br />
        <div className='linkDiv'>
          Link: <a href={url}>{url}</a>
        </div>
        <br />
        <div className='likesDiv' style={infoStyle}>
          Likes: {likes}
          <button
            id='likeButton'
            style={{ marginLeft: '0.5rem' }}
            onClick={() => dispatch(likeBlog(blog))}
          >
            Like
          </button>
        </div>
        <br />
        <div className='posterDiv'>Poster: {user.username}</div>
        <br />
        {userId === user.id && (
          <button id='removeButton' onClick={() => handleRemove(blog)}>
            Remove
          </button>
        )}
      </div>
      <input type='text' onChange={(e) => setComment(e.target.value)} />
      <button disabled={comment ? false : true} onClick={sendComments}>
        Add comment
      </button>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
