import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Card, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const AddStaffPage = ({ staffList, onUpdateStaff, onDeleteStaff }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const handleEditClick = (staff) => {
    setEditingStaff(staff);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditingStaff(null);
    setIsModalVisible(false);
  };

  const handleSaveChanges = () => {
    if (editingStaff) {
      onUpdateStaff(editingStaff);
    }
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setEditingStaff((prev) => ({ ...prev, role: value }));
  };

  const handleDeleteClick = (staffId) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณต้องการลบเจ้าหน้าที่คนนี้ใช่หรือไม่?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk: () => onDeleteStaff(staffId),
    });
  };

  const columns = [
    { title: '#', dataIndex: 'index', render: (_, __, index) => index + 1 },
    { title: 'Username', dataIndex: 'username' },
    { title: 'Password', dataIndex: 'password' },
    { title: 'Role', dataIndex: 'role' },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditClick(record)}>แก้ไข</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteClick(record.id)}>ลบ</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={3}>Staff List</Title>
          <Link to="/create-staff">
            <Button type="primary" icon={<PlusOutlined />}>เพิ่มเจ้าหน้าที่</Button>
          </Link>
        </Space>
        <Table 
          dataSource={staffList} 
          columns={columns} 
          rowKey="id" 
          style={{ marginTop: 20 }} 
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal 
        title="แก้ไขข้อมูลเจ้าหน้าที่" 
        visible={isModalVisible} 
        onCancel={handleCloseModal} 
        onOk={handleSaveChanges}
      >
        {editingStaff && (
          <Form layout="vertical">
            <Form.Item label="ชื่อผู้ใช้">
              <Input name="username" value={editingStaff.username} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="รหัสผ่าน">
              <Input.Password name="password" value={editingStaff.password} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="บทบาท">
              <Select value={editingStaff.role} onChange={handleRoleChange}>
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AddStaffPage;