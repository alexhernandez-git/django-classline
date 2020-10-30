import React, { useState, useRef } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";

import styled from "@emotion/styled";
import PlaylistForm from "src/components/AdminAcademy/PlaylistForm";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { Formik, Form as FormFormik } from "formik";
import { Form } from "react-bootstrap";
import { createPlaylist, editPlaylist } from "src/redux/actions/playlistsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import ContainerWrapper from "src/components/ui/Container";

const PlaylistSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre es muy corto")
    .max(100, "El nombre es muy largo")
    .required("Este campo es obligatorio"),
});

const CourseFormAdmin = () => {
  const router = useHistory();
  const playlistsAdminReducer = useSelector((state) => state.playlistsAdminReducer);

  const [tracks, setVideoCards] = useState(
    playlistsAdminReducer.playlist_edit ? playlistsAdminReducer.playlist_edit.tracks : []
  );
  const dispatch = useDispatch();
  return (
    <Main padding>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: playlistsAdminReducer.playlist_edit
            ? playlistsAdminReducer.playlist_edit.name
            : "",
          picture: playlistsAdminReducer.playlist_edit
            ? playlistsAdminReducer.playlist_edit.picture
            : null,
        }}
        validationSchema={PlaylistSchema}
        onSubmit={(values) => {
          const playlist = {
            name: values.name,
            tracks: tracks,
          };
          if (playlistsAdminReducer.playlist_edit) {
            const dispatchEditPlaylist = (playlist) =>
              dispatch(editPlaylist(playlist));
            dispatchEditPlaylist({
              ...playlist,
              id: playlistsAdminReducer.playlist_edit.id,
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
                      {playlistsAdminReducer.playlist_edit ? "Guardar" : "Crear"}
                    </ButtonCustom>
                  }
                />
                <ContainerWrapper>
                  <PlaylistForm
                    values={props.values}
                    setFieldValue={props.setFieldValue}
                    videoCards={tracks}
                    setVideoCards={setVideoCards}
                    errors={props.errors}
                    touched={props.touched}
                  />
                </ContainerWrapper>
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
export default CourseFormAdmin;
