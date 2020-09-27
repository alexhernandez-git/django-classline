import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { ButtonCustom } from "src/components/ui/ButtonCustom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import { IconContext } from "react-icons";
import VideoCard from "src/components/AdminAcademy/VideoCard";
import PostForm from "src/components/AdminAcademy/PostForm";
import { AdminForm } from "src/components/ui/AdminForm";

import { Formik, Form as FormFormik, Field } from "formik";
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

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContainerWrapper from "src/components/ui/Container";

import * as Yup from "yup";
import styled from "@emotion/styled";
import { Link, useHistory, useParams } from "react-router-dom";
import Post from "../components/ui/Post";
import Comment from "../components/ui/Comment";
import { fetchPost } from "../redux/actions/post";
import postReducer from "../redux/reducers/postReducer";

const VideoSchema = Yup.object().shape({
  comment: Yup.string()
    .min(2, "El comentario es muy corto")
    .max(1000, "El comentario es muy largo")
    .required("Este campo es obligatorio"),
});

const PostAcademy = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const { program, id } = useParams();

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
  const postReducer = useSelector((state) => state.postReducer);
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchVideos = () => dispatch(fetchVideos());
      dispatchFetchVideos();
      const dispatchFetchPost = (id) => dispatch(fetchPost(id));
      dispatchFetchPost(id);
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
    history.push(`/academy/${program}/forum`);
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
            title="Foro"
            placeholder="Buscar en el foro"
            search={{ search: search, setSearch: setSearch }}
            onSubmit={handleSubmitSearch}
          />
        </form>
        <ContainerWrapper>
          {!postReducer.isLoading && <Post post={postReducer.post} />}
          {!postReducer.isLoading && postReducer.error}
          <div className="mx-4">
            <div className="mb-3">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  comment: "",
                }}
                validationSchema={VideoSchema}
                onSubmit={(values) => {
                  if (videosReducer.video_edit) {
                    const dispatchEditVideo = (values) =>
                      dispatch(editVideo(values));
                    dispatchEditVideo(values);
                  } else {
                    const dispatchCreateVideo = (values) =>
                      dispatch(createVideo(values));
                    dispatchCreateVideo(values);
                  }

                  handleClose();
                }}
              >
                {({ errors, touched }) => {
                  return (
                    <>
                      <FormFormik>
                        <AdminForm className="mb-2">
                          <div className="d-md-flex">
                            <Field
                              component="textarea"
                              name="comment"
                              type="text"
                              placeholder="Comentario"
                              style={{ height: "36px" }}
                            />
                            <div className="m-1 d-none d-md-block"></div>
                            <ButtonCustom
                              type="submit"
                              style={{ height: "fit-content" }}
                            >
                              Comentar
                            </ButtonCustom>
                          </div>
                          {errors.comment && touched.comment ? (
                            <small className="d-block text-red">
                              {errors.comment}
                            </small>
                          ) : null}
                        </AdminForm>
                      </FormFormik>
                    </>
                  );
                }}
              </Formik>
            </div>
            <Comment />
            <Comment />
            <Comment />
            {videosReducer.videos &&
              videosReducer.videos.results.map((video) => (
                <>
                  <Comment />
                  <Comment />
                  <Comment />
                </>
              ))}
          </div>
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
    </>
  );
};

export default PostAcademy;
