import React, { useRef } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { AdminForm } from "src/components/ui/AdminForm";
import { Form, Row, Col } from "react-bootstrap";
import { ButtonStyle } from "src/components/ui/ButtonCustom";
import { Field } from "formik";
import Cropper from "react-cropper";
import { useSelector } from "react-redux";

const CreateCostumerForm = () => {
  const cropper = useRef(null);
  const inputFileVideo = useRef(null);
  const inputFileImg = useRef(null);
  const costumersReducer = useSelector((state) => state.costumersReducer);

  return (
    <div className="p-4">
      <AdminForm>
        <Row className="my-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Email</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field type="text" placeholder="Email" name="email" />
            {costumersReducer.account_create_error &&
              costumersReducer.account_create_error.data.username &&
              costumersReducer.account_create_error.data.username.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Nombre</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field type="text" placeholder="Nombre" name="first_name" />
            {costumersReducer.account_create_error &&
              costumersReducer.account_create_error.data.first_name &&
              costumersReducer.account_create_error.data.first_name.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Apellidos</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field type="text" placeholder="Apellidos" name="last_name" />
            {costumersReducer.account_create_error &&
              costumersReducer.account_create_error.data.last_name &&
              costumersReducer.account_create_error.data.last_name.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>

        <Row className="my-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Contraseña</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field type="password" placeholder="Contraseña" name="password" />
            {costumersReducer.account_create_error &&
              costumersReducer.account_create_error.data.password &&
              costumersReducer.account_create_error.data.password.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>

        <Row className="my-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Repite la contraseña</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field
              type="password"
              placeholder="Repite la contraseña"
              name="password_confirmation"
            />
            {costumersReducer.account_create_error &&
              costumersReducer.account_create_error.data.non_field_errors &&
              costumersReducer.account_create_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>
      </AdminForm>
    </div>
  );
};

export default CreateCostumerForm;
