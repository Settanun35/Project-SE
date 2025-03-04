import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPrint, FaSearch } from "react-icons/fa";
import { Modal, Button, Table } from "antd";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import "./RequestPage.css"; // Ensure you have appropriate styles in your CSS

const RequestPage = ({ requestList = [], onDeleteRequest }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 เก็บค่าค้นหา
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedRequest, setSelectedRequest] = useState(null); // State for the selected request for deletion

  const handleEditRequest = (request) => {
    navigate(`/edit-request/${request.id}`);
  };

  // 🎯 กรองรายการตามชื่อ-นามสกุล หรือบริษัท
  const filteredRequests = requestList.filter(
    (request) =>
      request.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate(); // จะแสดงแค่วันที่
  };
  

  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    const monthsInThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const month = monthsInThai[date.getMonth()]; // แสดงเดือนเป็นภาษาไทย
    const year = date.getFullYear();
    return { month, year };
  };

  const handleShowModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRequest) {
      onDeleteRequest(selectedRequest.id); // Call the delete function with selected request id
    }
    setShowModal(false); // Close the modal after deletion
  };

  const handleDownloadWord = (request, index) => {
    // Fetch the template from the public folder
    const formattedId = (index + 1).toString().padStart(3, "0");
    fetch("/template.docx")
      .then((response) => response.arrayBuffer())
      .then((data) => {
        // Create a zip object from the template
        const zip = new PizZip(data);

        // Create a Docxtemplater instance
        const doc = new Docxtemplater(zip);

        // Get month and year for request date
        const { month: requestDateMonth, year: requestDateYear } = getMonthYear(request.requestDate);
        const { month: serviceDateMonth, year: serviceDateYear } = getMonthYear(request.serviceDate);

        // Replace placeholders with request data
        doc.setData({
          id: formattedId,
          prefix: request.prefix,
          name: request.name,
          lastName: request.lastName,
          phone: request.phone,
          company: request.company,
          houseNumber: request.houseNumber,
          village: request.village,
          alley: request.alley,
          road: request.road,
          province: request.province,
          district: request.district,
          subdistrict: request.subdistrict,
          nearbyLocation: request.nearbyLocation,
          postalArea: request.postalArea,
          localAuthority: request.localAuthority,
          reportType: request.reportType,
          time: request.time,
          requestTime: request.requestTime,
          requestDate: formatDate(request.requestDate),
          serviceDate: formatDate(request.serviceDate),
          timeSlot: request.timeSlot,
          status: request.status,
          requestDateMonth,
          requestDateYear,
          serviceDateMonth,
          serviceDateYear,
          // Format residenceType as checked/unchecked
          residenceType_1: request.residenceType.includes("บ้านพักอาศัยหนึ่งชั้น") ? "✔" : "",
          residenceType_2: request.residenceType.includes("บ้านพักอาศัยสองชั้น") ? "✔" : "",
          residenceType_3: request.residenceType.includes("โรงงาน") ? "✔" : "",
          residenceType_4: request.residenceType.includes("อาคารสำนักงาน") ? "✔" : "",
          residenceType_5: request.residenceType.includes("ตึกแถว อาคาพาณิชย์") ? "✔" : "",
          residenceType_6: request.residenceType.includes("อาคารอยู่อาศัยรวม") ? "✔" : "",
          residenceType_7: request.residenceType.includes("ร้านอาหาร ภัตตรคาร") ? "✔" : "",
          residenceType_8: request.residenceType.includes("หน่วยงานก่อสร้าง") ? "✔" : "",
          residenceType_9: request.residenceType.includes("ศาสนสถาน โรงเรียน") ? "✔" : "",
          residenceType_10: request.residenceType.includes("อื่นๆ") ? "✔" : "",
          // Format reportType as checked/unchecked
          reportType_1: request.reportType.includes("แจ้งด้วยตนเอง") ? "✔" : "",
          reportType_2: request.reportType.includes("แจ้งด้วยโทรศัพท์") ? "✔" : "",
          // Format timeSlot as checked/unchecked
          t1: request.timeSlot.includes("เช้า") ? "✔" : "",
          t2: request.timeSlot.includes("บ่าย") ? "✔" : "",
          // Format prefix as checked/unchecked
          prefix1: request.prefix.includes("นาย") ? "" : "——",
          prefix2: request.prefix.includes("นางสาว") ? "" : "———",
          prefix3: !request.prefix.includes("นางสาว") && request.prefix.includes("นาง") ? "" : "——",
          
         
          


         
        });

        try {
          // Render the document with the data
          doc.render();

          // Generate the final document as a blob
          const output = doc.getZip().generate({ type: "blob" });

          // Trigger download of the file
          const link = document.createElement("a");
          link.href = URL.createObjectURL(output);
          link.download = `${request.name}_${request.lastName}_request.docx`;
          link.click();
        } catch (error) {
          console.error("Error generating Word document:", error);
        }
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => (index + 1).toString().padStart(3, "0"), // ทำให้เป็น 3 หลัก เช่น 001, 002
      width: "5%",
    },
    {
      title: "คำนำหน้า",
      dataIndex: "prefix",
      key: "prefix",
      width: "10%",
    },
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "นามสกุล",
      dataIndex: "lastName",
      key: "lastName",
      width: "15%",
    },
    {
      title: "โทรศัพท์",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
    },
    {
      title: "บริษัท/ร้าน/หมู่บ้าน",
      dataIndex: "company",
      key: "company",
      width: "15%",
    },
    {
      title: "บ้านเลขที่",
      dataIndex: "houseNumber",
      key: "houseNumber",
      width: "10%",
    },
    {
      title: "หมู่ที่",
      dataIndex: "village",
      key: "village",
      width: "10%",
    },
    {
      title: "ซอย",
      dataIndex: "alley",
      key: "alley",
      width: "10%",
    },
    {
      title: "ถนน",
      dataIndex: "road",
      key: "road",
      width: "10%",
    },
    {
      title: "ตำบล",
      dataIndex: "subdistrict",
      key: "subdistrict",
      width: "10%",
    },
    {
      title: "อำเภอ",
      dataIndex: "district",
      key: "district",
      width: "10%",
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: "10%",
    },
    {
      title: "สถานที่ใกล้เคียง",
      dataIndex: "nearbyLocation",
      key: "nearbyLocation",
      width: "15%",
    },
    {
      title: "เขตของอปท.",
      dataIndex: "localAuthority",
      key: "localAuthority",
      width: "10%",
    },
    {
      title: "ประเภทที่อยู่อาศัย",
      dataIndex: "residenceType",
      key: "residenceType",
      width: "15%",
    },
    {
      title: "ช่องทางการแจ้งขอรับบริการ",
      dataIndex: "reportType",
      key: "reportType",
      width: "15%",
    },
    {
      title: "เวลาที่แจ้งขอรับบริการ",
      dataIndex: "time",
      key: "time",
      width: "10%",
    },
    {
      title: "ช่วงเวลาที่ต้องการรับบริการ",
      dataIndex: "serviceDate",
      key: "serviceDate",
      render: (text) => formatDate(text), // Format date
      width: "15%",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "แก้ไข",
      key: "edit",
      render: (text, record) => (
        <button
          className="btn btn-warning btn-sm"
          onClick={() => handleEditRequest(record)}
        >
          <FaEdit />
        </button>
      ),
      width: "8%",
    },
    {
      title: "ลบ",
      key: "delete",
      render: (text, record) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleShowModal(record)}
        >
          <FaTrashAlt />
        </button>
      ),
      width: "8%",
    },
    {
      title: "พิมพ์",
      key: "print",
      render: (text, record, index) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleDownloadWord(record, index)}
        >
          <FaPrint />
        </button>
      ),
      width: "8%",
    },
  ];

  const dataSource = filteredRequests.map((request, index) => ({
    key: request.id,
    ...request,
  }));

  return (
    
    <div className="container-fluid mt-3">
        <h2 >ผู้ขอรับบริการ</h2><br />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-success" onClick={() => navigate("/add-request")}>
          + เพิ่มคำขอ
        </button>
        <div className="input-group w-50">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="🔍 ค้นหาชื่อ-นามสกุล หรือ บริษัท/ร้าน..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false} // Disable pagination if not required
        rowClassName="table-row" // Add row class for hover effect
        bordered
        size="middle"
        scroll={{ x: 1200 }} // Scroll horizontally if there are too many columns
      />

      {/* Confirmation Modal */}
      <Modal
        title="ยืนยันการลบข้อมูล"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowModal(false)}>
            ยกเลิก
          </Button>,
          <Button key="confirm" type="danger" onClick={handleConfirmDelete}>
            ยืนยัน
          </Button>,
        ]}
      >
        <p>คุณต้องการลบข้อมูลของ {selectedRequest?.name} {selectedRequest?.lastName} หรือไม่?</p>
      </Modal>
    </div>
  );
};

export default RequestPage;
