import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Quản lý chấm công</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">Admin</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Admin</h6>
                  <span>{isAdmin ? 'Administrator' : 'Manager'}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Đăng xuất</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          {/* Dashboard */}
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === (isAdmin ? '/admin' : '/manager/dashboard') ? '' : 'collapsed'}`}
              to={isAdmin ? '/admin' : '/manager/dashboard'}
            >
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Admin Menu Items */}
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/admin/managers' ? '' : 'collapsed'}`}
                  to="/admin/managers"
                >
                  <i className="bi bi-person"></i>
                  <span>Quản lý Manager</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/admin/departments' ? '' : 'collapsed'}`}
                  to="/admin/departments"
                >
                  <i className="bi bi-building"></i>
                  <span>Quản lý phòng ban</span>
                </Link>
              </li>
            </>
          )}

          {/* Manager Menu Items */}
          {isManager && (
            <>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/employees' ? '' : 'collapsed'}`}
                  to="/manager/employees"
                >
                  <i className="bi bi-people"></i>
                  <span>Quản lý nhân viên</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/shifts' ? '' : 'collapsed'}`}
                  to="/manager/shifts"
                >
                  <i className="bi bi-calendar3"></i>
                  <span>Quản lý ca làm việc</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/timekeeping' ? '' : 'collapsed'}`}
                  to="/manager/timekeeping"
                >
                  <i className="bi bi-clock"></i>
                  <span>Chấm công</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/attendance' ? '' : 'collapsed'}`}
                  to="/manager/attendance"
                >
                  <i className="bi bi-qr-code"></i>
                  <span>Điểm danh QR</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>

      <main id="main" className="main">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
