import React, { useState, useEffect } from 'react';
import { getEmployees, getShifts } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalShifts: 0,
    activeEmployees: 0, 
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [employeesRes, shiftsRes] = await Promise.all([
        getEmployees(),
        getShifts()
      ]);

      const employees = employeesRes.data.data;
      const shifts = shiftsRes.data.data;

      setStats({
        totalEmployees: employees.length,
        totalShifts: shifts.length,
        activeEmployees: employees.filter(emp => emp.isActive).length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/manager">Home</a></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
      </div>

      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {/* Employees Card */}
              <div className="col-xxl-4 col-md-4">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Nhân viên</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{stats.totalEmployees}</h6>
                        <span className="text-success small pt-1 fw-bold">
                          {stats.activeEmployees}
                        </span>{" "}
                        <span className="text-muted small pt-2 ps-1">đang hoạt động</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shifts Card */}
              <div className="col-xxl-4 col-md-4">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">Ca làm việc</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-calendar3"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{stats.totalShifts}</h6>
                        <span className="text-muted small pt-2 ps-1">ca làm việc</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Card */}
              <div className="col-xxl-4 col-md-4">
                <div className="card info-card customers-card">
                  <div className="card-body">
                    <h5 className="card-title">Phòng ban của bạn</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-building"></i>
                      </div>
                      <div className="ps-3">
                        <h6>Phòng {user?.departmentName || "N/A"}</h6>
                        <span className="text-muted small pt-2 ps-1">Quản lý</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
