"use client";
import React, { useState, useEffect } from 'react';
import { MainDescriptionTable } from '../../../components/dashboard/MainDescription/MainDescriptionTable';
import { getRequest } from '../../../components/ApiHandler'; 

const SkinAnalysisPage = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getRequest('api/admin/description/');
      if (response) {
        setData(response);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData()
  };

  return (
    <div>
      <MainDescriptionTable data={data} refreshData={refreshData} />
    </div>
  );
};

export default SkinAnalysisPage;
