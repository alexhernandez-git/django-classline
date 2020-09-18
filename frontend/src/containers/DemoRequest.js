import React, { useContext, useState, useEffect } from "react";
const DemoRequest = (props) => {
  return (
    <div className="container mt-5 text-dark">
      <div className="d-flex justify-content-start">
        <span className="h2 text-grey">Request a Demo</span>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 d-flex align-items-center">
          <div className="w-100 ">
            <img
              className="w-100 rounded shadow"
              src="static/assets/img/Screenshot_2020-09-18 Classline - Yoga Studio.png"
              alt=""
            />
          </div>
        </div>
        <div className="m-3 d-block d-md-none"></div>
        <div className="col-md-6">
          <div className="bg-gradient-green rounded shadow p-3">
            <span className="text-white h4">Request a Demo</span>
            <div className="row mt-3">
              <div className="col">
                <div class="form-group">
                  <label for="exampleInputEmail1" className="text-white">
                    <small>BUSINESS EMAIL ADDRESS*</small>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    ariadescribedby="emailHelp"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1" className="text-white">
                    <small>FIRST NAME*</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    ariadescribedby="textHelp"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1" className="text-white">
                    <small>LAST NAME*</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    ariadescribedby="textHelp"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div class="form-group">
                  <label for="exampleInputEmail1" className="text-white">
                    <small>COMPANY NAME*</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    ariadescribedby="emailHelp"
                    placeholder="Company name"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div class="form-group">
                  <label for="exampleInputEmail1" className="text-white">
                    <small>PHONE NUMBER</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    ariadescribedby="emailHelp"
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>
            <button className="btn-outline-green py-2 px-3 h5 mt-4 mb-0">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoRequest;
