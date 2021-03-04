import React from 'react';
import { useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  const { title, type } = notification;
  // console.log(type);
  return (
    title !== '' && (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open
        key='top center'
        color='success'
      >
        <Alert severity={type}>{title}</Alert>
      </Snackbar>
    )
  );
};

export default Notification;
