import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({ setIsLoggedIn, onLogin, staffList }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = staffList.find(
      (staff) => staff.username === username && staff.password === password
    );

    if (user) {
      setIsLoggedIn(true); // Now this will be called correctly

      onLogin(user.role);

      // Save login status to localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', user.role);

      // Navigate to the dashboard
      navigate('/dashboard');
    } else {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
        
      <h2 className="dashboard-title">ระบบขอรับบริการจัดเก็บสิ่งปฏิกูล</h2>
        {/* Icon รูปคน (Avatar) ด้านบน */}
        <div className="text-center mb-4">
          <Avatar
            size={120} // ขนาดของ Avatar
            style={{
              backgroundColor: '#27ae60',
              fontSize: '3rem',
              color: 'white',
              border: '4px solid #fff',
            }}
          >
            <span role="img" aria-label="user-icon">
              👤
            </span>
          </Avatar>
        </div>

        <div className="card-body">
          <h3 className="card-title text-center mb-4" style={{ color: '#2C3E50', fontWeight: '600' }}>เข้าสู่ระบบ</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="form-label">ชื่อผู้ใช้</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="username"
                placeholder="กรอกชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ borderRadius: '10px', fontSize: '1.1rem', padding: '10px' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">รหัสผ่าน</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: '10px', fontSize: '1.1rem', padding: '10px' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 py-3"
              style={{
                backgroundColor: '#27ae60',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.2rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
              }}
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
