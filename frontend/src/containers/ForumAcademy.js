import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { ButtonCustom } from "src/components/ui/ButtonCustom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import { IconContext } from "react-icons";
import PostForm from "src/components/AdminAcademy/PostForm";
import {
  fetchPosts,
  setPostEdit,
  editPost,
  deletePostEdit,
  createPost,
  deletePost,
  fetchPostsPagination,
} from "src/redux/actions/posts";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form as FormFormik } from "formik";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContainerWrapper from "src/components/ui/Container";

import * as Yup from "yup";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Post from "../components/ui/Post";

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "El titulo es muy corto")
    .max(100, "El titulo es muy largo")
    .required("Este campo es obligatorio"),
  message: Yup.string()
    .min(2, "El mensaje es muy corto")
    .max(1000, "El mensaje es muy largo")
    .required("Este campo es obligatorio"),
});

const ForumAcademy = () => {
  const MySwal = withReactContent(Swal);

  const main = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const dispatchDeletePostEdit = () => dispatch(deletePostEdit());
    dispatchDeletePostEdit();
    setShow(false);
  };
  const handleShow = (post = null) => {
    if (post) {
      const dispatchSetPostEdit = (post) => dispatch(setPostEdit(post));
      dispatchSetPostEdit(post);
    }

    setShow(true);
  };
  const dispatch = useDispatch();
  const postsReducer = useSelector((state) => state.postsReducer);
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchPosts = () => dispatch(fetchPosts());
      dispatchFetchPosts();
    }
  }, [programReducer.program]);

  const handlePostDelete = (id) => {
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
        const dispatchDeletePost = (id) => dispatch(deletePost(id));
        dispatchDeletePost(id);
      }
    });
  };

  const [search, setSearch] = useState();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchPosts = (search) => dispatch(fetchPosts(search));
    dispatchFetchPosts(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPostsPagination = (url) =>
      dispatch(fetchPostsPagination(url));
    dispatchFetchPostsPagination(url);
  };

  return (
    <>
      <Main padding ref={main}>
        <Filters
          title="Foro"
          placeholder="Buscar en el foro"
          search={{ search: search, setSearch: setSearch }}
          onSubmit={handleSubmitSearch}
        />
        <ContainerWrapper>
          <div className="d-flex justify-content-between mb-3">
            <div>
              {postsReducer.post_creating && (
                <span>Subiendo post, por favor espera...</span>
              )}
              {postsReducer.post_editing && (
                <span>Editando post, por favor espera...</span>
              )}
            </div>
            <ButtonCustom onClick={() => handleShow()}>Nuevo Post</ButtonCustom>
          </div>

          {postsReducer.posts &&
            postsReducer.posts.results.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          {postsReducer.isLoading && <span>Cargando...</span>}
          {postsReducer.posts &&
            (postsReducer.posts.previous || postsReducer.posts.next) && (
              <div className="d-flex justify-content-center my-5">
                {postsReducer.posts.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(postsReducer.posts.previous)
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
                {postsReducer.posts.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() => handleChangePage(postsReducer.posts.next)}
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
            postsReducer.post_edit
              ? postsReducer.post_edit
              : {
                  title: "",
                  message: "",
                }
          }
          validationSchema={PostSchema}
          onSubmit={(values) => {
            if (postsReducer.post_edit) {
              const dispatchEditPost = (values) => dispatch(editPost(values));
              dispatchEditPost(values);
            } else {
              const dispatchCreatePost = (values) =>
                dispatch(createPost(values));
              dispatchCreatePost(values);
            }

            handleClose();
          }}
        >
          {(props) => {
            return (
              <>
                <FormFormik>
                  <Modal.Header closeButton>
                    <Modal.Title>Creación del post</Modal.Title>
                  </Modal.Header>

                  <PostForm
                    values={props.values}
                    setFieldValue={props.setFieldValue}
                    isEdit={postsReducer.post_edit ? true : false}
                    errors={props.errors}
                    touched={props.touched}
                  />
                  <Modal.Footer>
                    <ButtonCustom type="submit">Crear</ButtonCustom>
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

export default ForumAcademy;
