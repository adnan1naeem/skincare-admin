import React from 'react';
import MaterialTable from 'material-table';
import { Input } from '@material-ui/core';
import { tableIcons } from './../overview/IconsData';
import { putRequest } from './../../ApiHandler';

export const SkinAnalysisDescriptionTable = ({ data, refreshData }) => {

  const updateDescription = async (updatedData) => {
    try {
      const response = await putRequest(`api/admin/skinAnalysis/update/${updatedData?._id}`, updatedData);

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
      title="My Skin Analysis"
      columns={[
        { title: "ID", field: "_id", hidden: true },
        { title: "Parameter", field: "parameter", editable: 'never' },
        { title: "Level", field: "level", editable: 'never' },
        {
          title: "Sub Title",
          field: "description",
          render: rowData => (
            <div style={{ maxHeight: 100, overflow: 'auto' }}>{rowData.description}</div>
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
        {
          title: "Description",
          field: "detail",
          render: rowData => (
            <div style={{ maxHeight: 100, overflow: 'auto',width:300 }}>{rowData.detail}</div>
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
      data={data}
      icons={tableIcons}
      options={{
        pageSize: 9,
        pageSizeOptions: [],
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            updateDescription(newData)
              .then(() => {
                resolve();
                refreshData();
              })
              .catch(error => {
                reject(error);
              });
          }),
      }}
    />
  );
};
