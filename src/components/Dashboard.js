import React, { useState } from 'react';
import { Row, Col, Card, Statistic, DatePicker, Select } from 'antd';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Dashboard.css';
import { Chart, registerables } from 'chart.js';

const Dashboard = ({ requestList = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewType, setViewType] = useState('year');

  const filterRequestsByDate = (requests, date, viewType) => {
    if (!date) return requests;
    return requests.filter(request => {
      const requestDate = new Date(request.requestDate);
      if (viewType === 'year') return requestDate.getFullYear() === date.year();
      if (viewType === 'month') return requestDate.getMonth() === date.month();
      if (viewType === 'day') return requestDate.getDate() === date.date();
      return false;
    });
  };

  Chart.register(...registerables);
  const filteredRequests = filterRequestsByDate(requestList, selectedDate, viewType);
  const requestsCount = Array(viewType === 'month' ? 31 : viewType === 'year' ? 12 : 24).fill(0);
  filteredRequests.forEach(request => {
    const requestDate = new Date(request.requestDate);
    const index = viewType === 'year' ? requestDate.getMonth() : viewType === 'month' ? requestDate.getDate() - 1 : requestDate.getHours();
    if (request.status === 'สำเร็จ') {
      requestsCount[index]++;
    }
  });

  const chartLabels = viewType === 'year' ? ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'] : viewType === 'month' ? Array.from({ length: 31 }, (_, i) => `${i + 1}`) : Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const barChartData = {
    labels: chartLabels,
    datasets: [{
      label: 'คำขอที่สำเร็จ',
      data: requestsCount,
      backgroundColor: 'rgba(52, 152, 219, 0.8)',
      borderColor: 'rgba(41, 128, 185, 1)',
      borderWidth: 1,
    }],
  };

  const lineChartData = {
    labels: chartLabels,
    datasets: [{
      label: 'แนวโน้มคำขอที่สำเร็จ',
      data: requestsCount,
      borderColor: 'rgba(46, 204, 113, 1)',
      backgroundColor: 'rgba(46, 204, 113, 0.2)',
      fill: true,
    }],
  };

  const doughnutChartData = {
    labels: ['สำเร็จ', 'ไม่สำเร็จ'],
    datasets: [{
      data: [requestsCount.reduce((a, b) => a + b, 0), filteredRequests.length - requestsCount.reduce((a, b) => a + b, 0)],
      backgroundColor: ['#2ecc71', '#e74c3c'],
    }],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">ข้อมูลสถิติการขออนุมัติคำขอ</h2>
      <Row gutter={[16, 16]} className="dashboard-grid">
        <Col xs={24} sm={12} md={8}>
          <Card className="dashboard-card">
            <h4>เลือกมุมมอง</h4>
            <Select defaultValue="year" onChange={value => setViewType(value)} style={{ width: '100%' }}>
              <Select.Option value="year">รายปี</Select.Option>
              <Select.Option value="month">รายเดือน</Select.Option>
              <Select.Option value="day">รายวัน</Select.Option>
            </Select>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="dashboard-card">
            <h4>เลือกช่วงเวลา</h4>
            <DatePicker
              format={viewType === 'year' ? 'YYYY' : viewType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'}
              onChange={(date) => setSelectedDate(date)}
              value={selectedDate}
              picker={viewType}
              style={{ width: '100%' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="dashboard-card success-card" title="สำเร็จ" extra={<FaCheckCircle color="#2ecc71" />}>
            <Statistic value={requestsCount.reduce((a, b) => a + b, 0)} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="dashboard-card fail-card" title="ไม่สำเร็จ" extra={<FaTimesCircle color="#e74c3c" />}>
            <Statistic value={filteredRequests.length - requestsCount.reduce((a, b) => a + b, 0)} />
          </Card>
        </Col>
      </Row>
      <Card className="dashboard-chart-card">
        <h4>จำนวนคำขอที่สำเร็จ</h4>
        <div className="chart-container"><Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
      </Card>
      <Card className="dashboard-chart-card">
        <h4>แนวโน้มคำขอที่สำเร็จ</h4>
        <div className="chart-container"><Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
      </Card>
      <Card className="dashboard-chart-card">
        <h4>สัดส่วนคำขอ</h4>
        <div className="chart-container"><Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
      </Card>
    </div>
  );
};

export default Dashboard;
