import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';

const EditRequestPage = ({ requestList, onEditRequest }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    prefix: '',
    name: '',
    lastName: '', // เพิ่มฟิลด์สำหรับนามสกุล
    phone: '',
    company: '',
    houseNumber: '',
    village: '',
    alley: '',
    road: '',
    province: 'นนทบุรี',
    district: '',
    subdistrict: '',
    nearbyLocation: '',
    postalArea: '',
    residenceType: '', 
    localAuthority: '', // เพิ่มฟิลด์ประเภทที่อยู่
    time: '',
    reportType: '',
    requestTime: '',
    requestDate: '',
    serviceDate: '',
    timeSlot: '',
    status: ''
  });

  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [localAuthorities, setLocalAuthorities] = useState([]);

  useEffect(() => {
    const requestToEdit = requestList.find((request) => request.id === parseInt(id));
    if (requestToEdit) {
      setFormData({ ...requestToEdit });
    }
  }, [id, requestList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.phone.trim()) {
      onEditRequest(formData);
      navigate('/requests');
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  useEffect(() => {
      if (formData.province === 'นนทบุรี') {
        setDistricts([
          'อำเภอเมืองนนทบุรี',
          'ปากเกร็ด',
          'ไทรน้อย',
          'บางบัวทอง',
          'บางใหญ่',
          'บางกรวย',
        ]);
      }
    }, [formData.province]);
  
    useEffect(() => {
      switch (formData.district) {
          case 'บางบัวทอง':
          setSubdistricts([
            'ตำบลบางรักพัฒนา',
            'ตำบลลำโพ',
            'ตำบลละหาร',
            'ตำบลบางคูรัด',
            'ตำบลบางรักใหญ่',
            'ตำบลบางบัวทอง',
          ]);
          setLocalAuthorities([
            'อบต.บางรักพัฒนา',
            'เทศบาลเมืองพิมลราช',
            'อบต.ลำโพ',
            'อบต.ละหาร',
            'อบต.บางคูรัด',
            'อบต.บางรักใหญ่',
            'อบต.บางบัวทอง',
            'เทศบาลเมืองบางบัวทอง',
          ]);
          break;
        case 'ปากเกร็ด':
          setSubdistricts([
            'ตำบลบางกระสอ',
            'ตำบลบางศรีเมือง',
            'ตำบลบ้านใหม่',
            'ตำบลบางพูด',
            'ตำบลคลองขวาง',
          ]);
          setLocalAuthorities([
            'เทศบาลนครปากเกร็ด',
            'เทศบาลตำบลบางพลับ',
            'อบต.คลองข่อย',
            'อบต.อ้อมเกร็ด',
            'อบต.เกาะเกร็ด',
            'อบต.ท่าอิฐ',
            'อบต.คลองพระอุดม',
            'อบต.บางตะไนย์',
          ]);
          break;
        case 'ไทรน้อย':
          setSubdistricts([
            'ตำบลทวีวัฒนา',
            'ตำบลคลองขวาง',
            'ตำบลขุนศรี',
            'ตำบลไทรใหญ่',
            'ตำบลหนองเพรางาย',
            'ตำบลราษฎร์นิยม',
            'ตำบลไทรน้อย',
          ]);
          setLocalAuthorities([
            'เทศบาลตำบลไทรน้อย',
            'อบต.ทวีวัฒนา',
            'อบต.คลองขวาง',
            'อบต.ขุนศรี',
            'อบต.ไทรใหญ่',
            'อบต.หนองเพรางาย',
            'อบต.ราษฎร์นิยม',
            'อบต.ไทรน้อย',
          ]);
          break;
        case 'บางใหญ่':
          setSubdistricts([
            'ตำบลบางรักพัฒนา',
            'ตำบลลำโพ',
            'ตำบลละหาร',
            'ตำบลบางคูรัด',
            'ตำบลบางรักใหญ่',
            'ตำบลบางบัวทอง',
          ]);
          setLocalAuthorities([
            'เทศบาลตำบลบางใหญ่',
            'อบต.บ้านใหม่',
            'อบต.บางใหญ่',
            'เทศบาลตำบลเสาธงหิน',
            'เทศบาลตำบลบางเลน',
            'อบต.บางคูรัด',
            'อบต.บางแม่นาง',
            'เทศบาลตำบลบ้านบางม่วง',
            'เทศบาลตำบลบางม่วง',
          ]);
          break;
        case 'บางกรวย':
          setSubdistricts([
            'ตำบลศาลากลาง',
            'ตำบลมหาสวัสดิ์',
            'ตำบลปลายบาง',
            'ตำบลบางขุนกอง',
            'ตำบลบางขนุน',
          ]);
          setLocalAuthorities([
            'เทศบาลตำบลศาลากลาง',
            'อบต.มหาสวัสดิ์',
            'เทศบาลตำบลปลายบาง',
            'อบต.บางขุนกอง',
            'อบต.บางขนุน',
            'เทศบาลตำบลบางสีทอง',
            'เทศบาลเมืองบางกรวย',
          ]);
          break;
        case 'อำเภอเมืองนนทบุรี':
          setSubdistricts([
            'ตำบลบางรักน้อย',
            'ตำบลไทรม้า',
            'ตำบลบางกร่าง',
            'ตำบลบางไผ่',
            'ตำบลสวนใหญ่',
            'ตำบลรัตนาธิเบศร์',
          ]);
          setLocalAuthorities([
            'เทศบาลนครนนทบุรี',
            'อบต.บางรักน้อย',
            'เทศบาลตำบลไทรม้า',
            'อบต.บางกร่าง',
            'เทศบาลเมืองบางศรีเมือง',
            'อบต.บางไผ่',
            'อบจ.นนทบุรี',
          ]);
          break;
        default:
          setSubdistricts([]);
          setLocalAuthorities([]);
      }
    }, [formData.district]);

  
  return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">เพิ่มผู้ขอรับบริการ</h2>
        <Card className="shadow-lg p-4 rounded" style={{ backgroundColor: '#f9f9f9' }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="row">
                <div className="col-md-3 mb-3">
                  <Form.Group>
                    <Form.Label>คำนำหน้า</Form.Label>
                    <Form.Select name="prefix" value={formData.prefix} onChange={handleChange} required>
                      <option value="" disabled hidden>กรุณาเลือกคำนำหน้า</option>
                      <option value="นาย">นาย</option>
                      <option value="นางสาว">นางสาว</option>
                      <option value="นาง">นาง</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Group>
                    <Form.Label>ชื่อ</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </Form.Group>
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Group>
                    <Form.Label>นามสกุล</Form.Label>
                    <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </Form.Group>
                </div>
              </div>
    
              {/* Contact Information */}
              <div className="row">
              <div className="col-md-2 mb-3">
  <Form.Group>
    <Form.Label>หมายเลขโทรศัพท์</Form.Label>
    <Form.Control 
      type="text" 
      name="phone" 
      value={formData.phone} 
      onChange={handleChange} 
      required 
      pattern="^\d{3}-\d{3}-\d{4}$" 
      title="กรุณากรอกหมายเลขโทรศัพท์ในรูปแบบ 123-456-7890" 
    />
  </Form.Group>
</div>
                <div className="col-md-2 mb-3">
                  <Form.Group>
                    <Form.Label>บริษัท/ร้าน/หมู่บ้าน</Form.Label>
                    <Form.Control type="text" name="company" value={formData.company} onChange={handleChange} required />
                  </Form.Group>
                </div>
              <div className="col-md-2 mb-3">
  <Form.Group>
    <Form.Label>เลขที่บ้าน</Form.Label>
    <Form.Control 
      type="number" 
      name="houseNumber" 
      value={formData.houseNumber} 
      onChange={handleChange} 
      required 
      min="0" 
    />
  </Form.Group>
</div>
<div className="col-md-1 mb-3">
  <Form.Group>
    <Form.Label>หมู่ที่</Form.Label>
    <Form.Control 
      type="number" 
      name="village" 
      value={formData.village} 
      onChange={handleChange} 
      required 
      min="0" 
    />
  </Form.Group>
</div>
                <div className="col-md-2 mb-3">
                  <Form.Group>
                    <Form.Label>ตรอก/ซอย</Form.Label>
                    <Form.Control type="text" name="alley" value={formData.alley} onChange={handleChange} required />
                  </Form.Group>
                </div>
                <div className="col-md-2 mb-3">
                  <Form.Group>
                    <Form.Label>ถนน</Form.Label>
                    <Form.Control type="text" name="road" value={formData.road} onChange={handleChange} required />
                  </Form.Group>
                </div>
              </div>
    
              {/* Address Information */}
              <div className="row">
                <div className="col-md-2 mb-3">
                  <Form.Group>
                    <Form.Label>จังหวัด</Form.Label>
                    <Form.Select name="province" value={formData.province} onChange={handleChange} required>
                      <option value="นนทบุรี">นนทบุรี</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-2 mb-3">
                  <Form.Group>
                    <Form.Label>อำเภอ</Form.Label>
                    <Form.Control as="select" name="district" value={formData.district} onChange={handleChange} required>
                      <option value="">เลือกอำเภอ</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="col-md-2 mb-3">
                  <Form.Group>
                    <Form.Label>ตำบล</Form.Label>
                    <Form.Select name="subdistrict" value={formData.subdistrict} onChange={handleChange} required>
                      <option value="" disabled hidden>กรุณาเลือกตำบล</option>
                      {subdistricts.map((subdistrict, index) => (
                        <option key={index} value={subdistrict}>{subdistrict}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-3 mb-3">
                  <Form.Group>
                    <Form.Label>เขตของอปท.</Form.Label>
                    <Form.Select name="localAuthority" value={formData.localAuthority} onChange={handleChange} required>
                      <option value="" disabled hidden>กรุณาเลือกเขตของอปท.</option>
                      {localAuthorities.map((authority, index) => (
                        <option key={index} value={authority}>{authority}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-2 mb-3">
                  <Form.Group>
                    <Form.Label>สถานที่ใกล้เคียง</Form.Label>
                    <Form.Control type="text" name="nearbyLocation" value={formData.nearbyLocation} onChange={handleChange} required />
                  </Form.Group>
                </div>
              </div>
    
              {/* Service Information */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Group>
                    <Form.Label>ประเภทที่อยู่</Form.Label>
                    <Form.Select name="residenceType" value={formData.residenceType} onChange={handleChange} required>
                      <option value="" disabled hidden>กรุณาเลือกประเภทที่อยู่</option>
                      <option value="บ้านพักอาศัยหนึ่งชั้น">บ้านพักอาศัยหนึ่งชั้น</option>
                      <option value="บ้านพักอาศัยสองชั้น">บ้านพักอาศัยสองชั้น</option>
                      <option value="โรงงาน">โรงงาน</option>
                      <option value="อาคารสำนักงาน">อาคารสำนักงาน</option>
                      <option value="ตึกแถว อาคาพาณิชย์">ตึกแถว อาคาพาณิชย์</option>
                      <option value="อาคารอยู่อาศัยรวม">อาคารอยู่อาศัยรวม</option>
                      <option value="ร้านอาหาร ภัตตรคาร">ร้านอาหาร ภัตตรคาร</option>
                      <option value="หน่วยงานก่อสร้าง">หน่วยงานก่อสร้าง</option>
                      <option value="ศาสนสถาน โรงเรียน">ศาสนสถาน โรงเรียน</option>
                      <option value="อื่นๆ">อื่นๆ</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Group>
                    <Form.Label>ประเภทที่แจ้ง</Form.Label>
                    <Form.Select name="reportType" value={formData.reportType} onChange={handleChange} required>
                      <option value="" disabled hidden>กรุณาเลือกประเภทที่แจ้ง</option>
                      <option value="แจ้งด้วยตนเอง">แจ้งด้วยตนเอง</option>
                      <option value="แจ้งด้วยโทรศัพท์">แจ้งด้วยโทรศัพท์</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
    
              {/* Time and Date Information */}
              <div className="row">
                <div className="col-md-3 mb-3">
                  <Form.Group>
                    <Form.Label>เวลาที่แจ้งขอรับบริการ</Form.Label>
                    <Form.Control type="text" name="time" value={formData.time} onChange={handleChange} required />
                  </Form.Group>
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Group>
                    <Form.Label>วันที่แจ้งขอรับบริการ</Form.Label>
                    <Form.Control type="date" name="requestDate" value={formData.requestDate} onChange={handleChange} required />
                  </Form.Group>
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Group>
                    <Form.Label>วันที่ต้องการรับบริการ</Form.Label>
                    <Form.Control type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} required />
                  </Form.Group>
                </div>
              </div>
    
              {/* Time Slot and Status */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Form.Group>
                    <Form.Label>ช่วงเวลา</Form.Label>
                    <Form.Select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
                      <option value="" disabled hidden>กรุณาเลือกช่วงเวลา</option>
                      <option value="เช้า">เช้า</option>
                      <option value="บ่าย">บ่าย</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Group>
                    <Form.Label>สถานะ</Form.Label>
                    <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                      <option value="" disabled hidden>กรุณาเลือกสถานะ</option>
                      <option value="สำเร็จ">สำเร็จ</option>
                      <option value="ไม่สำเร็จ">ไม่สำเร็จ</option>
                      <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
    
              {/* Action Buttons */}
              <div className="d-flex justify-content-end">
                <Button type="submit" variant="success" className="me-2 custom-btn">บันทึก</Button>
                <Button type="button" variant="secondary" onClick={() => navigate('/requests')} className="custom-btn">ยกเลิก</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
    };
export default EditRequestPage;
