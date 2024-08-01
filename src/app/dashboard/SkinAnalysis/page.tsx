"use client";
import React, { useState, useEffect } from 'react';
import { SkinAnalysisDescriptionTable } from '../../../components/dashboard/account/SkinAnalysisDescriptionTable';
import { getRequest } from '../../../components/ApiHandler'; 

const SkinAnalysisPage = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getRequest('api/admin/skinAnalysis/');
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
      <SkinAnalysisDescriptionTable data={data} refreshData={refreshData} />
    </div>
  );
};

export default SkinAnalysisPage;
