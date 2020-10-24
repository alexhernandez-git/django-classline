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

import { Field } from "formik";

const PodcastForm = (props) => {
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
  const handleUploadImage = (e) => {
    e.preventDefault();
    handleShow();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    setFileName(files[0].name);

    const reader = new FileReader();

    reader.onload = () => {
      setSrcImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const cropImage = () => {
    if (typeof cropper.current.getCroppedCanvas() === "undefined") {
      return;
    }
    setCropResult(
      cropper.current.getCroppedCanvas().toDataURL("image/png", 0.7)
    );

    var file = dataURLtoFile(
      cropper.current.getCroppedCanvas().toDataURL("image/png", 0.7),
      Math.random().toString(36) + fileName
    );
    if (file.size / 1024 / 1024 < 5) {
      setFieldValue("picture", file);
    } else {
      alert("Esta imágen no puede ser mayor a 5MB");
    }

    handleClose();
  };
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const [srcAudio, setSrcAudio] = useState(isEdit ? values.audio : null);

  const handleUploadAudio = (e) => {
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();

    reader.onload = () => {
      setSrcAudio(reader.result);
      var media = new Audio(reader.result);
      media.onloadedmetadata = function () {
        media.duration; // this would give duration of the video/audio file
        setFieldValue("duration", media.duration);
      };
    };

    if (files[0].size > 500000000) {
      alert("El tamaño del audio es muy grande");
    } else if (files[0].type != "audio/mpeg") {
      alert("El htmlFormato tiene que ser .mp3");
    } else {
      reader.readAsDataURL(files[0]);
      setFieldValue("audio", files[0]);
    }
  };
  return (
    <div className="p-4">
      <AdminForm>
        <Row className="my-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Titulo del Podcast</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field name="title" type="text" placeholder="Titulo del Podcast" />
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
            <span className="m-0 font-weight-normal">Descripción</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Field
              component="textarea"
              name="description"
              id=""
              cols="30"
              rows="10"
              placeholder="Descripción"
            />
            {errors.description && touched.description ? (
              <small className="d-block text-red">{errors.description}</small>
            ) : null}
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Audio</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            {srcAudio && (
              <audio src={srcAudio} controls className="mb-2 w-100" />
            )}

            <input
              type="file"
              id="audio-upload"
              className="d-none"
              onChange={handleUploadAudio}
            />
            <label htmlFor="audio-upload" css={ButtonStyle} className="w-100">
              Subir el audio
            </label>
            {errors.audio && touched.audio ? (
              <small className="d-block text-red">{errors.audio}</small>
            ) : null}
          </Col>
        </Row>
        <Row className="video-upload mb-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="font-weight-normal">Miniatura</span>
          </Col>
          <Col lg={{ offset: 1, span: 6 }}>
            <label htmlFor="img-upload" className="cursor-pointer w-100">
              <img
                controls
                style={{
                  width: "100%",
                  padding: "5px",
                }}
                src={
                  cropResult
                    ? cropResult
                    : "../../../static/assets/img/no-foto.png"
                }
                alt=""
                className="my-3 border rounded"
              />
            </label>
            <label htmlFor="img-upload" css={ButtonStyle} className="w-100">
              Subir imágen
            </label>
            <input
              type="file"
              id="img-upload"
              className="d-none"
              ref={inputFileImg}
              placeholder="Imagen"
              onChange={handleUploadImage}
            />
          </Col>
        </Row>
      </AdminForm>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Creación del video</Modal.Title>
        </Modal.Header>

        <Cropper
          ref={cropper}
          style={{ height: 400, width: "100%" }}
          // Cropper.js options
          src={srcImage}
          viewMode={1}
          aspectRatio={1 / 1}
          guides={false}
        />
        <Modal.Footer>
          <ButtonCustomSuccess onClick={cropImage}>Guardar</ButtonCustomSuccess>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PodcastForm;
