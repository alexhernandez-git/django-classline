import React, { useRef, useState, useEffect, useContext } from "react";

import { Form, Row, Col } from "react-bootstrap";

import Select from "react-select";
import Lenguages from "static/data/languages";
import { AdminForm } from "src/components/ui/AdminForm";

import { Field } from "formik";
import SelectLang from "./SelectLang";
import { useSelector } from "react-redux";
import MyCKEditor from "../ui/MyCKEditor";
const MainCourseInfo = ({ values, setFieldValue }) => {
  const courseReducer = useSelector((state) => state.courseReducer);
  const handleEdit = (value) => {
    setFieldValue("description", value);
  };
  return (
    <div className="bg-white border p-3 rounded my-2 mb-4">
      <span className="d-none d-md-block">Información principal del curso</span>
      <AdminForm>
        <Row className="mb-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Titulo</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field
              type="text"
              name="title"
              placeholder="Titulo del curso"
              // value={values.title}
              // onChange={handleChange}
            />
            {courseReducer.save_error &&
              courseReducer.save_error.data.title &&
              courseReducer.save_error.data.title.map((error) => (
                <small className="d-block text-red">{error}</small>
              ))}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Subtitulo</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field
              type="text"
              name="subtitle"
              placeholder="Subtitulo del curso"
              // value={values.subtitle}
              // onChange={handleChange}
            />
            {courseReducer.save_error &&
              courseReducer.save_error.data.subtitle &&
              courseReducer.save_error.data.subtitle.map((error) => (
                <small className="d-block text-red">{error}</small>
              ))}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Descripción</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }} style={{ color: "initial" }}>
            {/* <Field
              component="textarea"
              name="description"
              cols="30"
              rows="10"
              // value={values.description}
              // onChange={handleChange}
              placeholder="Descripción"
            /> */}
            {console.log("description", values.description)}
            <MyCKEditor
              value={values.description}
              handleEdit={handleEdit}
              placeholder="Descripción del curso"
            />
            {courseReducer.save_error &&
              courseReducer.save_error.data.description &&
              courseReducer.save_error.data.description.map((error) => (
                <small className="d-block text-red">{error}</small>
              ))}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Idioma</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Field name="lang" options={Lenguages} component={SelectLang} />
            </Form.Group>
          </Col>
        </Row>
      </AdminForm>
    </div>
  );
};

export default MainCourseInfo;
