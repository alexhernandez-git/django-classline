import React, { useContext, useState, useEffect } from "react";
import { Formik, Form as FormFormik, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first_name: Yup.string()
    .min(2, "First name is too short")
    .max(100, "First name is too long")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Last name is too short")
    .max(100, "Last name is too long")
    .required("Required"),
  company_name: Yup.string()
    .min(2, "Company name is too short")
    .max(100, "Company name is too long")
    .required("Required"),
  phone_number: Yup.string()
    .min(2, "Phone number is too short")
    .max(100, "Phone number is too long"),
  message: Yup.string()
    .min(2, "Message is too short")
    .max(500, "Message is too long"),
});

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
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: "",
              first_name: "",
              last_name: "",
              company_name: "",
              phone_number: "",
              message: "",
            }}
            validationSchema={FormSchema}
            onSubmit={(values) => {
              Axios.post("/api/users/demo_request/", values)
                .then((res) => {
                  Swal.fire({
                    title: "Email enviado!",
                    text: "En breve recibiras noticias",
                    icon: "success",
                    confirmButtonText: "Ok",
                  });
                })
                .catch((err) => {
                  Swal.fire({
                    title: "Lo sentimos algo ha fallado!",
                    text: "Vuelve a intentarlo en un rato",
                    icon: "error",
                    confirmButtonText: "Ok",
                  });
                });
            }}
          >
            {({ errors, touched }) => {
              return (
                <>
                  <FormFormik>
                    <div className="bg-gradient-green rounded shadow p-3">
                      <span className="text-white h4">Request a Demo</span>
                      <div className="row mt-3">
                        <div className="col">
                          <div class="form-group">
                            <label
                              for="exampleInputEmail1"
                              className="text-white"
                            >
                              <small>BUSINESS EMAIL ADDRESS*</small>
                            </label>
                            <Field
                              name="email"
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              ariadescribedby="emailHelp"
                              placeholder="Email"
                            />
                            {errors.email && touched.email ? (
                              <small className="d-block text-red">
                                {errors.email}
                              </small>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div class="form-group">
                            <label
                              for="exampleInputEmail1"
                              className="text-white"
                            >
                              <small>FIRST NAME*</small>
                            </label>
                            <Field
                              name="first_name"
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              ariadescribedby="textHelp"
                              placeholder="First name"
                            />
                            {errors.first_name && touched.first_name ? (
                              <small className="d-block text-red">
                                {errors.first_name}
                              </small>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div class="form-group">
                            <label
                              for="exampleInputEmail1"
                              className="text-white"
                            >
                              <small>LAST NAME*</small>
                            </label>
                            <Field
                              name="last_name"
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              ariadescribedby="textHelp"
                              placeholder="Last name"
                            />
                            {errors.last_name && touched.last_name ? (
                              <small className="d-block text-red">
                                {errors.last_name}
                              </small>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div class="form-group">
                            <label
                              for="exampleInputEmail1"
                              className="text-white"
                            >
                              <small>COMPANY NAME*</small>
                            </label>
                            <Field
                              name="company_name"
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              ariadescribedby="emailHelp"
                              placeholder="Company name"
                            />
                            {errors.company_name && touched.company_name ? (
                              <small className="d-block text-red">
                                {errors.company_name}
                              </small>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div class="form-group">
                            <label
                              for="exampleInputEmail1"
                              className="text-white"
                            >
                              <small>PHONE NUMBER</small>
                            </label>
                            <Field
                              name="phone_number"
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              ariadescribedby="emailHelp"
                              placeholder="Phone number"
                            />
                            {errors.phone_number && touched.phone_number ? (
                              <small className="d-block text-red">
                                {errors.phone_number}
                              </small>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div class="form-group">
                            <label
                              for="exampleInputEmail1"
                              className="text-white"
                            >
                              <small>MESSAGE</small>
                            </label>
                            <Field
                              component="textarea"
                              name="message"
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              ariadescribedby="emailHelp"
                              placeholder="Message"
                            />
                            {errors.message && touched.message ? (
                              <small className="d-block text-red">
                                {errors.message}
                              </small>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn-outline-green py-2 px-3 h5 mt-4 mb-0 bg-white shadow"
                      >
                        Submit
                      </button>
                    </div>
                  </FormFormik>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className="m-3"></div>
    </div>
  );
};

export default DemoRequest;
