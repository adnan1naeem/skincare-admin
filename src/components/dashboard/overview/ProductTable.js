import React from 'react';
import MaterialTable from "material-table";
import { Select, MenuItem, Chip, Input, TextField } from '@material-ui/core';
import { tableIcons } from './IconsData';
import './ProductTable.css'; // Import the CSS file for custom styles

export const ProductTable = ({ data, handleRowDelete, handleRowUpdate }) => {
  const enumValues = ["Hydration", "Oilness", "Elasticity", "SkinAge"];

  return (
    <MaterialTable
      title="Product List"
      columns={[
        { title: "ID", field: "_id", hidden: true },
        {
          title: "Image",
          field: "productImage",
          render: rowData => (
            <img
              src={rowData
                ? rowData.productImage.startsWith('uploads/')
                  ? `https://152.42.225.202/${rowData.productImage}`
                  : rowData.productImage
                : " "
              }
              alt={rowData ? rowData.productImage : "Image"}
              style={{ width: 30, height: 40, borderRadius: '10%' }}
            />
          ),
          editComponent: props => (
            <TextField
              style={{ width: 200 }}
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              label="Image URL"
              fullWidth
            />
          ),
        },
        { title: "Title", field: "title" },
        {
          title: "Description",
          field: "description",
          render: rowData => (
            <div className="description-cell">
              {rowData.description}
            </div>
          ),
        },
        {
          title: "Detail",
          field: "detail",
          render: rowData => (
            <div className="detail-cell" style={{ maxHeight: 100, overflow: 'auto', width: 300 }}>
              {rowData.detail}
            </div>
          ),
        },
        { title: "Price", field: "price" },
        { title: "Discount Price", field: "discountPrice" },
        {
          title: "Hydration",
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
          title: "Oil",
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
          title: "Elasticity",
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
          title: "Feature Images",
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
      options={{
        pageSize: 5,
        pageSizeOptions: [5, 10, 15].filter(size => size <= data.length),
        emptyRowsWhenPaging: false,
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            handleRowUpdate(newData, oldData, resolve)
              .catch(reject);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve);
          }),
      }}
    />
  );
};
