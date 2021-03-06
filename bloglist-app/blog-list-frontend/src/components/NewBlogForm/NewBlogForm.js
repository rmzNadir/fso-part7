import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../reducers/blogsReducer';
import { useHistory } from 'react-router-dom';
import { FormSpace, FieldSpace } from './styles';
import {
  Typography,
  Grow,
  Card,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core';

const NewBlogForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // State only used by a single component that doesn't matter globally
  // and state for non critical UI elements can be local

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const { title, author, url } = newBlog;

  const handleNewBlogChange = ({ value }, property) => {
    let newObj = { ...newBlog };
    newObj[property] = value;
    setNewBlog(newObj);
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();

    const res = await dispatch(createBlog(newBlog));
    const {
      data: { id },
    } = res;

    setNewBlog({
      title: '',
      author: '',
      url: '',
    });

    history.push(`/blogs/${id}`);
  };

  return (
    <FormSpace>
      <Grow in>
        <Card>
          <CardContent>
            <Typography variant='h4'>New blog</Typography>

            <form id='newBlogForm' onSubmit={(e) => handleSubmitBlog(e)}>
              <FieldSpace>
                <TextField
                  required
                  fullWidth
                  label='Title'
                  variant='outlined'
                  color='secondary'
                  id='titleInput'
                  name='title'
                  value={title}
                  onChange={({ target }) =>
                    handleNewBlogChange(target, 'title')
                  }
                />
                <TextField
                  required
                  fullWidth
                  label='Author'
                  color='secondary'
                  variant='outlined'
                  id='authorInput'
                  name='author'
                  value={author}
                  onChange={({ target }) =>
                    handleNewBlogChange(target, 'author')
                  }
                />
                <TextField
                  required
                  fullWidth
                  label='Url'
                  color='secondary'
                  variant='outlined'
                  id='urlInput'
                  name='url'
                  value={url}
                  onChange={({ target }) => handleNewBlogChange(target, 'url')}
                />
                <Button
                  variant='contained'
                  color='secondary'
                  id='submitButton'
                  type='submit'
                >
                  Create
                </Button>
              </FieldSpace>
            </form>
          </CardContent>
        </Card>
      </Grow>
    </FormSpace>
  );
};

export default NewBlogForm;
