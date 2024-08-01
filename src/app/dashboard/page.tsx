"use client";
import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import ProductForm from './../../components/ProductForm';
import {ErrorAlert} from './../../components/dashboard/overview/error-alert'
import {AddProductButton} from './../../components/dashboard/overview/ProductButton';
import {ProductTable} from './../../components/dashboard/overview/ProductTable';
import { deleteRequestToken, getRequest } from '@/components/ApiHandler';
export default function Page(): React.JSX.Element {
  const [data, setData] = useState([]); // table data
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(false);
  const [open, setOpen] = useState(false); // State for controlling the form modal
  const [product, setProduct] = useState(null); // State to store product data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest('api/admin/products/get');
        setData(response?.products || []);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRowDelete = async (oldData?:any, resolve?:any) => {
      const response = await deleteRequestToken(`api/admin/products/delete/${oldData?._id}`)
      .then(() => {
        const dataDelete = [...data];
        const index = oldData.tableData._id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch(() => {
        setErrorMessages(true);
        setIsError(true);
        resolve();
      });
  };

  const handleAddProductClick = () => {
    setProduct(null); // Clear the product state
    setOpen(true); // Open the form modal
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={1} style={{ width: '100%' }}>
        <Grid item xs={12}>
        <ErrorAlert isError={isError} errorMessages={errorMessages?"Delete failed! Server error":""} />
          <AddProductButton onClick={handleAddProductClick} />
          <ProductTable data={data} handleRowDelete={handleRowDelete} />
        </Grid>
      </Grid>
      <ProductForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={(newData?:any) => {
          setData([...data, newData]);
          setOpen(false);
        }}
        product={product}
        setProduct={setProduct}
      />
    </div>
  );
}
