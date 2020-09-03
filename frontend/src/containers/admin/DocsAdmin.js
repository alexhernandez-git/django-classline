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
import VideoForm from "src/components/AdminAcademy/VideoForm";
import FileForm from "../../components/AdminAcademy/FileForm";
import ShareForm from "../../components/AdminAcademy/ShareForm";

const VideoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "El titulo es muy corto")
    .max(100, "El titulo es muy largo")
    .required("Este campo es obligatorio"),
  description: Yup.string().max(500, "La descripción es demasiado larga"),
  video: Yup.mixed().required("Este campo es obligatorio"),
});

export default function DocsAdmin() {
  const main = useRef();
  const videosReducer = useSelector((state) => state.videosReducer);
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
      const dispatchFetchVideos = () => dispatch(fetchVideos());
      dispatchFetchVideos();
    }
  }, [programReducer.isLoading]);
  const [search, setSearch] = useState("");
  // useEffect(() => {
  //   if (!programReducer.isLoading && programReducer.program) {
  //     const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
  //     dispatchFetchVideos(search);
  //   }
  // }, [search, programReducer.isLoading]);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
    dispatchFetchVideos(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchVideosPagination = (url) =>
      dispatch(fetchVideosPagination(url));
    dispatchFetchVideosPagination(url);
  };
  const [showShare, setShowShare] = useState(false);

  const handleCloseShare = () => {
    setShowShare(false);
  };
  const handleShowShare = () => {
    setShowShare(true);
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
        <div className="d-sm-flex justify-content-end mb-3">
          <ButtonCustom className="d-flex align-items-center mr-3 justify-content-center">
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
        <div className="row">
          <div className="col-12">
            <GridFolders>
              <DocsItem admin handleShowShare={handleShowShare} />
              <DocsItem admin handleShowShare={handleShowShare} />
              <DocsItem admin handleShowShare={handleShowShare} />
              <DocsItem admin handleShowShare={handleShowShare} />
              <DocsItem admin handleShowShare={handleShowShare} />
              <DocsItem admin handleShowShare={handleShowShare} />
              <DocsItem admin handleShowShare={handleShowShare} />
              <DocsItem admin handleShowShare={handleShowShare} file />
              <DocsItem admin handleShowShare={handleShowShare} file />
              <DocsItem admin handleShowShare={handleShowShare} file />
              <DocsItem admin handleShowShare={handleShowShare} file />
            </GridFolders>
            {videosReducer.isLoading && <span>Cargando...</span>}
          </div>
        </div>
      </Main>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Formik
          enableReinitialize={true}
          initialValues={{
            title: "",
            description: "",
            picture: null,
            video: null,
            duration: null,
          }}
          validationSchema={VideoSchema}
          onSubmit={(values) => {
            if (videosReducer.video_edit) {
              const dispatchEditVideo = (values) => dispatch(editVideo(values));
              dispatchEditVideo(values);
            } else {
              const dispatchCreateVideo = (values) =>
                dispatch(createVideo(values));
              dispatchCreateVideo(values);
            }

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
                    isEdit={videosReducer.video_edit ? true : false}
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
      <Modal show={showShare} onHide={handleCloseShare} size="lg">
        <Formik
          enableReinitialize={true}
          initialValues={{
            title: "",
            description: "",
            picture: null,
            video: null,
            duration: null,
            students: ["jared", "ian", "brent"],
          }}
          validationSchema={VideoSchema}
          onSubmit={(values) => {
            if (videosReducer.video_edit) {
              const dispatchEditVideo = (values) => dispatch(editVideo(values));
              dispatchEditVideo(values);
            } else {
              const dispatchCreateVideo = (values) =>
                dispatch(createVideo(values));
              dispatchCreateVideo(values);
            }

            handleClose();
          }}
        >
          {(props) => {
            return (
              <>
                <FormFormik>
                  <Modal.Header closeButton>
                    <Modal.Title>Compartir con tus alumnos</Modal.Title>
                  </Modal.Header>

                  <ShareForm
                    values={props.values}
                    setFieldValue={props.setFieldValue}
                    errors={props.errors}
                    touched={props.touched}
                  />
                  <Modal.Footer>
                    <ButtonCustom type="submit">Compartir</ButtonCustom>
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
  grid-template-columns: repeat(5, 1fr);
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
