import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";

import Layout from "src/components/Layout/LayoutAcademy";
import HomeAcademy from "src/containers/HomeAcademy";
import VideosAcademy from "src/containers/VideosAcademy";
import MeetupsAcademy from "src/containers/MeetupsAcademy";
import PodcastsAcademy from "src/containers/PodcastsAcademy";
import CoursesAcademy from "src/containers/CoursesAcademy";
import CourseAcademy from "src/containers/CourseAcademy";

import "static/assets/styles/styles.scss";
import ScrollToTop from "src/utils/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/auth";
import { fetchProgram } from "../redux/actions/program";
import IndexAcademy from "src/containers/IndexAcademy";

import styled from "@emotion/styled";
import DocsAcademy from "../containers/DocsAcademy";

const Academy = () => {
  const dispatch = useDispatch();
  const router = useParams();
  const history = useHistory();
  const programId = router.program;
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (programId) {
      const dispatchFetchProgram = (id) => dispatch(fetchProgram(id));
      dispatchFetchProgram(programId);
    }
  }, [programId]);

  useEffect(() => {
    if (
      !programReducer.isLoading &&
      programReducer.program &&
      !authReducer.user
    ) {
      const dispatchLoadUser = () => dispatch(loadUser());
      dispatchLoadUser();
    }
  }, [programReducer.isLoading]);
  const haveAccess = () => {
    const isStudent = authReducer.user.programs.find(
      (program) => program.code == programId
    );
    const isInstructor = authReducer.user.teacher.programs.find(
      (program) => program.code == programId
    );
    if (isStudent || isInstructor) {
      return true;
    } else {
      return false;
    }
  };

  return programReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <ScrollToTop />
      <Switch>
        <Layout>
          <Demo>Demo</Demo>
          <Route
            exact
            path="/demo/academy/:program/home"
            component={HomeAcademy}
          />
          <Route
            exact
            path="/demo/academy/:program/videos/:search?"
            component={
              programReducer.program.are_videos
                ? VideosAcademy
                : () => <Redirect to={`/academy/${programId}/home`} />
            }
          />

          <Route
            exact
            path="/demo/academy/:program/courses:search?"
            component={
              programReducer.program.are_courses
                ? CoursesAcademy
                : () => <Redirect to={`/academy/${programId}/home`} />
            }
          />
          <Route
            exact
            path="/demo/academy/:program/playlist/:id/:track?"
            component={
              programReducer.program.are_courses
                ? CourseAcademy
                : () => <Redirect to={`/academy/${programId}/home`} />
            }
          />
          <Route
            exact
            path="/demo/academy/:program/podcasts:search?"
            component={
              programReducer.program.are_podcasts
                ? PodcastsAcademy
                : () => <Redirect to={`/academy/${programId}/home`} />
            }
          />
          <Route
            exact
            path="/demo/academy/:program/meetups"
            component={
              programReducer.program.are_meetups
                ? MeetupsAcademy
                : () => <Redirect to={`/academy/${programId}/home`} />
            }
          />
          <Route
            exact
            path="/demo/academy/:program/docs"
            component={
              programReducer.program.are_docs || true
                ? DocsAcademy
                : () => <Redirect to={`/academy/${programId}/home`} />
            }
          />
        </Layout>
      </Switch>
    </>
  );
};
const Demo = styled.div`
  position: fixed;
  bottom: 0;
  margin: 2rem;
  right: 0;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background: linear-gradient(45deg, #2e6a89, #56b389);
  z-index: 1000;
  color: #fff;
  font-size: 2.5rem;
`;
export default Academy;
