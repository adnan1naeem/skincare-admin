"use client";
import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import ProductForm from './../../components/ProductForm';
import {ErrorAlert} from './../../components/dashboard/overview/error-alert';
import {AddProductButton} from './../../components/dashboard/overview/ProductButton';
import {ProductTable} from './../../components/dashboard/overview/ProductTable';
import { deleteRequestToken, getRequest, putRequest } from '@/components/ApiHandler';

export default function Page(): React.JSX.Element {
  const [data, setData] = useState<any>([]); // table data
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(false);
  const [open, setOpen] = useState(false); // State for controlling the form modal
  const [product, setProduct] = useState(null); // State to store product data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getRequest('api/admin/products/get');
      setData(response?.products || []);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleRowDelete = async (oldData?:any, resolve?:any) => {
    try {
      await deleteRequestToken(`api/admin/products/delete/${oldData._id}`);
      fetchData(); // Refresh data after deletion
      resolve();
    } catch (error) {
      setErrorMessages("Delete failed! Server error");
      setIsError(true);
      resolve();
    }
  };

  const handleRowUpdate = async (newData?:any, oldData?:any, resolve?:any) => {
    try {
      await putRequest(`api/admin/products/update/${newData._id}`, newData);
      fetchData(); // Refresh data after edit
      resolve();
    } catch (error) {
      setErrorMessages("Update failed! Server error");
      setIsError(true);
      resolve();
    }
  };

  const handleAddProductClick = () => {
    setProduct(null); // Clear the product state
    setOpen(true); // Open the form modal
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={1} style={{ width: '100%' }}>
        <Grid item xs={12}>
          <ErrorAlert isError={isError} errorMessages={errorMessages || ""} />
          <AddProductButton onClick={handleAddProductClick} />
          <ProductTable
            data={data}
            handleRowDelete={handleRowDelete}
            handleRowUpdate={handleRowUpdate}
          />
        </Grid>
      </Grid>
      <ProductForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={(newData) => {
          setData([...data, newData]);
          setOpen(false);
        }}
        product={product}
        setProduct={setProduct}
      />
    </div>
  );
}
