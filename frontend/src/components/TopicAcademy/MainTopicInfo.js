import React, { useRef, useState, useEffect, useContext } from "react";

import { Form, Row, Col } from "react-bootstrap";

import Select from "react-select";
import Lenguages from "static/data/languages";
import { AdminForm } from "src/components/ui/AdminForm";

import { Field } from "formik";
import SelectLang from "./SelectLang";
import { useSelector } from "react-redux";

const MainTopicInfo = (props) => {
  const topicReducer = useSelector((state) => state.topicReducer);
  return (
    <div className="bg-white border p-3 rounded my-2 mb-4">
      <span className="d-none d-md-block">Información principal del tema</span>
      <AdminForm>
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
              name="name"
              placeholder="Nombre"
              // value={values.title}
              // onChange={handleChange}
            />
            {topicReducer.save_error &&
              topicReducer.save_error.data.name &&
              topicReducer.save_error.data.name.map((error) => (
                <small className="d-block text-red">{error}</small>
              ))}
          </Col>
        </Row>

      </AdminForm>
    </div>
  );
};

export default MainTopicInfo;
