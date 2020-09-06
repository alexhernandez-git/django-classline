import React, { useRef, useState, useEffect } from "react";

import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { Main } from "src/components/ui/Main";

import { fetchVideos, fetchVideosPagination } from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import { ButtonCustom } from "src/components/ui/ButtonCustom";
import DocsItem from "src/components/ui/DocsItem";
import { FaFolder, FaFile } from "react-icons/fa";
import { Formik, Form as FormFormik } from "formik";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

import * as Yup from "yup";
import FileForm from "../../components/AdminAcademy/FileForm";
import ShareForm from "../../components/AdminAcademy/ShareForm";
import {
  createFolder,
  fetchFolders,
  deleteFolders,
  setTopFolder,
  setCurrentFolder,
  fetchTopFolders,
  removeCurrentFolder,
} from "../../redux/actions/folders";
import { fetchFiles, createFile, deleteFiles } from "../../redux/actions/files";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const FileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El titulo es muy corto")
    .max(100, "El titulo es muy largo")
    .required("Este campo es obligatorio"),
  file: Yup.mixed().required("Este campo es obligatorio"),
});

export default function DocsAdmin() {
  const MySwal = withReactContent(Swal);

  const main = useRef();
  const foldersReducer = useSelector((state) => state.foldersReducer);
  const filesReducer = useSelector((state) => state.filesReducer);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const handleOpenCategories = () => {
    setCategoriesOpen((CategoriesOpen) => {
      if (CategoriesOpen) {
        return false;
      } else {
        return true;
      }
    });
  };
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchFolders = () => dispatch(fetchFolders());
      dispatchFetchFolders();
      const dispatchFetchFiles = () => dispatch(fetchFiles());
      dispatchFetchFiles();
    }
  }, []);
  const [search, setSearch] = useState("");
  // useEffect(() => {
  //   if (!programReducer.isLoading && programReducer.program) {
  //     const dispatchFetchFolders = (search) => dispatch(fetchFolders(search));
  //     dispatchFetchFolders(search);
  //   }
  // }, [search, programReducer.isLoading]);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchFolders = (search) => dispatch(fetchFolders(search));
    dispatchFetchFolders(search);
    const dispatchFetchFiles = (search) => dispatch(fetchFiles(search));
    dispatchFetchFiles(search);
  };

  const handleCreateFolder = () => {
    dispatch(createFolder());
  };
  const handleDeleteFolder = (folder) => {
    MySwal.fire({
      title: "Estas seguro?",
      text: "Se eliminará esta carpeta con todos los archivos dentro",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Atras",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteFolders(folder.id));
      }
    });
  };
  const handleDeleteFile = (file) => {
    MySwal.fire({
      title: "Estas seguro?",
      text: "Se eliminará esta carpeta con todos los archivos dentro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Atras",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteFiles(file.id));
      }
    });
  };
  const hanldeEnterFolder = (folder) => {
    dispatch(setCurrentFolder(folder.id));
    dispatch(fetchFolders());
    dispatch(fetchFiles());
  };
  const hanldeEnterTopFolder = () => {
    dispatch(removeCurrentFolder());
    dispatch(fetchFolders());
    dispatch(fetchFiles());
  };
  return (
    <>
      <Main padding ref={main}>
        <Filters
          title="Documentos"
          placeholder={"Buscar Documentos"}
          title="Documentos"
          search={{ search: search, setSearch: setSearch }}
          onSubmit={handleSubmitSearch}
        />
        <div className="d-sm-flex justify-content-between mb-3">
          <div>
            {foldersReducer.current_folders.length > 0 && (
              <ButtonCustom
                type="button"
                className="d-flex align-items-center mr-3 justify-content-center"
                onClick={hanldeEnterTopFolder}
              >
                <IconContext.Provider
                  value={{
                    className: "cursor-pointer mr-2",
                    color: "#fff",
                  }}
                >
                  <FaFolder />
                </IconContext.Provider>
                Volver
              </ButtonCustom>
            )}
          </div>
          <div className="d-flex">
            <ButtonCustom
              type="button"
              className="d-flex align-items-center mr-3 justify-content-center"
              onClick={handleCreateFolder}
            >
              <IconContext.Provider
                value={{
                  className: "cursor-pointer mr-2",
                  color: "#fff",
                }}
              >
                <FaFolder />
              </IconContext.Provider>
              Nueva carpeta
            </ButtonCustom>
            <div className="d-block d-sm-none m-2"></div>
            <ButtonCustom
              type="button"
              className="d-flex align-items-center justify-content-center"
              onClick={handleShow}
            >
              <IconContext.Provider
                value={{
                  className: "cursor-pointer mr-2",
                  color: "#fff",
                }}
              >
                <FaFile />
              </IconContext.Provider>
              Nuevo archivo
            </ButtonCustom>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <GridFolders>
              {foldersReducer.folders &&
                foldersReducer.folders.map((folder) => (
                  <DocsItem
                    admin
                    is_editing={folder.is_editing}
                    folder={folder}
                    key={folder.id}
                    handleDeleteFolder={handleDeleteFolder}
                    hanldeEnterFolder={hanldeEnterFolder}
                  />
                ))}
              {filesReducer.files &&
                filesReducer.files.map((file) => (
                  <DocsItem
                    admin
                    is_file
                    file={file}
                    key={file.id}
                    hanldeEnterFolder={hanldeEnterFolder}
                    handleDeleteFile={handleDeleteFile}
                  />
                ))}
            </GridFolders>
            {(foldersReducer.isLoading || filesReducer.isLoading) && (
              <span>Cargando...</span>
            )}
          </div>
        </div>
      </Main>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: "",
            file: null,
          }}
          validationSchema={FileSchema}
          onSubmit={(values) => {
            const dispatchCreateFile = (values) => dispatch(createFile(values));
            dispatchCreateFile(values);

            handleClose();
          }}
        >
          {(props) => {
            return (
              <>
                <FormFormik>
                  <Modal.Header closeButton>
                    <Modal.Title>Subida del archivo</Modal.Title>
                  </Modal.Header>

                  <FileForm
                    values={props.values}
                    setFieldValue={props.setFieldValue}
                    errors={props.errors}
                    touched={props.touched}
                  />
                  <Modal.Footer>
                    <ButtonCustom type="submit">Guardar</ButtonCustom>
                  </Modal.Footer>
                </FormFormik>
              </>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
}

const ButtonSearchUsers = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  padding: 7px 12px;
  border-radius: 100px;
  color: #828282;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #e7e7e7;
  }
`;
export const GridFolders = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;
  grid-template-columns: repeat(7, 1fr);
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
