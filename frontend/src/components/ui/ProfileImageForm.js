import React, { useRef, useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { ButtonStyle, ButtonCustomSuccess } from "../ui/ButtonCustom";
import Cropper from "react-cropper";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "src/redux/actions/auth";
import { AdminForm } from "./AdminForm";

const ProfileImageForm = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);

  const cropper = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [srcImage, setSrcImage] = useState(null);

  const [cropResult, setCropResult] = useState(
    "/static/assets/img/no-foto-square.png"
  );
  useEffect(() => {
    if (authReducer.user && authReducer.user.profile.picture) {
      setCropResult(authReducer.user.profile.picture);
    }
  }, authReducer.isAuthenticated);
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
    setCropResult(cropper.current.getCroppedCanvas().toDataURL());

    var file = dataURLtoFile(
      cropper.current.getCroppedCanvas().toDataURL("image/png", 0.7),
      Math.random().toString(36) + fileName
    );
    if (file.size < 2000000) {
      // const dispatchUploadPicture = () => dispatch(uploadPicture())
      // dispatchUploadPicture()
      const profile = {
        picture: file,
      };
      const dispatchUpdateProfile = (profile) =>
        dispatch(updateProfile(profile));
      dispatchUpdateProfile(profile);
    } else {
      alert("Esta imágen no puede ser mayor a 2MB");
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
    <div className="bg-white border p-3 rounded my-2 mb-4">
      <span className="d-none d-md-block">Foto de perfil</span>

      <AdminForm>
        <Row className="video-upload">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="font-weight-normal">Foto de perfil</span>
          </Col>
          <Col lg={{ offset: 1, span: 6 }}>
            <Row>
              <Col
                lg={4}
                className="d-flex justify-content-center align-content-center align-items-center"
              >
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer"
                  style={{
                    width: "100px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      padding: "5px",
                    }}
                    src={cropResult}
                    alt=""
                    className="my-3 border rounded-circle"
                  />
                </label>
              </Col>
              <Col
                lg={6}
                className="d-flex justify-content-center align-content-start align-items-center flex-column"
              >
                <label
                  htmlFor="avatar-upload"
                  css={ButtonStyle}
                  className="w-100"
                >
                  Subir imagen
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  className="d-none"
                  ref={inputFileImg}
                  placeholder="Imagen"
                  onChange={handleUploadImage}
                />
              </Col>
            </Row>
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

export default ProfileImageForm;
