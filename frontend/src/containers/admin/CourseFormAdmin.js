import React, { useState, useRef } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";

import styled from "@emotion/styled";
import PlaylistForm from "src/components/AdminAcademy/PlaylistForm";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { Formik, Form as FormFormik } from "formik";
import { Form } from "react-bootstrap";
import { createPlaylist, editPlaylist } from "src/redux/actions/courses";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const PlaylistSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre es muy corto")
    .max(100, "El nombre es muy largo")
    .required("Este campo es obligatorio"),
});

const NewPlaylist = () => {
  const router = useHistory();
  const coursesReducer = useSelector((state) => state.coursesReducer);

  const [tracks, setVideoCards] = useState(
    coursesReducer.playlist_edit ? coursesReducer.playlist_edit.tracks : []
  );
  const dispatch = useDispatch();
  return (
    <Main padding>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: coursesReducer.playlist_edit
            ? coursesReducer.playlist_edit.name
            : "",
          picture: coursesReducer.playlist_edit
            ? coursesReducer.playlist_edit.picture
            : null,
        }}
        validationSchema={PlaylistSchema}
        onSubmit={(values) => {
          const playlist = {
            name: values.name,
            tracks: tracks,
          };
          if (coursesReducer.playlist_edit) {
            const dispatchEditPlaylist = (playlist) =>
              dispatch(editPlaylist(playlist));
            dispatchEditPlaylist({
              ...playlist,
              id: coursesReducer.playlist_edit.id,
            });
          } else {
            const dispatchCreatePlaylist = (playlist) =>
              dispatch(createPlaylist(playlist));
            dispatchCreatePlaylist(playlist);
          }
          router.goBack();
        }}
      >
        {(props) => {
          return (
            <>
              <FormFormik>
                <Filters
                  back="Volver"
                  button={
                    <ButtonCustom type="submit">
                      {coursesReducer.playlist_edit ? "Guardar" : "Crear"}
                    </ButtonCustom>
                  }
                />

                <PlaylistForm
                  values={props.values}
                  setFieldValue={props.setFieldValue}
                  videoCards={tracks}
                  setVideoCards={setVideoCards}
                  errors={props.errors}
                  touched={props.touched}
                />
              </FormFormik>
            </>
          );
        }}
      </Formik>
    </Main>
  );
};
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
export default NewPlaylist;
