import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { IoLogInOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { MdDashboard, MdLocalHospital, MdEventNote } from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './MenuBar.css'; // Assuming your CSS is saved in MenuBar.css

const { Header, Sider, Content, Footer } = Layout;

const MenuBar = ({ isLoggedIn, userRole, onLogout }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const username = localStorage.getItem('username') || 'ชื่อผู้ใช้งาน';

  useEffect(() => {
    if (location.pathname.includes('/dashboard')) {
      setActiveLink('dashboard');
    } else if (location.pathname.includes('/requests')) {
      setActiveLink('requests');
    } else if (location.pathname.includes('/request-summary')) {
      setActiveLink('daily-records');
    } else {
      setActiveLink('');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setOpenSidebar(false);
    onLogout();
    navigate('/login');
  };

  return (
    <Layout>
      {/* Header Section */}
      <Header
        style={{
          backgroundColor: '#2E7D32',
          padding: '0 1px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        {/* Show the sidebar toggle only if the user is not on the login page */}
        {location.pathname !== '/login' && (
          <Button
            type="text"
            style={{
              color: '#fff',
              fontSize: '24px',
              backgroundColor: 'transparent',
              border: 'none',
            }}
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            {openSidebar ? (
              <MenuFoldOutlined style={{ fontSize: '30px', color: '#fff' }} />
            ) : (
              <MenuUnfoldOutlined style={{ fontSize: '30px', color: '#fff' }} />
            )}
          </Button>
        )}

        {/* Title */}
        <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#fff', textAlign: 'left', flex: 1 }}>
          ระบบขอรับบริการจัดเก็บสิ่งปฏิกูล
        </div>

        {/* Login / Logout Button */}
        <div>
          {!isLoggedIn ? (
            <Link to="/login">
              <Button
                type="primary"
                icon={<IoLogInOutline />}
                style={{
                  fontSize: '1rem',
                  backgroundColor: '#27AE60',
                  borderColor: '#27AE60',
                  borderRadius: '20px',
                  padding: '6px 12px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </Link>
          ) : (
            <Button
              type="primary"
              onClick={handleLogout}
              style={{
                fontSize: '20px',
                backgroundColor: '#E74C3C',
                borderColor: '#E74C3C',
                borderRadius: '20px',
                padding: '20px 40px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
              }}
            >
              ออกจากระบบ
            </Button>
          )}
        </div>
      </Header>

      {/* Main Layout */}
      <Layout style={{ marginTop: '64px' }}>
        {isLoggedIn && (
          <Sider
            width={400}
            theme="dark"
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              height: '100vh',
              zIndex: 500,
              transition: 'transform 0.3s ease, width 0.3s ease',
              transform: openSidebar ? 'translateX(0)' : 'translateX(-100%)',
              background: '#001529',
              boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
              padding: '20px 10px',
              overflowY: 'auto',
            }}
          >
            {/* User Profile Section */}
            <div className="user-profile">
              <Avatar size={120} icon={<FaUserCircle />} />
              <div style={{ marginLeft: '10px' }}>
                <h6>{username}</h6>
                <p>ตำแหน่ง: {userRole}</p>
              </div>
            </div>

            {/* Sidebar Menu */}
            <Menu theme="dark" mode="inline" selectedKeys={[activeLink]}>
              <Menu.Item
                key="dashboard"
                icon={<MdDashboard />}
                onClick={() => navigate('/dashboard')}
              >
                แดชบอร์ด
              </Menu.Item>
              <Menu.Item
                key="requests"
                icon={<MdLocalHospital />}
                onClick={() => navigate('/requests')}
              >
                
                ผู้ขอรับบริการ
              </Menu.Item>
              <Menu.Item
                key="daily-records"
                icon={<MdEventNote />}
                onClick={() => navigate('/request-summary')}
              >
                สรุปบันทึกรายวัน
              </Menu.Item>

              <Menu.Divider />

              {userRole === 'Admin' && (
                <Menu.SubMenu key="admin" title="ผู้ดูแลระบบ" icon={<FaUserCircle />}>
                  <Menu.Item key="admin-staff" onClick={() => navigate('/add-staff')}>
                    รายชื่อเจ้าหน้าที่
                  </Menu.Item>
                </Menu.SubMenu>
              )}
            </Menu>
          </Sider>
        )}
      </Layout>
    </Layout>
  );
};

export default MenuBar;
