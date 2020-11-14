import React, { useRef, useState } from "react";
import { AdminForm } from "src/components/ui/AdminForm";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import {
  ButtonStyle,
  ButtonCustomSuccess,
} from "src/components/ui/ButtonCustom";
import { useSelector } from "react-redux";
import Cropper from "react-cropper";
import { Field } from "formik";
import MyCKEditor from "../ui/MyCKEditor";
const PostForm = (props) => {
  const { setFieldValue, values, isEdit, errors, touched } = props;

  const cropper = useRef(null);

  return (
    <div className="p-4">
      <AdminForm>
        <Row className="my-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Titulo</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field name="title" type="text" placeholder="Titulo" />
            {errors.title && touched.title ? (
              <small className="d-block text-red">{errors.title}</small>
            ) : null}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Mensaje</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <MyCKEditor
              value={values.message}
              handleEdit={(value) => {
                setFieldValue("message", value);
              }}
            />
            {errors.message && touched.message ? (
              <small className="d-block text-red">{errors.message}</small>
            ) : null}
          </Col>
        </Row>
      </AdminForm>
    </div>
  );
};

export default PostForm;
