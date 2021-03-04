import React, { useRef, useState, useEffect } from "react";
import { Form, Row, Col, Modal, Button } from "react-bootstrap";
import {
  ButtonCustomSuccess,
  ButtonStyle,
} from "src/components/ui/ButtonCustom";
import Cropper from "react-cropper";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "src/redux/actions/topics/topic";

const TopicPresentation = (props) => {
  const dispatch = useDispatch();

  const cropper = useRef(null);
  const inputFileImg = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const topicReducer = useSelector((state) => state.topicReducer);

  const [srcImage, setSrcImage] = useState(null);
  const [cropResult, setCropResult] = useState(
    "/static/assets/img/no-foto-square.png"
  );
  const [fileName, setFileName] = useState("");
  useEffect(() => {
    if (!topicReducer.isLoading && topicReducer.topic) {
      console.log(topicReducer.topic.picture);
      setCropResult(
        topicReducer.topic.picture
          ? topicReducer.topic.picture
          : "/static/assets/img/no-foto-square.png"
      );
    }
  }, [topicReducer.topic?.picture]);

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
      cropper.current.getCroppedCanvas().toDataURL(),
      Math.random().toString(36) + fileName
    );
    var FileSize = file.size / 1024 / 1024;
    console.log(FileSize);
    if (FileSize < 50) {
      const dispatchUploadPicture = (file) => dispatch(uploadPicture(file));
      dispatchUploadPicture(file);
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

  return (
    <div className="bg-white border p-3 rounded my-2">
      <span className="d-none d-md-block">Presentación</span>

      <Row className="video-upload mb-4">
        <Col
          lg={{ span: 4 }}
          className="text-center d-lg-flex justify-content-end align-items-center"
        >
          <span className="font-weight-normal">Imagen</span>
        </Col>
        <Col lg={{ offset: 1, span: 6 }}>
          <label htmlFor="img-upload" className="cursor-pointer w-100">
            <img
              controls
              style={{
                width: "100%",
                padding: "5px",
              }}
              src={cropResult}
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

      <Modal show={show} size="lg">
        <Modal.Header closeButton></Modal.Header>

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

export default TopicPresentation;
