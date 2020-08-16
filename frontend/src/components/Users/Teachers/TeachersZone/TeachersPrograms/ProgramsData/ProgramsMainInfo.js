import React, { useRef, useState, useEffect, useContext } from "react";
import { AppContext } from "src/context/AppContext";
import "cropperjs/dist/cropper.css";
import { Form, Row, Col } from "react-bootstrap";
import SelectLang from "./SelectLang";
import { Field } from "formik";
import Lenguages from "static/data/languages";

const TeachersProfilePresentation = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };
  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };

  return (
    <div className="bg-white shadow p-3 rounded my-2 mt-4">
      <span className="d-none d-md-block">Información principal</span>
      <Row>
        <Col
          lg={{ span: 4 }}
          className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
        >
          <span className="h5 m-0 font-weight-normal">Titulo</span>
        </Col>

        <Col lg={{ offset: 1, span: 6 }}>
          <Form.Group controlId="formGroupName">
            <Field
              name="title"
              type="text"
              placeholder="Titulo"
              className="form-control"
            />
            {props.error.title &&
              props.error.title.map((error) => (
                <small className="d-block text-red">{error}</small>
              ))}
          </Form.Group>
        </Col>

        <Col
          lg={{ span: 4 }}
          className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
        >
          <span className="h5 m-0 font-weight-normal">Descripción</span>
        </Col>

        <Col lg={{ offset: 1, span: 6 }}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Field
              component="textarea"
              name="description"
              rows="3"
              className="form-control"
              placeholder="Pon una descripción"
            />
            {props.error.despription &&
              props.error.despription.map((error) => (
                <small className="d-block text-red">{error}</small>
              ))}
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default TeachersProfilePresentation;
