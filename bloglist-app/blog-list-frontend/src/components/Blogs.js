import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs }) => {
  return (
    <ul>
      {blogs.map(({ title, id, author }) => (
        <li key={id}>
          <Link to={`/blogs/${id}`}>
            <i> {title}</i> by <strong>{author}</strong>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Blogs;
