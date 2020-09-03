import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { AdminForm } from "src/components/ui/AdminForm";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

import {
  ButtonStyle,
  ButtonCustomSuccess,
} from "src/components/ui/ButtonCustom";

import Cropper from "react-cropper";

import { Field, FieldArray } from "formik";
import { IconContext } from "react-icons";
import { FaFileAlt } from "react-icons/fa";
import styled from "@emotion/styled";
import Checkbox from "src/components/ui/Checkbox";

const FileForm = (props) => {
  const { setFieldValue, values, isEdit, errors, touched } = props;
  const cropper = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [srcImage, setSrcImage] = useState(null);

  const [cropResult, setCropResult] = useState(
    isEdit ? values.picture : "../../../static/assets/img/no-foto.png"
  );

  const [fileName, setFileName] = useState("");
  const inputFileImg = useRef(null);

  const [srcFile, setSrcFile] = useState(isEdit ? values.audio : null);

  const handleUploadFile = (e) => {
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();

    if (files[0].size > 2000000) {
      alert("El tamaño del archivo es muy grande");
    } else {
      reader.onload = () => {
        setSrcFile(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setFieldValue("audio", files[0]);
    }
  };
  return (
    <div className="p-4">
      <AdminForm>
        <Row className="mb-5">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Nombre</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field name="title" type="text" placeholder="Nombre del Archivo" />
            {errors.title && touched.title ? (
              <small className="d-block text-red">{errors.title}</small>
            ) : null}
          </Col>
        </Row>

        {/* <Row className="mb-5">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Privado</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="private" />
          </Col>
        </Row> */}
        {/* <Row className="mb-5">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Compartir con</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }} className="position-relative">
            <FieldArray
              name="students"
              render={(arrayHelpers) => (
                <div>
                  {values.students && values.students.length > 0 ? (
                    values.students.map((friend, index) => (
                      <div key={index}>
                        <span>{values.students[index]}</span>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          X
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      {/* show this when user has removed all students from the list *
                      Add a friend
                    </button>
                  )}
                </div>
              )}
            />
            {/* {errors.title && touched.title ? (
              <small className="d-block text-red">{errors.title}</small>
            ) : null} 
          </Col>
        </Row> */}
        <Row className="">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <div>
              <span className="m-0 font-weight-normal d-block">Archivo</span>
              <small>(2MB max)</small>
            </div>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            {srcFile && (
              <File>
                <IconContext.Provider
                  value={{
                    size: 100,
                    className: "text-dark mb-3",
                  }}
                >
                  <FaFileAlt />
                </IconContext.Provider>
                <span>{values.audio.name}</span>
              </File>
            )}

            <input
              type="file"
              id="audio-upload"
              className="d-none"
              onChange={handleUploadFile}
            />
            <label htmlFor="audio-upload" css={ButtonStyle} className="w-100">
              Subir el archivo
            </label>
            {errors.audio && touched.audio ? (
              <small className="d-block text-red">{errors.audio}</small>
            ) : null}
          </Col>
        </Row>
      </AdminForm>
    </div>
  );
};
const File = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 1rem auto;
`;
export default FileForm;
