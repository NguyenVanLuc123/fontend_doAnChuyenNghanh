import React from 'react';

const Dashboard = () => {
  return (
    <>
      <div className="pagetitle">
      </div>

      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {/* Managers Card */}
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Quản lý <span>| Tổng số</span></h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="ps-3">
                        <h6>0</h6>
                        <span className="text-muted small pt-2 ps-1">Managers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Departments Card */}
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">Phòng ban <span>| Tổng số</span></h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-building"></i>
                      </div>
                      <div className="ps-3">
                        <h6>0</h6>
                        <span className="text-muted small pt-2 ps-1">Departments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employees Card */}
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card customers-card">
                  <div className="card-body">
                    <h5 className="card-title">Nhân viên <span>| Tổng số</span></h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-person"></i>
                      </div>
                      <div className="ps-3">
                        <h6>0</h6>
                        <span className="text-muted small pt-2 ps-1">Employees</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
