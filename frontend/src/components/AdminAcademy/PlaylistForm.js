import React, { useState, useRef, useEffect } from "react";
import { ButtonStyle, ButtonCustomError } from "src/components/ui/ButtonCustom";
import { Form, Row, Col } from "react-bootstrap";
import { IconContext } from "react-icons";

import { FaPlus, FaTrash } from "react-icons/fa";
import { MdPlaylistAdd, MdClose } from "react-icons/md";
import { AdminForm } from "src/components/ui/AdminForm";
import VideoList from "src/components/ui/VideoList";
import styled from "@emotion/styled";
import DndVideoList from "src/components/ui/DndVideoList";
import SearchBar from "src/components/ui/SearchBar";
import { fetchVideos, fetchVideosIncrease } from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";

import { Field } from "formik";
import { ButtonCustom } from "../ui/ButtonCustom";

const PlaylistForm = (props) => {
  const {
    values,
    setFieldValue,
    videoCards,
    setVideoCards,
    errors,
    touched,
  } = props;
  const dispatch = useDispatch();
  const inputFileVideo = useRef(null);
  const inputFileImg = useRef(null);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const handleToggleAddVideo = () => {
    setIsAddVideoOpen((isAddVideoOpen) => (isAddVideoOpen ? false : true));
  };
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchVideos = () => dispatch(fetchVideos());
      dispatchFetchVideos();
    }
  }, [programReducer.isLoading]);
  const videosReducer = useSelector((state) => state.videosReducer);

  const handleAddVideo = (video) => {
    setVideoCards((videoCards) => [
      ...videoCards,
      {
        id: Math.random().toString(36).substring(7),
        video: video,
        position: videoCards.length,
      },
    ]);
  };
  useEffect(() => {
    console.log(videoCards);
  }, [videoCards]);
  useEffect(() => {
    if (videoCards.length > 0) {
      setFieldValue("picture", videoCards[0].video.picture);
    }
  }, [videoCards]);

  const handleDeleteTrackVideo = (id) => {
    setVideoCards((videoCards) => videoCards.filter((card) => card.id !== id));
  };
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
    dispatchFetchVideos(search);
  };
  const [limit, setLimit] = useState(12);
  const fetchMoreVideos = () => {
    const dispatchFetchVideosIncrease = (limit, search) =>
      dispatch(fetchVideosIncrease(limit, search));
    dispatchFetchVideosIncrease(limit + 12, search);
    setLimit((limit) => limit + 12);
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <AdminForm>
          <Row className="my-4">
            <Col
              lg={{ span: 4 }}
              className="text-center d-lg-flex justify-content-end align-items-center"
            >
              <span className="m-0 font-weight-normal">Nombre</span>
            </Col>

            <Col lg={{ offset: 1, span: 6 }}>
              <Field type="text" name="name" placeholder="Nombre..." />
              {errors.name && touched.name ? (
                <small className="d-block text-red">{errors.name}</small>
              ) : null}
            </Col>
          </Row>
          <Row className="video-upload mb-4">
            <Col
              lg={{ span: 4 }}
              className="text-center d-lg-flex justify-content-end align-items-center"
            >
              <span className="font-weight-normal">Miniatura</span>
            </Col>
            <Col lg={{ offset: 1, span: 6 }}>
              <label htmlFor="img-upload" className="w-100">
                <img
                  controls
                  style={{
                    width: "100%",
                    padding: "5px",
                  }}
                  src={
                    values.picture
                      ? values.picture
                      : "../../../../static/assets/img/no-foto.png"
                  }
                  alt=""
                  className="my-3 border rounded"
                />
              </label>

              {/* <label htmlFor="img-upload" css={ButtonStyle} className="w-100">Subir imágen</label> */}
            </Col>
          </Row>

          {/* <Row className="mb-4">
                        <Col lg={{ span: 4 }} className="text-center d-lg-flex justify-content-end align-items-center">
                            <span className="m-0 font-weight-normal">Descripción</span>

                        </Col>


                        <Col lg={{ offset: 1, span: 6 }}>
                            <textarea name="" id="" cols="30" rows="10" placeholder="Descripción"></textarea>
                        </Col>
                    </Row> */}
        </AdminForm>
      </div>
      <div className="col-md-6 col-xl-5">
        <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
          <span>Videos</span>
          <div className="cursor-pointer" onClick={handleToggleAddVideo}>
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
                Añadir video
              </>
            )}
          </div>
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
                        <MdPlaylistAdd onClick={() => handleAddVideo(video)} />
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
        <DndVideoList
          videoCards={videoCards}
          setVideoCards={setVideoCards}
          handleDeleteTrackVideo={handleDeleteTrackVideo}
        />
      </div>
    </div>
  );
};
const VideosForm = styled.form`
  position: absolute;
  z-index: 10000;
  background: #fff;
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
export default PlaylistForm;
