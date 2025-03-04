import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [requests, setRequests] = useState([]);

  const addRequest = (request) => {
    setRequests([...requests, request]);
  };

  // คำนวณจำนวนสำเร็จและไม่สำเร็จ
  const successCount = requests.filter(request => request.status === 'สำเร็จ').length;
  const failureCount = requests.filter(request => request.status === 'ไม่สำเร็จ').length;
  const totalCount = requests.length;

  const data = {
    labels: ['สำเร็จ', 'ไม่สำเร็จ', 'รวม'],
    datasets: [
      {
        label: 'จำนวน',
        data: [successCount, failureCount, totalCount],
        backgroundColor: ['#4caf50', '#f44336', '#3f51b5'],
        borderColor: ['#4caf50', '#f44336', '#3f51b5'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'สถิติการขอรับบริการ',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
