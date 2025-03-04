import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import LoginPage from './components/LoginPage';
import AddStaffPage from './components/AddStaffPage';
import CreateStaffPage from './components/CreateStaffPage';
import RequestPage from './components/RequestPage';
import AddRequestPage from './components/AddRequestPage';
import EditRequestPage from './components/EditRequestPage';
import RequestSummaryPage from './components/RequestSummaryPage';
import Dashboard from './components/Dashboard';
import DailySummaryReport from './components/DailySummaryReport';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [staffList, setStaffList] = useState([
    { id: 1, username: 'admin', password: '1234', role: 'Admin' },

  ]);
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const savedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    const savedUserRole = sessionStorage.getItem('userRole');
    const savedStaffList = localStorage.getItem('staffList');
    const savedRequestList = localStorage.getItem('requestList');

    if (savedIsLoggedIn === 'true' && savedUserRole) {
      setIsLoggedIn(true);
      setUserRole(savedUserRole);
    }

    if (savedStaffList) {
      setStaffList(JSON.parse(savedStaffList));
    }
    if (savedRequestList) {
      setRequestList(JSON.parse(savedRequestList));
    }
  }, []);

  const handleAddStaff = (newStaff) => {
    setStaffList((prevList) => {
      const updatedList = [...prevList, { id: prevList.length + 1, ...newStaff }];
      localStorage.setItem('staffList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleUpdateStaff = (updatedStaff) => {
    setStaffList((prevList) => {
      const updatedList = prevList.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff));
      localStorage.setItem('staffList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleDeleteStaff = (staffId) => {
    setStaffList((prevList) => {
      const updatedList = prevList.filter((staff) => staff.id !== staffId);
      localStorage.setItem('staffList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleAddRequest = (newRequest) => {
    setRequestList((prevList) => {
      const updatedList = [...prevList, { id: prevList.length + 1, ...newRequest }];
      localStorage.setItem('requestList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleEditRequest = (updatedRequest) => {
    setRequestList((prevList) => {
      const updatedList = prevList.map((request) => (request.id === updatedRequest.id ? updatedRequest : request));
      localStorage.setItem('requestList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleDeleteRequest = (id) => {
    setRequestList((prevList) => {
      const updatedList = prevList.filter((request) => request.id !== id);
      localStorage.setItem('requestList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
  };

  return (
    <Router>
      {!isLoggedIn ? (
        // ถ้ายังไม่ล็อกอินให้แสดงหน้า LoginPage โดยไม่มี margin-left
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} staffList={staffList} />} />
            <Route path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} staffList={staffList} />} />
          </Routes>
        </div>
      ) : (
        // ถ้าล็อกอินแล้ว ให้แสดงเมนูและเนื้อหาปกติ
        <>
          <MenuBar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
          <div style={{ marginLeft: '500px', }}>
            <Routes>
              <Route path="/" element={<Dashboard requestList={requestList} />} />
              <Route path="/dashboard" element={<Dashboard requestList={requestList} />} />
              <Route path="/daily-summary" element={<DailySummaryReport requestList={requestList} reportDate={new Date().toLocaleDateString()} />} />

              {/* Protected routes for Admin */}
              {userRole === 'Admin' && (
                <>
                  <Route path="/add-staff" element={<AddStaffPage staffList={staffList} onUpdateStaff={handleUpdateStaff} onDeleteStaff={handleDeleteStaff} />} />
                  <Route path="/create-staff" element={<CreateStaffPage onAddStaff={handleAddStaff} />} />
                </>
              )}

              {/* Request routes */}
              <Route path="/requests" element={<RequestPage requestList={requestList} onAddRequest={handleAddRequest} onEditRequest={handleEditRequest} onDeleteRequest={handleDeleteRequest} />} />
              <Route path="/add-request" element={<AddRequestPage onAddRequest={handleAddRequest} />} />
              <Route path="/edit-request/:id" element={<EditRequestPage requestList={requestList} onEditRequest={handleEditRequest} />} />
              <Route path="/request-summary" element={<RequestSummaryPage requestList={requestList} />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
};

export default App;
