import React, { useRef, useState, useEffect, useContext } from "react";

import { Form, Row, Col } from "react-bootstrap";

import Select from "react-select";
import Lenguages from "static/data/languages";
import { AdminForm } from "src/components/ui/AdminForm";

import SelectLang from "src/components/AdminAcademy/SelectLang";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form as FormFormik, Field } from "formik";
import { updateUser } from "src/redux/actions/authCommercials";
import { ButtonCustom } from "../../ui/ButtonCustom";
const ProfileMainInfo = (props) => {
  const authCommercialsReducer = useSelector(
    (state) => state.authCommercialsReducer
  );
  const dispatch = useDispatch();
  return (
    <div className="bg-white border p-3 rounded my-2 mb-4">
      <span className="d-none d-md-block">Información principal</span>
      <Formik
        enableReinitialize={true}
        initialValues={{
          first_name:
            authCommercialsReducer.user &&
            authCommercialsReducer.user.first_name,
          last_name:
            authCommercialsReducer.user &&
            authCommercialsReducer.user.last_name,
        }}
        onSubmit={(values) => {
          const dispatchUpdateUser = (values) => dispatch(updateUser(values));
          dispatchUpdateUser(values);
        }}
      >
        {(props) => {
          return (
            <>
              <AdminForm>
                <FormFormik>
                  <Row className="mb-4">
                    <Col
                      lg={{ span: 4 }}
                      className="text-center d-lg-flex justify-content-end align-items-center"
                    >
                      <span className="m-0 font-weight-normal">
                        Nombre de usuario
                      </span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                      <span>{authCommercialsReducer.user.username}</span>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col
                      lg={{ span: 4 }}
                      className="text-center d-lg-flex justify-content-end align-items-center"
                    >
                      <span className="m-0 font-weight-normal">Nombre</span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                      <Field
                        type="text"
                        name="first_name"
                        placeholder="Nombre"
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
                      <span className="m-0 font-weight-normal">Apellidos</span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                      <Field
                        type="text"
                        placeholder="Apellidos"
                        name="last_name"
                        // value={values.subtitle}
                        // onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center my-2">
                    <ButtonCustom type="submit">Guardar</ButtonCustom>
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

export default ProfileMainInfo;
