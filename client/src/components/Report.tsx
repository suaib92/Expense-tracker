import React from 'react';
import axios from 'axios';

const Report: React.FC = () => {
  const handleGenerateReport = async (type: 'monthly' | 'yearly') => {
    try {
      const response = await axios.get(`/api/reports/${type}`, {
        responseType: 'blob',
      });

      // Create a link element and set its href to the blob URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}-report.xlsx`);
      
      // Append link to the body and click it to trigger download
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Reports</h1>
      <button
        onClick={() => handleGenerateReport('monthly')}
        className="bg-blue-500 text-white px-4 py-2 mr-2"
      >
        Generate Monthly Report
      </button>
      <button
        onClick={() => handleGenerateReport('yearly')}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Generate Yearly Report
      </button>
    </div>
  );
};

export default Report;
