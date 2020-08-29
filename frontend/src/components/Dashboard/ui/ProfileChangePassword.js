import React, { useRef, useState, useEffect, useContext } from "react";

import { Form, Row, Col } from "react-bootstrap";

import Select from "react-select";
import { AdminForm } from "src/components/ui/AdminForm";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form as FormFormik, Field } from "formik";
import { changePassword } from "src/redux/actions/authCommercials";
import { ButtonCustom } from "../../ui/ButtonCustom";
const ProfileChangePassword = (props) => {
  const dispatch = useDispatch();
  const authCommercialsReducer = useSelector(
    (state) => state.authCommercialsReducer
  );
  return (
    <div className="bg-white border p-3 rounded my-2 mb-4">
      <span className="d-none d-md-block">Actualizar contraseña</span>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email:
            authCommercialsReducer.user && authCommercialsReducer.user.username,
          password: "",
          new_password: "",
          repeat_password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          const dispatchChangePassword = (values) =>
            dispatch(changePassword(values));
          dispatchChangePassword(values);
          resetForm({
            values: {
              email:
                authCommercialsReducer.user &&
                authCommercialsReducer.user.username,
              password: "",
              new_password: "",
              repeat_password: "",
            },
          });
        }}
      >
        {(props) => {
          return (
            <>
              <AdminForm>
                <FormFormik>
                  {" "}
                  <Row className="mb-4">
                    <Col
                      lg={{ span: 4 }}
                      className="text-center d-lg-flex justify-content-end align-items-center"
                    >
                      <span className="m-0 font-weight-normal">
                        Contraseña actual
                      </span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Contraseña actual"
                        // value={values.title}
                        // onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col
                      lg={{ span: 4 }}
                      className="text-center d-lg-flex justify-content-end align-items-center"
                    >
                      <span className="m-0 font-weight-normal">
                        Nueva contraseña
                      </span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                      <Field
                        type="password"
                        placeholder="Nueva contraseña"
                        name="new_password"
                        // value={values.subtitle}
                        // onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col
                      lg={{ span: 4 }}
                      className="text-center d-lg-flex justify-content-end align-items-center"
                    >
                      <span className="m-0 font-weight-normal">
                        Repetir nueva contraseña
                      </span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                      <Field
                        type="password"
                        placeholder="Repetir nueva contraseña"
                        name="repeat_password"
                        // value={values.subtitle}
                        // onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center my-2">
                    <ButtonCustom type="submit">
                      Cambiar contraseña
                    </ButtonCustom>
                  </div>
                </FormFormik>
              </AdminForm>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileChangePassword;
