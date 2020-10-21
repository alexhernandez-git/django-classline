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
import DocsAcademy from "src/containers/DocsAcademy";
import MeetupsAcademy from "src/containers/MeetupsAcademy";
import PodcastsAcademy from "src/containers/PodcastsAcademy";
import VideoAcademy from "src/containers/VideoAcademy";
import CoursesAcademy from "src/containers/CoursesAcademy";
import PlaylistAdminAcademy from "src/containers/PlaylistAdminAcademy";
import ProfileAcademy from "src/containers/ProfileAcademy";
import ConfigurationAdmin from "src/containers/admin/ConfigurationAdmin";
import VideosAdmin from "src/containers/admin/VideosAdmin";
import PlaylistsAdmin from "src/containers/admin/PlaylistsAdmin";
import MeetupsAdmin from "src/containers/admin/MeetupsAdmin";
import PodcastsAdmin from "src/containers/admin/PodcastsAdmin";
import PlaylistFormAdmin from "src/containers/admin/PlaylistFormAdmin";
import UsersAdmin from "src/containers/admin/UsersAdmin";
import AccountsAdmin from "src/containers/admin/AccountsAdmin";
import "static/assets/styles/styles.scss";
import ScrollToTop from "src/utils/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, resetAuthErrors, setIsInstructor } from "../redux/actions/auth";
import { fetchProgram } from "../redux/actions/program";
import IndexAcademy from "src/containers/IndexAcademy";
import { fetchProgramRating } from "../redux/actions/rating";
import { Helmet } from "react-helmet";
import CoursesAdmin from "../containers/admin/CoursesAdmin";
import CourseFormAdmin from "../containers/admin/CourseFormAdmin";
import PlaylistsAcademy from "../containers/PlaylistsAcademy";
import ForumAcademy from "../containers/ForumAcademy";

import PlaylistFormAcademy from "../containers/PlaylistFormAcademy";
import PlaylistAcademy from "../containers/PlaylistAcademy";
import SharedDocsAcademy from "../containers/SharedDocsAcademy";
import DocsAdmin from "../containers/admin/DocsAdmin";
import PostAcademy from "../containers/PostAcademy";
import InstructorAccountsAdmin from "../containers/admin/InstructorAccountsAdmin";
import CheckoutOnlineClass from "../containers/CheckoutOnlineClass";
import BookClassContainer from "../containers/BookClassContainer";
import { fetchEventsBooked } from "../redux/actions/bookEvents";
import LoginEventContainer from "../containers/LoginEventContainer";
const Academy = () => {
  const dispatch = useDispatch();
  const router = useParams();
  const history = useHistory();
  const programId = router.program;
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(resetAuthErrors());
  }, [history.location]);

  useEffect(() => {
    if (programId) {
      const dispatchFetchProgram = (id) => dispatch(fetchProgram(id));
      dispatchFetchProgram(programId);
    }
  }, [programId]);
  useEffect(() => {
    if (programReducer.program && !authReducer.isLoading && authReducer.user) {
      const dispatchEventsBooked = () => dispatch(fetchEventsBooked());
      dispatchEventsBooked();
    }
  }, [authReducer.isLoading, authReducer.isAuthenticated]);
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
      (program) => program.code == programId && authReducer.haveAccess
    );
    const isAdmin = authReducer.user.teacher.programs.find(
      (program) => program.code == programId && authReducer.haveAccess
    );
    const isInstructor = authReducer.user.teacher.instructor_in.find(
      (allowed_program) => allowed_program.program.code == programId && authReducer.haveAccess
      );
    if (isStudent || isAdmin|| isInstructor) {
      return true;
    } else {
      return false;
    }
  };

    const isInstructor = () => {
      return  authReducer.user.teacher.instructor_in.some(
          (allowed_program) =>allowed_program.program.code == programId
          );
    };
    const isAdmin = () =>{
     return authReducer.user.teacher.programs.some(
        (program) => program.code == programId
        ) 
    }
  return programReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <Helmet>
        <title>Classline - {programReducer.program.title}</title>
      </Helmet>
      <ScrollToTop />

      <Switch>
        {authReducer.isLoading ? (
          "Cargando..."
        ) : !authReducer.isAuthenticated ?<Redirect to={`/academy/${programId}/packs`}/> :haveAccess() ? (
          <Layout>
            <Route
              exact
              path="/academy/:program/videos/:search?"
              component={
                programReducer.program.are_videos
                  ? VideosAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />
            <Route
              exact
              path="/academy/:program/podcasts/:search?"
              component={
                programReducer.program.are_podcasts
                  ? PodcastsAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />
            <Route
              exact
              path="/academy/:program/video/:id"
              component={VideoAcademy}
            />
            <Route
              exact
              path="/academy/:program/profile"
              component={ProfileAcademy}
            />
          
          </Layout>
        ) : (
          () => <Redirect to={`/academy/${programId}/pakcs`} />
        )}
      </Switch>
    </>
  );
};
export default Academy;
