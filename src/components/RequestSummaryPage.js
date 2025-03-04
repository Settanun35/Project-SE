import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { FaPrint, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./RequestSummaryPage.css";

const RequestSummaryPage = ({ requestList = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = requestList.filter(
    (request) =>
      request.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.nearbyLocation?.toLowerCase().includes(searchQuery.toLowerCase())
  );
 // Function to format date as day-month-year (วัน-เดือน-ปี)
 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const columns = [
  {
    title: "ลำดับ",
    dataIndex: "index",
    key: "index",
    render: (text, record, index) => (index + 1).toString().padStart(3, "0"), // จัดรูปแบบหมายเลข ID
  },
    {
      title: "คำนำหน้า",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "นามสกุล",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "สถานที่ใกล้เคียง",
      dataIndex: "nearbyLocation",
      key: "nearbyLocation",
    },
    {
      title: "เขตของอปท.",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "ประเภทที่อยู่อาศัย",
      dataIndex: "residenceType",
      key: "residenceType",
    },
    {
      title: "วันที่แจ้ง",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (text) => formatDate(text),
    },
    {
      title: "วันที่ต้องการ",
      dataIndex: "serviceDate",
      key: "serviceDate",
      render: (text) => formatDate(text),
    },
    {
      title: "ช่วงเวลา",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "ประเภท",
      dataIndex: "reportType",
      key: "reportType",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="container-fluid mt-4">
          <h2 >สรุปบันทึกรายวัน</h2><br />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/daily-summary">
          <Button
            type="primary"
            icon={<FaPrint className="me-2" />}
            size="large"
            style={{
              backgroundColor: "#1D9D74",
              borderColor: "#1D9D74",
              fontWeight: "bold",
            }}
          >
            พิมพ์
          </Button>
        </Link>

        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 ค้นหาชื่อ-นามสกุล หรือ สถานที่ใกล้เคียง..."
          prefix={<FaSearch />}
          style={{
            width: "50%",
            borderRadius: "10px",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ddd",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredRequests}
        rowKey="id"
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        bordered
        scroll={{ x: "max-content" }}
        locale={{
          emptyText: "ไม่มีข้อมูลคำขอ",
        }}
        rowClassName="request-row"
        style={{
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default RequestSummaryPage;
