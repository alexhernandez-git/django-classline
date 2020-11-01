import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import styled from "@emotion/styled";

import { MdCancel } from "react-icons/md";
import { IconContext } from "react-icons";
import { AdminForm } from "src/components/ui/AdminForm";
import { FieldArray, Field } from "formik";
const CourseBenefitsForm = ({ values }) => {
  return (
    <div className="bg-white border p-3 rounded my-2  mb-4">
      <Row className="mb-4">
        <Col className="d-md-flex justify-content-between">
          <span className="d-none d-md-block">Beneficios del curso</span>
        </Col>
      </Row>
      <Row>
        <Col
          lg={{ span: 4 }}
          className="text-center d-lg-flex justify-content-end align-items-center mb-2"
        >
          <span className="font-weight-normal m-0">Beneficios</span>
        </Col>

        <Col lg={{ offset: 1, span: 6 }}>
          <AdminForm>
            <FieldArray name="benefits">
              {(helpers) => (
                <>
                  {values.benefits.length == 0 &&
                    helpers.push({
                      name: "",
                    })}
                  {values.benefits.map((value, index) => (
                    <div className="mb-3 position-relative" key={index}>
                      <Field
                        name={`benefits[${index}].name`}
                        placeholder="Añadir beneficio"
                      />
                      <div
                        className="position-absolute"
                        style={{
                          top: "5px",
                          right: "5px",
                        }}
                      >
                        <span>
                          <IconContext.Provider
                            value={{
                              className: "global-class-name cursor-pointer",
                              size: "25px",
                            }}
                          >
                            <MdCancel onClick={() => helpers.remove(index)} />
                          </IconContext.Provider>
                        </span>
                      </div>
                    </div>
                  ))}
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      helpers.push({
                        name: "",
                      })
                    }
                  >
                    Añade otro beneficio...
                  </span>
                </>
              )}
            </FieldArray>
          </AdminForm>
        </Col>
      </Row>
    </div>
  );
};

export default CourseBenefitsForm;
