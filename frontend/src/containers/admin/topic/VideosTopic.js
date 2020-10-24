import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { ButtonCustom } from "src/components/ui/ButtonCustom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { MdPlaylistAdd, MdClose } from "react-icons/md";
import VideoList from "src/components/ui/VideoList";
import SearchBar from "src/components/ui/SearchBar";

import { IconContext } from "react-icons";
import VideoCard from "src/components/TopicAcademy/VideoCard";
import {
  fetchVideos,
  fetchVideosIncrease

} from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form as FormFormik } from "formik";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContainerWrapper from "src/components/ui/Container";

import * as Yup from "yup";
import styled from "@emotion/styled";
import { addVideoTopic, fetchVideosTopic, fetchVideosTopicIncrease, fetchVideosTopicPagination, removeVideoTopic } from "../../../redux/actions/topics/videosTopic";

const VideosTopic = (props) => {
  const MySwal = withReactContent(Swal);
  const main = useRef();

  const dispatch = useDispatch();
  const videosReducer = useSelector((state) => state.videosReducer);
  const videosTopicReducer = useSelector((state) => state.videosTopicReducer);
  const packReducer = useSelector((state) => state.packReducer);
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchVideos = () => dispatch(fetchVideos());
      dispatchFetchVideos();
  
    }
  }, [programReducer.program]);

  useEffect(() => {
    if (!packReducer.isLoading && packReducer.pack) {
      const dispatchFetchVideosTopic = () => dispatch(fetchVideosTopic());
      dispatchFetchVideosTopic();
    }
  }, [packReducer.isLoading]);

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
        const dispatchDeleteVideo = (id) => dispatch(removeVideoTopic(id));
        dispatchDeleteVideo(id);
      }
    });
  };

  const [search, setSearch] = useState();
  
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchVideosTopicSearch = (search) => dispatch(fetchVideosTopic(search));
    dispatchFetchVideosTopicSearch(search);
  };

  const [searchVideos, setSearchVideos] = useState();
    const handleSubmitSearchVideos = (e) => {
      e.preventDefault();
      const dispatchFetchVideosTopicSearch = (search) => dispatch(fetchVideos(search));
      dispatchFetchVideosTopicSearch(searchVideos);
    };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchVideosTopicPagination = (url) =>
      dispatch(fetchVideosTopicPagination(url));
    dispatchFetchVideosTopicPagination(url);
  };
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const handleToggleAddVideo = () => {
    setIsAddVideoOpen((isAddVideoOpen) => (isAddVideoOpen ? false : true));
  };
  const handleAddVideo = (id) =>{
    const dispatchAddVideoTopic = (id) => dispatch(addVideoTopic(id));
    dispatchAddVideoTopic(id);
  }
  const [limit, setLimit] = useState(12);
  const fetchMoreVideos = () => {
    const dispatchFetchVideosIncrease = (limit, search) =>
      dispatch(fetchVideosIncrease(limit, search));
    dispatchFetchVideosIncrease(limit + 12, search);
    setLimit((limit) => limit + 12);
  };
  return (
    <>
        <form>
          <Filters
            title="Videos"
            placeholder="Buscar Videos"
            search={{ search: search, setSearch: setSearch }}
            onSubmit={handleSubmitSearch}
          />
        </form>
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
                  Añadir videos
                </>
              )}
              </div>
              {isAddVideoOpen && (
              <div className="position-relative">
                <VideosForm onSubmit={(e) => e.preventDefault()}>
                  <SearchBar
                    placeholder="Buscar Videos"
                    search={{ search: searchVideos, setSearch: setSearchVideos }}
                    onSubmit={handleSubmitSearchVideos}
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
                            <MdPlaylistAdd onClick={() => handleAddVideo(video.id)} />
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

          {videosTopicReducer.videos &&
            videosTopicReducer.videos.results.map((video_pack) => (
              <VideoCard
                video={video_pack.video}
                key={video_pack.video.id}
                handleVideoDelete={handleVideoDelete}
              />
            ))}
          {videosTopicReducer.isLoading && <span>Cargando...</span>}
          {videosTopicReducer.videos &&
            (videosTopicReducer.videos.previous || videosTopicReducer.videos.next) && (
              <div className="d-flex justify-content-center my-5">
                {videosTopicReducer.videos.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(videosTopicReducer.videos.previous)
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
                {videosTopicReducer.videos.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(videosTopicReducer.videos.next)
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
  border: 1px solid #ccc;
`;
export default VideosTopic;
