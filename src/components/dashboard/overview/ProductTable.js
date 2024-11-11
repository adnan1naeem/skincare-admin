import React from 'react';
import MaterialTable from "material-table";
import { Select, MenuItem, Chip, Input, TextField } from '@material-ui/core';
import { tableIcons } from './IconsData';
import './ProductTable.css'; // Import the CSS file for custom styles

export const ProductTable = ({ data, handleRowDelete, handleRowUpdate }) => {
  const enumValues = ["Hydration", "Oiliness", "Elasticity", "SkinAge"];

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
              alt={rowData ? "Image" : "Image"}
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
        {
          title: "Amazon URL",
          field: "amazonUrl",
          render: rowData => (
            <a href={rowData.amazonUrl} target="_blank" rel="noopener noreferrer"  style={{
              maxWidth: 150,
              display: "inline-block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              {rowData.amazonUrl}
            </a>
          ),
          editComponent: props => (
            <TextField
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              label="amazonUrl"
              fullWidth
            />
          ),
        },
        { title: "Title", field: "title" },
        {
          title: "Description",
          field: "description",
          render: rowData => (
            <div className="detail-cell" style={{maxHeight: 100,overflow: 'auto',width: 300 }}>
              {rowData.description}
            </div>
          ),
          editComponent: props => (
            <TextField
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
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
          editComponent: props => (
            <TextField
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          ),
        },
        { 
          title: "Price", 
          field: "price",
          render: rowData => parseFloat(rowData.price).toFixed(2),
          editComponent: props => (
            <TextField
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              type="number"
              inputProps={{ step: "0.01" }}
              fullWidth
            />
          ),
        },
        { 
         title: "Discount Price", field: "discountPrice",
          render: rowData => parseFloat(rowData.discountPrice).toFixed(2),
          editComponent: props => (
            <TextField
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              type="number"
              inputProps={{ step: "0.01" }}
              fullWidth
            />
          ),
        },
        {
          title: "Hydration",
          field: "hydration",
          editComponent: props => (
            <Select
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              input={<Input />}
            >
              {["any","low", "medium", "high"].map(option => (
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
              {["any","low", "medium", "high"].map(option => (
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
              {["any","low", "medium", "high"].map(option => (
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
