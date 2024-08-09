import React from 'react';
import MaterialTable from 'material-table';
import { Input } from '@material-ui/core';
import { tableIcons } from '../overview/IconsData';
import { putRequest } from '../../ApiHandler';

export const MainDescriptionTable = ({ data, refreshData }) => {

  const updateDescription = async (updatedData) => {
    try {
      const response = await putRequest(`api/admin/description/update/${updatedData?._id}`, updatedData);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Description updated successfully:', data);
      refreshData();
      return data;
    } catch (error) {
      console.error('Failed to update description:', error);
    }
  };

  return (
    <MaterialTable
      title="Skin Overview Descriptions"
      columns={[
        { title: "ID", field: "_id", hidden: true },
        { title: "Oiliness", field: "oilness", editable: 'never' },
        { title: "Elasticity", field: "elasticity", editable: 'never' },
        { title: "Hydration", field: "hydration", editable: 'never' },
        {
          title: "Description",
          field: "description",
          render: rowData => (
            <div style={{ maxHeight: 100, overflow: 'auto', width: 300 }}>{rowData.description}</div>
          ),
          editComponent: props => (
            <Input
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
              fullWidth
              multiline
            />
          ),
        },
      ]}
      options={{
        pageSize: 27,
        pageSizeOptions: [],
      }}
      data={data}
      icons={tableIcons}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            if (!newData.description || newData.description.trim() === '') {
              alert("Description should not be empty")
              reject(new Error('Description should not be empty'));
            } else {
              updateDescription(newData)
                .then(() => {
                  resolve();
                  refreshData();
                })
                .catch(error => {
                  reject(error);
                });
            }
          }),
      }}
    />
  );
};
