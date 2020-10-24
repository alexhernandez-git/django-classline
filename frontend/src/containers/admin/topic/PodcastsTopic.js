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
import PodcastCard from "src/components/TopicAcademy/PodcastCard";
import { MdPlaylistAdd, MdClose } from "react-icons/md";
import VideoList from "src/components/ui/VideoList";
import SearchBar from "src/components/ui/SearchBar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchPodcasts,
  fetchPodcastsPagination,
} from "src/redux/actions/podcasts";

import { Formik, Form as FormFormik } from "formik";
import videosReducer from "src/redux/reducers/videosReducer";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { addPodcastTopic, fetchPodcastsTopic, fetchPodcastsTopicIncrease, removePodcastTopic } from "../../../redux/actions/topics/podcastsTopic";
import { fetchPodcastsIncrease } from "../../../redux/actions/podcasts";

const PodcastSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "El titulo es muy corto")
    .max(100, "El titulo es muy largo")
    .required("Este campo es obligatorio"),
  description: Yup.string().max(500, "La descripción es demasiado larga"),
  audio: Yup.mixed().required("Este campo es obligatorio"),
});
const PodcastsTopic = (props) => {
  const MySwal = withReactContent(Swal);
  const {infinite_height} = props

  const main = useRef();
  const dispatch = useDispatch();
  const podcastsReducer = useSelector((state) => state.podcastsReducer);
  const podcastsTopicReducer = useSelector((state) => state.podcastsTopicReducer);
  const topicReducer = useSelector((state) => state.topicReducer);
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchPodcasts = () => dispatch(fetchPodcasts());
      dispatchFetchPodcasts();
    }
  }, [programReducer.isLoading]);
  
  useEffect(() => {
    if (!topicReducer.isLoading && topicReducer.topic) {
      const dispatchFetchPodcastsTopic = () => dispatch(fetchPodcastsTopic());
      dispatchFetchPodcastsTopic();
    }
  }, [topicReducer.isLoading]);


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
        const dispatchDeletePodcast = (id) => dispatch(removePodcastTopic(id));
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
  const [searchPodcasts, setSearchPodcasts] = useState("");
  const handleSubmitSearchPodcasts = (e) => {
    e.preventDefault();
    const dispatchFetchPodcasts = (search) => dispatch(fetchPodcastsTopic(search));
    dispatchFetchPodcasts(searchPodcasts);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPodcastsPagination = (url) =>
      dispatch(fetchPodcastsPagination(url));
    dispatchFetchPodcastsPagination(url);
  };
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const handleToggleAddVideo = () => {
    setIsAddVideoOpen((isAddVideoOpen) => (isAddVideoOpen ? false : true));
  };
  const handleAddTopic = (id) =>{
    const dispatchAddPodcastTopic = (id) => dispatch(addPodcastTopic(id));
    dispatchAddPodcastTopic(id);
  }
  const [limit, setLimit] = useState(12);
  const fetchMorePodcasts = () => {
    const dispatchFetchPodcastsIncrease = (limit, search) =>
      dispatch(fetchPodcastsIncrease(limit, search));
    dispatchFetchPodcastsIncrease(limit + 12, search);
    setLimit((limit) => limit + 12);
  };
  return (
    <>
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
            Añadir podcasts
          </>
        )}
        </div>
        {isAddVideoOpen && (
        <div className="position-relative">
          <VideosForm onSubmit={(e) => e.preventDefault()}>
            <SearchBar
              placeholder="Buscar Podcasts"
              search={{ search: searchPodcasts, setSearch: setSearchPodcasts }}
              onSubmit={handleSubmitSearchPodcasts}
            />
            <AddVideoList>
              {podcastsReducer.podcasts &&
                podcastsReducer.podcasts.results.map((podcast) => (
                  <PlaylistVideo
                    className="d-flex justify-content-between align-items-center"
                    key={podcast.id}
                  >
                    <VideoList video={podcast} />
                    <IconContext.Provider
                      value={{
                        size: 30,
                        className: "global-class-name mr-2 cursor-pointer",
                      }}
                    >
                      <MdPlaylistAdd onClick={() =>handleAddTopic(podcast.id)} />
                    </IconContext.Provider>
                  </PlaylistVideo>
                ))}
              {podcastsReducer.isLoading && <span>Cargando...</span>}
              {podcastsReducer.podcasts && podcastsReducer.podcasts.next && (
                <div className="d-flex justify-content-center">
                  <ButtonCustom
                    onClick={fetchMorePodcasts}
                    className="w-100"
                    type="button"
                  >
                    Cargar más podcasts
                  </ButtonCustom>
                </div>
              )}
            </AddVideoList>
          </VideosForm>
        </div>
        )}

          {podcastsTopicReducer.podcasts &&
            podcastsTopicReducer.podcasts.results.map((podcast_topic) => (
              <PodcastCard
                key={podcast_topic.podcast.id}
                podcast={podcast_topic.podcast}
                handleDeletePodcast={handleDeletePodcast}
              />
            ))}
          {podcastsTopicReducer.isLoading && <span>Cargando...</span>}
          {podcastsTopicReducer.podcasts &&
            (podcastsTopicReducer.podcasts.previous ||
              podcastsTopicReducer.podcasts.next) && (
              <div className="d-flex justify-content-center my-5">
                {podcastsTopicReducer.podcasts.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(podcastsTopicReducer.podcasts.previous)
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
                {podcastsTopicReducer.podcasts.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(podcastsTopicReducer.podcasts.next)
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
    </>
  );
};
const VideosForm = styled.form`
  position: absolute;
  z-index: 400;
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
`;
export default PodcastsTopic;
