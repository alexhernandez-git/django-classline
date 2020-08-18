import React, { useState, useRef } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";

import styled from "@emotion/styled";
import PlaylistForm from "src/components/AdminAcademy/PlaylistForm";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { Formik, Form as FormFormik } from "formik";
import { Form } from "react-bootstrap";
import { createPlaylist, editPlaylist } from "src/redux/actions/playlists";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const PlaylistSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre es muy corto")
    .max(50, "El nombre es muy largo")
    .required("Este campo es obligatorio"),
});

const NewPlaylist = () => {
  const router = useHistory();
  const playlistsReducer = useSelector((state) => state.playlistsReducer);

  const [tracks, setVideoCards] = useState(
    playlistsReducer.playlist_edit ? playlistsReducer.playlist_edit.tracks : []
  );
  const dispatch = useDispatch();
  return (
    <Main padding>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: playlistsReducer.playlist_edit
            ? playlistsReducer.playlist_edit.name
            : "",
          picture: playlistsReducer.playlist_edit
            ? playlistsReducer.playlist_edit.picture
            : null,
        }}
        validationSchema={PlaylistSchema}
        onSubmit={(values) => {
          const playlist = {
            name: values.name,
            tracks: tracks,
          };
          if (playlistsReducer.playlist_edit) {
            const dispatchEditPlaylist = (playlist) =>
              dispatch(editPlaylist(playlist));
            dispatchEditPlaylist({
              ...playlist,
              id: playlistsReducer.playlist_edit.id,
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
                      {playlistsReducer.playlist_edit ? "Guardar" : "Crear"}
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
