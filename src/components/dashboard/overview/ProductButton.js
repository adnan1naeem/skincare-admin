import React from 'react';
import Button from '@material-ui/core/Button';

export const AddProductButton = ({ onClick }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40, marginBottom: 20 }}>
    <Button variant="contained" color="primary" onClick={onClick}>
      Add New Product
    </Button>
  </div>
);
