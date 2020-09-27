import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { ButtonCustom } from "src/components/ui/ButtonCustom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import { IconContext } from "react-icons";
import PostForm from "src/components/AdminAcademy/PostForm";
import { AdminForm } from "src/components/ui/AdminForm";

import { Formik, Form as FormFormik, Field } from "formik";
import {
  fetchComments,
  setCommentEdit,
  editComment,
  deleteCommentEdit,
  createComment,
  deleteComment,
  fetchCommentsPagination,
} from "src/redux/actions/comments";
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
import { fetchPosts } from "../redux/actions/posts";

const CommentSchema = Yup.object().shape({
  message: Yup.string()
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
    const dispatchDeleteCommentEdit = () => dispatch(deleteCommentEdit());
    dispatchDeleteCommentEdit();
    setShow(false);
  };
  const handleShow = (video = null) => {
    if (video) {
      const dispatchSetCommentEdit = (video) => dispatch(setCommentEdit(video));
      dispatchSetCommentEdit(video);
    }

    setShow(true);
  };
  const dispatch = useDispatch();
  const commentsReducer = useSelector((state) => state.commentsReducer);
  const postReducer = useSelector((state) => state.postReducer);
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchComments = (id) => dispatch(fetchComments(id));
      dispatchFetchComments(id);
      const dispatchFetchPost = (id) => dispatch(fetchPost(id));
      dispatchFetchPost(id);
    }
  }, [programReducer.program]);

  const handleCommentDelete = (id) => {
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
        const dispatchDeleteComment = (id) => dispatch(deleteComment(id));
        dispatchDeleteComment(id);
      }
    });
  };

  const [search, setSearch] = useState();

  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchCommentsPagination = (url) =>
      dispatch(fetchCommentsPagination(url));
    dispatchFetchCommentsPagination(url);
  };

  return (
    <>
      <Main padding ref={main}>
        <ContainerWrapper>
          {!postReducer.isLoading && <Post post={postReducer.post} />}
          {!postReducer.isLoading && postReducer.error}
          <div className="mx-4">
            <div className="mb-3">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  message: "",
                }}
                validationSchema={CommentSchema}
                onSubmit={(values, { resetForm }) => {
                  console.log("submit");
                  const dispatchCreateComment = (id, values) =>
                    dispatch(createComment(id, values));
                  dispatchCreateComment(id, values);
                  resetForm({});
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
                              name="message"
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
                          {errors.message && touched.message ? (
                            <small className="d-block text-red">
                              {errors.message}
                            </small>
                          ) : null}
                        </AdminForm>
                      </FormFormik>
                    </>
                  );
                }}
              </Formik>
            </div>
            {commentsReducer.comments &&
              commentsReducer.comments.results.map((comment) => (
                <Comment comment={comment} key={comment.code} />
              ))}
          </div>
          {commentsReducer.isLoading && <span>Cargando...</span>}
          {commentsReducer.comments &&
            (commentsReducer.comments.previous ||
              commentsReducer.comments.next) && (
              <div className="d-flex justify-content-center my-5">
                {commentsReducer.comments.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(commentsReducer.comments.previous)
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
                {commentsReducer.comments.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(commentsReducer.comments.next)
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
