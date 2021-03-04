import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { ButtonCustom } from "src/components/ui/ButtonCustom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import VideoCard from "src/components/AdminAcademy/VideoCard";
import VideoForm from "src/components/AdminAcademy/VideoForm";
import {
  fetchVideos,
  setVideoEdit,
  editVideo,
  deleteVideoEdit,
  createVideo,
  deleteVideo,
  fetchVideosPagination,
} from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form as FormFormik } from "formik";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContainerWrapper from "src/components/ui/Container";

import * as Yup from "yup";

const VideoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "El titulo es muy corto")
    .max(100, "El titulo es muy largo")
    .required("Este campo es obligatorio"),
  description: Yup.string().max(500, "La descripción es demasiado larga"),
  video: Yup.mixed().required("Este campo es obligatorio"),
});

const VideosAdmin = () => {
  const MySwal = withReactContent(Swal);

  const main = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const dispatchDeleteVideoEdit = () => dispatch(deleteVideoEdit());
    dispatchDeleteVideoEdit();
    setShow(false);
  };
  const handleShow = (video = null) => {
    if (video) {
      const dispatchSetVideoEdit = (video) => dispatch(setVideoEdit(video));
      dispatchSetVideoEdit(video);
    }

    setShow(true);
  };
  const dispatch = useDispatch();
  const videosReducer = useSelector((state) => state.videosReducer);
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchVideos = () => dispatch(fetchVideos());
      dispatchFetchVideos();
    }
  }, [programReducer.program]);

  const handleVideoDelete = (id) => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchDeleteVideo = (id) => dispatch(deleteVideo(id));
        dispatchDeleteVideo(id);
      }
    });
  };

  const [search, setSearch] = useState();

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

  return (
    <>
      <Main padding ref={main}>
        <form>
          <Filters
            title="Videos"
            placeholder="Buscar video"
            search={{ search: search, setSearch: setSearch }}
            onSubmit={handleSubmitSearch}
          />
        </form>
        <ContainerWrapper>
          <div className="d-flex justify-content-between mb-3">
            <div>
              {videosReducer.video_creating && (
                <span>Subiendo video, por favor espera...</span>
              )}
              {videosReducer.video_editing && (
                <span>Editando video, por favor espera...</span>
              )}
            </div>
            <ButtonCustom onClick={() => handleShow()}>
              Nuevo Video
            </ButtonCustom>
          </div>

          {videosReducer.videos &&
            videosReducer.videos.results.map((video) => (
              <VideoCard
                handleShow={handleShow}
                video={video}
                key={video.id}
                handleVideoDelete={handleVideoDelete}
              />
            ))}
          {videosReducer.isLoading && <span>Cargando...</span>}
          {videosReducer.videos &&
            (videosReducer.videos.previous || videosReducer.videos.next) && (
              <div className="d-flex justify-content-center my-5">
                {videosReducer.videos.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(videosReducer.videos.previous)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropleft />
                  </IconContext.Provider>
                )}
                {videosReducer.videos.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(videosReducer.videos.next)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropright />
                  </IconContext.Provider>
                )}
              </div>
            )}
        </ContainerWrapper>
      </Main>
      <Modal show={show} onHide={handleClose} size="lg">
        <Formik
          enableReinitialize={true}
          initialValues={
            videosReducer.video_edit
              ? videosReducer.video_edit
              : {
                  title: "",
                  description: "",
                  picture: null,
                  video: null,
                  duration: null,
                }
          }
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
                    <Modal.Title>Creación del video</Modal.Title>
                  </Modal.Header>

                  <VideoForm
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
    </>
  );
};

export default VideosAdmin;
