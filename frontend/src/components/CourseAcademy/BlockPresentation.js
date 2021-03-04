import React, { useState, useRef, useEffect, useCallback } from "react";
import { ButtonStyle, ButtonCustomError } from "src/components/ui/ButtonCustom";
import { Form, Row, Col, Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import Filters from "src/components/Layout/Filters";

import { FaPlus, FaTrash } from "react-icons/fa";
import { MdPlaylistAdd, MdClose, MdAdd } from "react-icons/md";
import { AdminForm } from "src/components/ui/AdminForm";
import VideoList from "src/components/ui/VideoList";
import styled from "@emotion/styled";
import DndVideoList from "src/components/ui/DndVideoList";
import SearchBar from "src/components/ui/SearchBar";
import { fetchVideos, fetchVideosIncrease } from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormFormik, Field } from "formik";

import { ButtonCustom, ButtonCustomSuccess } from "../ui/ButtonCustom";
import useOutsideClick from "../../hooks/useOutsideClick";
import CardItemDrag from "./CardItemDrag";
import update from "immutability-helper";
import { useParams } from "react-router-dom";
import {
  fetchBlock,
  saveBlock,
  uploadPicture,
} from "../../redux/actions/courses/block";
import Cropper from "react-cropper";
const BlockPresentation = (props) => {
  const dispatch = useDispatch();

  const blockReducer = useSelector((state) => state.blockReducer);

  const cropper = useRef(null);
  const inputFileVideo = useRef(null);
  const inputFileImg = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const [srcImage, setSrcImage] = useState(null);
  const [cropResult, setCropResult] = useState("/static/assets/img/img4x3.png");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!blockReducer.isLoading && blockReducer.block) {
      console.log(blockReducer.block.picture);
      setCropResult(
        blockReducer.block.picture
          ? blockReducer.block.picture
          : "/static/assets/img/img4x3.png"
      );
    }
  }, [blockReducer.block?.picture]);
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
    <>
      <AdminForm>
        <Row className="video-upload mb-4">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="font-weight-normal">Imagen</span>
          </Col>
          <Col lg={{ offset: 1, span: 6 }}>
            <label htmlFor="img-block-upload" className="w-100 cursor-pointer">
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
            <label
              htmlFor="img-block-upload"
              css={ButtonStyle}
              className="w-100"
            >
              Subir imagen
            </label>
            <input
              type="file"
              id="img-block-upload"
              className="d-none"
              ref={inputFileImg}
              placeholder="Imagen"
              onChange={handleUploadImage}
            />
          </Col>
        </Row>
      </AdminForm>
      <Modal show={show} size="lg">
        <Modal.Header closeButton></Modal.Header>

        <Cropper
          ref={cropper}
          style={{ height: 400, width: "100%" }}
          // Cropper.js options
          src={srcImage}
          viewMode={1}
          aspectRatio={4 / 3}
          guides={false}
        />
        <Modal.Footer>
          <ButtonCustomSuccess onClick={cropImage}>Guardar</ButtonCustomSuccess>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const VideosForm = styled.form`
  position: absolute;
  z-index: 10000;
  background: #fff;
  width: 100%;
`;
const PlaylistVideo = styled.div`
  padding: 1rem;
  &:hover {
    background: #ececec;
  }
`;
const AddVideoList = styled.div`
  max-height: 40vh;
  overflow: auto;
  border: 1px solid #ccc;
`;
const AddItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  border: 1px dashed #ccc;
`;
export default BlockPresentation;
