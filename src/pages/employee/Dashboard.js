import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [workingTime, setWorkingTime] = useState(null);
  const [checkinTime, setCheckinTime] = useState(null);
  const scannerRef = useRef(null);

  const handleQRScan = async (decodedText) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Vui lòng đăng nhập lại');
        navigate('/login');
        return;
      }

      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/timekeeping/checkin/qr${decodedText.split('qr')[1]}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios(config);
      
      if (response.data.success) {
        message.success('Điểm danh thành công!');
        setCheckinTime(new Date());
        // Dừng quét QR sau khi thành công
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
        setIsScanning(false);
      } else {
        message.error(response.data.message || 'Điểm danh thất bại');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi điểm danh');
    }
  };

  const startQRScanner = () => {
    setIsScanning(true);
    // Đợi một chút để đảm bảo DOM đã được render
    setTimeout(() => {
      try {
        const scanner = new Html5QrcodeScanner('reader', {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        });
        scannerRef.current = scanner;
        scanner.render(handleQRScan, (error) => {
          if (error) {
            console.error(error);
          }
        });
      } catch (error) {
        console.error('Error starting scanner:', error);
        message.error('Không thể khởi động máy quét QR');
        setIsScanning(false);
      }
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (checkinTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = now - checkinTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setWorkingTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [checkinTime]);

  useEffect(() => {
    // Cleanup scanner when component unmounts
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trang Nhân Viên</h1>
      
      {workingTime && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Thời gian làm việc: {workingTime}</h2>
        </div>
      )}

      <Space>
        {!isScanning ? (
          <Button type="primary" onClick={startQRScanner}>
            Điểm Danh QR
          </Button>
        ) : (
          <>
            <div id="reader" style={{ width: '100%', maxWidth: '600px' }}></div>
            <Button onClick={stopScanner}>Hủy quét</Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default EmployeeDashboard;
