import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import ContainerWrapper from "src/components/ui/Container";
import Filters from "src/components/Layout/Filters";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import {
  ButtonCustom,
  ButtonCustomSuccess,
} from "src/components/ui/ButtonCustom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import PodcastCard from "src/components/AdminAcademy/PodcastCard";
import PodcastForm from "src/components/AdminAcademy/PodcastForm";
import { MdPlaylistAdd, MdClose } from "react-icons/md";
import VideoList from "src/components/ui/VideoList";
import SearchBar from "src/components/ui/SearchBar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchPodcasts,
  setPodcastEdit,
  deletePodcastEdit,
  editPodcast,
  createPodcast,
  fetchPodcastsPagination,
  deletePodcast,
} from "src/redux/actions/podcasts";

import { Formik, Form as FormFormik } from "formik";
import videosReducer from "src/redux/reducers/videosReducer";
import * as Yup from "yup";
import styled from "@emotion/styled";

const PodcastSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "El titulo es muy corto")
    .max(100, "El titulo es muy largo")
    .required("Este campo es obligatorio"),
  description: Yup.string().max(500, "La descripción es demasiado larga"),
  audio: Yup.mixed().required("Este campo es obligatorio"),
});
const PodcastsPack = () => {
  const MySwal = withReactContent(Swal);

  const main = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const dispatchDeletePodcastEdit = () => dispatch(deletePodcastEdit());
    dispatchDeletePodcastEdit();
    setShow(false);
  };
  const handleShow = (podcast = null) => {
    if (podcast) {
      const dispatchSetPodcastEdit = (podcast) =>
        dispatch(setPodcastEdit(podcast));
      dispatchSetPodcastEdit(podcast);
    }
    setShow(true);
  };
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchPodcasts = () => dispatch(fetchPodcasts());
      dispatchFetchPodcasts();
    }
  }, [programReducer.isLoading]);
  const podcastsReducer = useSelector((state) => state.podcastsReducer);

  const handleDeletePodcast = (id) => {
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
        const dispatchDeletePodcast = (id) => dispatch(deletePodcast(id));
        dispatchDeletePodcast(id);
      }
    });
  };
  const [search, setSearch] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchPodcasts = (search) => dispatch(fetchPodcasts(search));
    dispatchFetchPodcasts(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPodcastsPagination = (url) =>
      dispatch(fetchPodcastsPagination(url));
    dispatchFetchPodcastsPagination(url);
  };
  const videosReducer = useSelector((state) => state.videosReducer);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const handleToggleAddVideo = () => {
    setIsAddVideoOpen((isAddVideoOpen) => (isAddVideoOpen ? false : true));
  };
  return (
    <>
      <Main padding ref={main}>
        <Filters
          title="Podcasts"
          placeholder="Buscar Podcasts"
          search={{ search: search, setSearch: setSearch }}
          onSubmit={handleSubmitSearch}
        />
        <ContainerWrapper>

        <div className="cursor-pointer  mb-3" onClick={handleToggleAddVideo}>

{isAddVideoOpen ? (
  <div className="d-flex align-items-center">
    <IconContext.Provider
      value={{
        size: 22,
        className: "global-class-name mr-2",
      }}
      >
      {" "}
      <MdClose />
    </IconContext.Provider>
    Cerrar
  </div>
) : (
  <>
    <IconContext.Provider
      value={{
        size: 22,
        className: "global-class-name mr-2",
      }}
      >
      {" "}
      <MdPlaylistAdd />
    </IconContext.Provider>
    Añadir podcast
  </>
)}
</div>
{isAddVideoOpen && (
<div className="position-relative">
  <VideosForm onSubmit={(e) => e.preventDefault()}>
    <SearchBar
      placeholder="Buscar Videos"
      search={{ search: search, setSearch: setSearch }}
      onSubmit={handleSubmitSearch}
    />
    <AddVideoList>
      {videosReducer.videos &&
        videosReducer.videos.results.map((video) => (
          <PlaylistVideo
            className="d-flex justify-content-between align-items-center"
            key={video.id}
          >
            <VideoList video={video} />
            <IconContext.Provider
              value={{
                size: 30,
                className: "global-class-name mr-2 cursor-pointer",
              }}
            >
              <MdPlaylistAdd onClick={() =>{}} />
            </IconContext.Provider>
          </PlaylistVideo>
        ))}
      {videosReducer.isLoading && <span>Cargando...</span>}
      {videosReducer.videos && videosReducer.videos.next && (
        <div className="d-flex justify-content-center">
          <ButtonCustom
            onClick={fetchMoreVideos}
            className="w-100"
            type="button"
          >
            Cargar más videos
          </ButtonCustom>
        </div>
      )}
    </AddVideoList>
  </VideosForm>
</div>
)}

          {podcastsReducer.podcasts &&
            podcastsReducer.podcasts.results.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                handleShow={handleShow}
                handleDeletePodcast={handleDeletePodcast}
              />
            ))}
          {podcastsReducer.isLoading && <span>Cargando...</span>}
          {podcastsReducer.podcasts &&
            (podcastsReducer.podcasts.previous ||
              podcastsReducer.podcasts.next) && (
              <div className="d-flex justify-content-center my-5">
                {podcastsReducer.podcasts.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(podcastsReducer.podcasts.previous)
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
                {podcastsReducer.podcasts.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(podcastsReducer.podcasts.next)
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
            podcastsReducer.podcast_edit
              ? podcastsReducer.podcast_edit
              : {
                  title: "",
                  description: "",
                  picture: null,
                  audio: null,
                  duration: null,
                }
          }
          validationSchema={PodcastSchema}
          onSubmit={(values) => {
            if (podcastsReducer.podcast_edit) {
              console.log(values);
              const dispatchEditPodcast = (values) =>
                dispatch(editPodcast(values));
              dispatchEditPodcast(values);
            } else {
              const dispatchCreatePodcast = (values) =>
                dispatch(createPodcast(values));
              dispatchCreatePodcast(values);
            }

            handleClose();
          }}
        >
          {(props) => {
            return (
              <>
                <FormFormik>
                  <Modal.Header closeButton>
                    <Modal.Title>Creación del podcast</Modal.Title>
                  </Modal.Header>

                  <PodcastForm
                    values={props.values}
                    setFieldValue={props.setFieldValue}
                    isEdit={podcastsReducer.podcast_edit ? true : false}
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
const VideosForm = styled.form`
  position: absolute;
  z-index: 10000;
  background: #fff;
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;

  }
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
export default PodcastsPack;
