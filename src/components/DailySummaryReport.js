import React, { useState } from "react";
import { FaPrint, FaTimes } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { sarabunFont } from './fonts/SarabunRegular';
import { Button, Input, Table, Card, Row, Col, Typography, Space } from "antd";

const { Title, Text } = Typography;

const DailySummaryReport = ({ requestList = [], reportDate }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter requests based on date range
  const filteredRequests = requestList.filter((req) => {
    const reqDate = new Date(req.serviceDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return reqDate >= start && reqDate <= end;
  });

  // Calculate stats for the filtered requests
  const successfulRequests = filteredRequests.filter((req) => req.status === "สำเร็จ").length;
  const unsuccessfulRequests = filteredRequests.filter((req) => req.status === "ไม่สำเร็จ").length;
  const pendingRequests = filteredRequests.filter((req) => req.status === "กำลังดำเนินการ").length;
  const totalRequests = filteredRequests.length;

  // Function to generate the PDF
  const generatePDF = () => {
    if (!startDate || !endDate) {
      alert("กรุณาเลือกช่วงวันที่ก่อนทำการพิมพ์รายงาน");
      return;
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    doc.addFileToVFS("SarabunRegular.ttf", sarabunFont);
    doc.addFont("SarabunRegular.ttf", "Sarabun", "normal");
    doc.setFont("Sarabun");

    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header with Title and Date Range
    doc.setFontSize(18);
    doc.text('สรุปบันทึกรายวัน', pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`วันที่ ${startDate} ถึง ${endDate}`, 20, 38);

    // Table of Requests
    const tableColumn = ["ไอดี", "ชื่อ", "นามสกุล", "วันที่ต้องการรับบริการ", "สถานะ", "หมายเหตุ"];
    const tableRows = filteredRequests.map((request) => [
      request.id,
      request.name,
      request.lastName,
      request.serviceDate,
      request.status,
      request.remark || "-",
    ]);

    // Styling the main table with black border
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: "grid",
      styles: {
        font: "Sarabun",
        fontSize: 10,
        cellPadding: 4,
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0],  // กรอบดำ
        lineWidth: 0.5,  // ความหนาของกรอบ
      },
      headStyles: {
        fillColor: [255, 255, 255], // สีพื้นหลังโปร่งใส (สีขาว)
        textColor: [0, 0, 0], // สีข้อความดำ
        fontStyle: "bold",
        fontSize: 11,
        halign: "center",
        valign: "middle",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // สีเบาๆ สำหรับแถวสลับ
      },
      columnStyles: {
        0: { cellWidth: 20, halign: "center", valign: "middle" },
        1: { cellWidth: 25, halign: "center", valign: "middle" },
        2: { cellWidth: 25, halign: "center", valign: "middle" },
        3: { cellWidth: 35, halign: "center", valign: "middle" },
        4: { cellWidth: 30, halign: "center", valign: "middle" },
        5: { cellWidth: 45, halign: "center", valign: "middle" },
      },
      margin: { top: 40, bottom: 20, left: 15, right: 15 },
      pageBreak: "auto",
    });
    
    // Adding status summary table on the right
    const statusTableData = [
      ["สถานะ", "จำนวน"],
      ["สำเร็จ", successfulRequests],
      ["ไม่สำเร็จ", unsuccessfulRequests],
      ["กำลังดำเนินการ", pendingRequests],
      ["รวม", totalRequests],
    ];

    const statusTableXPosition = 145;
    const statusTableYPosition = doc.lastAutoTable.finalY + 0;

    doc.autoTable({
      head: statusTableData.slice(0, 1),
      body: statusTableData.slice(1),
      startY: statusTableYPosition,
      theme: "grid",
      styles: {
        font: "Sarabun",
        fontSize: 10,
        cellPadding: 3,
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0],  // กรอบดำ
        lineWidth: 0.5,  // ความหนาของกรอบ
      },
      headStyles: {
        fillColor: [255, 255, 255], // สีพื้นหลังโปร่งใส (สีขาว)
        textColor: [0, 0, 0], // สีข้อความดำ
        fontStyle: "bold",
        fontSize: 11,
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 30, halign: "center", valign: "middle" },
        1: { cellWidth: 45, halign: "center", valign: "middle" },
      },
      margin: { left: 120, right: 10 },
    });

    // Saving the PDF
    doc.save("daily_summary_report.pdf");
  };

  const columns = [
    { title: "ไอดีผู้ขอรับบริการ", dataIndex: "id", key: "id" },
    { title: "ชื่อ", dataIndex: "name", key: "name" },
    { title: "นามสกุล", dataIndex: "lastName", key: "lastName" },
    { title: "วันที่ต้องการรับบริการ", dataIndex: "serviceDate", key: "serviceDate" },
    { title: "สถานะ", dataIndex: "status", key: "status" },
    { title: "หมายเหตุ", dataIndex: "remark", key: "remark" },
  ];

  return (
    <div className="container mt-4 p-4" style={{ fontFamily: 'TH SarabunPSK' }}>
      <Card title={<Title level={2}>สรุปบันทึกรายวัน</Title>} bordered>
        <p className="text-center mb-4">เลือกช่วงเวลา</p>

        {/* Date Range Picker */}
        <Row gutter={16} justify="center">
          <Col>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: "150px" }}
            />
          </Col>
          <Col>
            <Text>ถึง</Text>
          </Col>
          <Col>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ width: "150px" }}
            />
          </Col>
        </Row>

        {/* Table of Requests */}
        <Table
          columns={columns}
          dataSource={filteredRequests}
          rowKey="id"
          bordered
          className="mt-3"
          pagination={false}
        />

        {/* Summary Table */}
        <Card title="สรุปสถานะ" bordered className="mt-4">
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Text>สำเร็จ</Text>
                <Title level={4}>{successfulRequests} รายการ</Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Text>ไม่สำเร็จ</Text>
                <Title level={4}>{unsuccessfulRequests} รายการ</Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Text>กำลังดำเนินการ</Text>
                <Title level={4}>{pendingRequests} รายการ</Title>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Buttons */}
        <Space className="d-flex justify-content-center gap-3 mt-3">
          <Button type="primary" icon={<FaPrint />} onClick={generatePDF}>
            พิมพ์รายงาน
          </Button>
          <Button icon={<FaTimes />}>ยกเลิก</Button>
        </Space>
      </Card>
    </div>
  );
};

export default DailySummaryReport;
