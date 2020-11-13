import { useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "./TextEllipsis";
import { IconContext } from "react-icons";
import {
  FaFileAlt,
  FaFolder,
  FaCog,
  FaEdit,
  FaTrashAlt,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileCsv,
  FaFilePowerpoint,
  FaFilePdf,
  FaFolderOpen,
  FaDownload,
  FaFileDownload,
  FaFileArchive,
} from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { Formik, Form as FormFormik } from "formik";
import { CirclePicker } from "react-color";
import {
  MdCancel,
  MdShare,
  MdFileDownload,
  MdEdit,
  MdDelete,
  MdPublic,
  MdLock,
  MdFormatColorFill,
} from "react-icons/md";
import { IoMdUnlock, IoMdLock } from "react-icons/io";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { editFolder, editSharedUsersFolder } from "../../redux/actions/folders";
import { editFile, editSharedUsersFile } from "../../redux/actions/files";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ButtonCustom } from "./ButtonCustom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ShareForm from "../../components/AdminAcademy/ShareForm";
import MoveDocsItems from "../AdminAcademy/MoveDocsItems";
import { moveFile, moveFolder } from "../../redux/actions/moveFolders";

const FileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El color no el válido")
    .max(50, "El color no el válido")
    .required("Este campo es obligatorio"),
});

const MaterialCourse = (props) => {
  const { item } = props;
  console.log("item", item);

  const setFileIcon = () => {
    switch (item.content.name.split(".").pop()) {
      case "docx":
      case "DOCX":
        return <FaFileWord style={{ color: "#4285f4" }} />;
      case "xlsx":
      case "XLSX":
        return <FaFileExcel style={{ color: "#0f9d58" }} />;
      case "PNG":
      case "png":
      case "JPG":
      case "jpg":
      case "JPEG":
      case "jpeg":
        return <FaFileImage style={{ color: "#777" }} />;
      case "csv":
      case "CSV":
        return <FaFileCsv style={{ color: "#0f9d58" }} />;
      case "PPTX":
      case "pptx":
      case "PPT":
      case "ppt":
        return <FaFilePowerpoint style={{ color: "#fd7541" }} />;
      case "PDF":
      case "pdf":
        return <FaFilePdf style={{ color: "#ea4335" }} />;
      case "ZIP":
      case "zip":
      case "TAR":
      case "tar":
      case "RAR":
      case "rar":
        return <FaFileArchive style={{ color: "#e59915" }} />;
      default:
        return <FaFileAlt />;
    }
  };

  return (
    <Content>
      <div className="content">
        <IconContext.Provider
          value={{
            size: 100,
            className: "cursor-pointer",
          }}
        >
          <a
            href={item.content.file}
            target={"_blank"}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            {setFileIcon()}
            {item.name}
          </a>
        </IconContext.Provider>
      </div>
      {/* <div className="d-flex justify-content-end">
        {file && (
          <IconContext.Provider
            value={{
              size: 20,
              className: "cursor-pointer text-dark action-icon mr-2",
            }}
          >
            <OverlayTrigger
              key={"bottom"}
              placement={"bottom"}
              overlay={<Tooltip id={`tooltip-p`}>Descargar.</Tooltip>}
            >
              <MdFileDownload />
            </OverlayTrigger>
          </IconContext.Provider>
        )}
      </div> */}
    </Content>
  );
};

export const Content = styled.span`
  width: 100%;
  display: block;
  overflow: hidden;
  position: relative;
  img {
    transition: 0.5s ease;
    width: 100%;
  }
  .action-icon {
    opacity: 0;
  }
  &:hover .action-icon {
    opacity: 1;
    transition: 0.2s all ease;
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .text {
    align-items: center;
    bottom: 0;
    width: 100%;
    height: 20%;
    text-align: center;
  }
  .input {
    align-items: center;
    font-size: 12.8px;
  }
`;

export default MaterialCourse;
