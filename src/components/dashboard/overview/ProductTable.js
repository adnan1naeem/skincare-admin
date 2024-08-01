import React from 'react';
import MaterialTable from "material-table";
import { Select, MenuItem, Chip, Input } from '@material-ui/core';
import { tableIcons } from './IconsData';
import './ProductTable.css'; // Import the CSS file for custom styles
import { putRequest } from '@/components/ApiHandler';

export const ProductTable = ({ data, handleRowDelete }) => {
  const enumValues = ["Hydration", "Oilness", "Elasticity", "SkinAge"];

  const updateProduct = async (updatedData) => {
    try {
      const response = await putRequest(`api/admin/products/update/${updatedData?._id}`,updatedData);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Product updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <MaterialTable
      title="Product List"
      columns={[
        { title: "id", field: "id", hidden: true },
        {
          title: "Image",
          render: rowData => (
            <img
              src={rowData
                ? rowData.productImage.startsWith('uploads/')
                  ? `http://152.42.225.202/${rowData.productImage}`
                  : rowData.productImage
                : " "
              }
              alt={rowData ? rowData.productImage : "Image"}
              style={{ width: 30, height: 40, borderRadius: '10%' }}
            />
          )
        },
        { title: "title", field: "title" },
        {
          title: "description",
          field: "description",
          render: rowData => (
            <div className="description-cell">
              {rowData.description}
            </div>
          ),
        },
        { title: "price", field: "price" },
        { title: "discountPrice", field: "discountPrice" },
        {
          title: "hydration",
          field: "hydration",
          editComponent: props => (
            <Select
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              input={<Input />}
            >
              {["low", "medium", "high"].map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: "oil",
          field: "oil",
          editComponent: props => (
            <Select
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              input={<Input />}
            >
              {["low", "medium", "high"].map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: "elasticity",
          field: "elasticity",
          editComponent: props => (
            <Select
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              input={<Input />}
            >
              {["low", "medium", "high"].map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: "featureImages",
          field: "featureImages",
          render: rowData => (
            <div>
              {rowData.featureImages && rowData.featureImages.map((item, index) => (
                <Chip key={index} label={item} style={{ margin: '2px' }} />
              ))}
            </div>
          ),
          editComponent: props => (
            <Select
              multiple
              value={props.value || []}
              onChange={e => props.onChange(e.target.value)}
              renderValue={selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value} style={{ margin: '2px' }} />
                  ))}
                </div>
              )}
              input={<Input />}
            >
              {enumValues.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          ),
        }
      ]}
      data={data}
      icons={tableIcons}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            updateProduct(newData)
              .then(updatedProduct => {
                resolve();
              })
              .catch(error => {
                reject(error);
              });
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve);
          }),
      }}
    />
  );
};
