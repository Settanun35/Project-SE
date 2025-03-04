import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Select, Button, Typography, Space } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const CreateStaffPage = ({ onAddStaff }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'User',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSave = () => {
    if (!formData.username || !formData.password || !formData.role) {
      alert('Please fill out all fields.');
      return;
    }
    onAddStaff(formData);
    alert('Staff added successfully!');
    navigate('/add-staff');
  };

  const handleBack = () => {
    navigate('/add-staff');
  };

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ width: 500, padding: 30, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Add New Staff</Title>
        <Form layout="vertical" size="large">
          <Form.Item label="Username" required>
            <Input name="username" placeholder="Enter username" value={formData.username} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Password" required>
            <Input.Password name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Role" required>
            <Select value={formData.role} onChange={handleRoleChange}>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button size="large" onClick={handleBack}>Back</Button>
            <Button type="primary" size="large" onClick={handleSave}>Save</Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default CreateStaffPage;