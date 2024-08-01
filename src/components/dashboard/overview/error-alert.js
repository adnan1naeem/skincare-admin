import React from 'react';
import Alert from '@material-ui/lab/Alert';

export const ErrorAlert = ({ isError, errorMessages }) => {
  if (!isError || !errorMessages.length) return null;

  return (
    <Alert severity="error">
      {errorMessages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </Alert>
  );
};
