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
import PlaylistsAdminAcademy from "src/containers/PlaylistsAdminAcademy";
import PlaylistAdminAcademy from "src/containers/PlaylistAdminAcademy";
import ProfileAcademy from "src/containers/ProfileAcademy";
import ConfigurationAdmin from "src/containers/admin/ConfigurationAdmin";
import VideosAdmin from "src/containers/admin/VideosAdmin";
import MeetupsAdmin from "src/containers/admin/MeetupsAdmin";
import PodcastsAdmin from "src/containers/admin/PodcastsAdmin";
import UsersAdmin from "src/containers/admin/UsersAdmin";
import AccountsAdmin from "src/containers/admin/AccountsAdmin";
import "static/assets/styles/styles.scss";
import ScrollToTop from "src/utils/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  resetAuthErrors,
  setIsInstructor,
} from "../redux/actions/auth";
import { fetchProgram } from "../redux/actions/program";
import IndexAcademy from "src/containers/IndexAcademy";
import { fetchProgramRating } from "../redux/actions/rating";
import { Helmet } from "react-helmet";
import PlaylistsAcademy from "../containers/admin/PlaylistsAdmin";
import PlaylistFormAdmin from "../containers/admin/PlaylistFormAdmin";
import StudentPlaylistsAcademy from "../containers/PlaylistsAcademy";
import ForumAcademy from "../containers/ForumAcademy";
import CoursesAcademy from "../containers/CoursesAcademy";

import PlaylistFormAcademy from "../containers/PlaylistFormAcademy";
import PlaylistAcademy from "../containers/PlaylistAcademy";
import CourseAcademy from "../containers/CourseAcademy";
import SharedDocsAcademy from "../containers/SharedDocsAcademy";
import DocsAdmin from "../containers/admin/DocsAdmin";
import PostAcademy from "../containers/PostAcademy";
import InstructorAccountsAdmin from "../containers/admin/InstructorAccountsAdmin";
import CheckoutOnlineClass from "../containers/CheckoutOnlineClass";
import BookClassContainer from "../containers/BookClassContainer";
import { fetchEventsBooked } from "../redux/actions/bookEvents";
import PacksAdmin from "../containers/admin/PacksAdmin";
import TopicsAdmin from "../containers/admin/TopicsAdmin";
import ConfigurationPack from "../containers/admin/ConfigurationPack";
import BuyPacksContainer from "../containers/BuyPacksContainer";
import LoginContainer from "../containers/LoginContainer";
import CheckoutPack from "../containers/CheckoutPack";
import GeneralSearch from "../containers/GeneralSearch";
import TopicSearch from "../containers/TopicSearch";
import ConfigurationTopic from "../containers/admin/ConfigurationTopic";
import ConfigurationCourse from "../containers/admin/ConfigurationCourse";
import CoursesAdmin from "src/containers/admin/CoursesAdmin";
import BlocksItems from "../components/CourseAcademy/BlockItems";
import CourseBuyContainer from "../containers/CourseBuyContainer";
import CourseContainer from "../containers/CourseContainer";
import CoursesListContainer from "../containers/CoursesListContainer";
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
      (allowed_program) =>
        allowed_program.program.code == programId && authReducer.haveAccess
    );
    if (isStudent || isAdmin || isInstructor) {
      return true;
    } else {
      return false;
    }
  };

  const isInstructor = () => {
    return authReducer.user.teacher.instructor_in.some(
      (allowed_program) => allowed_program.program.code == programId
    );
  };
  const isAdmin = () => {
    return authReducer.user.teacher.programs.some(
      (program) => program.code == programId
    );
  };
  return programReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <Helmet>
        <title>Classline - {programReducer.program.title}</title>
      </Helmet>
      <ScrollToTop />

      <Switch>
        <Route exact path="/academy/:program" component={IndexAcademy} />
        <Route
          exact
          path="/academy/:program/book-class"
          component={BookClassContainer}
        />
        <Route
          exact
          path="/academy/:program/checkout-class-academy"
          component={CheckoutOnlineClass}
        />
        <Route
          exact
          path="/academy/:program/checkout-class"
          component={CheckoutOnlineClass}
        />
        <Route
          exact
          path="/academy/:program/login"
          component={LoginContainer}
        />
        <Route
          exact
          path="/academy/:program/login-academy"
          component={LoginContainer}
        />
        <Route
          exact
          path="/academy/:program/packs"
          component={BuyPacksContainer}
        />
        <Route
          exact
          path="/academy/:program/packs-login"
          component={LoginContainer}
        />
        <Route
          exact
          path="/academy/:program/courses-login"
          component={LoginContainer}
        />
        <Route
          exact
          path="/academy/:program/pack/detail"
          component={CheckoutPack}
        />
        <Route
          exact
          path="/academy/:program/courses-list"
          component={CoursesListContainer}
        />
        <Route
          exact
          path="/academy/:program/course-info/:id"
          component={CourseBuyContainer}
        />
        <Route
          exact
          path="/academy/:program/course-demo-playing/:id/:track?"
          component={CourseContainer}
        />
        <Route
          exact
          path="/academy/:program/course-playing/:id/:track?"
          component={CourseContainer}
        />
        {authReducer.isLoading ? (
          "Cargando..."
        ) : !authReducer.isAuthenticated ? (
          <Redirect to={`/academy/${programId}`} />
        ) : haveAccess() ? (
          <Layout>
            <Route
              exact
              path="/academy/:program/home"
              component={HomeAcademy}
            />
            <Route
              exact
              path="/academy/:program/search/:search?"
              component={GeneralSearch}
            />
            <Route
              exact
              path="/academy/:program/topic/:topic/:search?"
              component={TopicSearch}
            />
            <Route
              exact
              path="/academy/:program/:topic?/videos/:search?"
              component={
                programReducer.program.are_videos
                  ? VideosAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />
            <Route
              exact
              path="/academy/:program/:topic?/playlists/:search?"
              component={
                programReducer.program.are_admin_playlists
                  ? PlaylistsAdminAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />

            <Route
              exact
              path="/academy/:program/:topic?/podcasts/:search?"
              component={
                programReducer.program.are_podcasts
                  ? PodcastsAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />
            <Route
              exact
              path="/academy/:program/docs/:id"
              component={
                programReducer.program.are_docs
                  ? DocsAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />

            <Route
              exact
              path="/academy/:program/course/:id/:track?"
              component={CourseAcademy}
            />
            <Route
              exact
              path="/academy/:program/courses/:search?"
              component={CoursesAcademy}
            />
            <Route
              exact
              path="/academy/:program/playlist/:id/:track?"
              component={
                programReducer.program.are_admin_playlists
                  ? PlaylistAdminAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />

            <Route
              exact
              path="/academy/:program/meetups"
              component={
                programReducer.program.are_meetups
                  ? MeetupsAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />
            <Route
              exact
              path="/academy/:program/docs"
              component={
                programReducer.program.are_docs
                  ? DocsAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />
            <Route
              exact
              path="/academy/:program/shared-docs"
              component={
                programReducer.program.are_docs
                  ? SharedDocsAcademy
                  : () => <Redirect to={`/academy/${programId}/home`} />
              }
            />
            <Route
              exact
              path="/academy/:program/student-playlist/:id/:track?"
              component={PlaylistAcademy}
            />
            <Route
              exact
              path="/academy/:program/video/:id"
              component={VideoAcademy}
            />
            {authReducer.user && authReducer.user.created_account && (
              <Route
                exact
                path="/academy/:program/profile"
                component={ProfileAcademy}
              />
            )}
            <Route
              exact
              path="/academy/:program/student-playlists/:search?"
              component={StudentPlaylistsAcademy}
            />
            <Route
              exact
              path="/academy/:program/form/student-playlist"
              component={PlaylistFormAcademy}
            />
            <Route
              exact
              path="/academy/:program/forum"
              component={ForumAcademy}
            />
            <Route
              exact
              path="/academy/:program/post/:id"
              component={PostAcademy}
            />
            {(authReducer.user && isInstructor()) || isAdmin() ? (
              <>
                {isAdmin() && (
                  <>
                    <Route
                      exact
                      path="/academy/:program/admin"
                      component={ConfigurationAdmin}
                    />
                    <Route
                      exact
                      path="/academy/:program/admin/packs"
                      component={PacksAdmin}
                    />
                    <Route
                      exact
                      path="/academy/:program/admin/pack/:id"
                      component={ConfigurationPack}
                    />
                    <Route
                      exact
                      path="/academy/:program/admin/course/:course/block/:block"
                      component={BlocksItems}
                    />
                    <Route
                      exact
                      path="/academy/:program/admin/courses"
                      component={CoursesAdmin}
                    />
                    <Route
                      exact
                      path="/academy/:program/admin/course/:course/:tab_id?"
                      component={ConfigurationCourse}
                    />
                    <Route
                      exact
                      path="/academy/:program/admin/accounts/:search?"
                      component={AccountsAdmin}
                    />
                    <Route
                      exact
                      path="/academy/:program/admin/instructors/:search?"
                      component={InstructorAccountsAdmin}
                    />
                  </>
                )}
                <Route
                  exact
                  path="/academy/:program/admin/topics"
                  component={TopicsAdmin}
                />
                <Route
                  exact
                  path="/academy/:program/admin/topic/:id"
                  component={ConfigurationTopic}
                />
                <Route
                  exact
                  path="/academy/:program/admin/users/:search?"
                  component={UsersAdmin}
                />

                <Route
                  exact
                  path="/academy/:program/admin/videos/:search?"
                  component={VideosAdmin}
                />

                <Route
                  exact
                  path="/academy/:program/admin/playlists/:search?"
                  component={PlaylistsAcademy}
                />
                <Route
                  exact
                  path="/academy/:program/admin/form/playlist"
                  component={PlaylistFormAdmin}
                />
                <Route
                  exact
                  path="/academy/:program/admin/podcasts/:search?"
                  component={PodcastsAdmin}
                />
                <Route
                  exact
                  path="/academy/:program/admin/meetups"
                  component={MeetupsAdmin}
                />
                <Route
                  exact
                  path="/academy/:program/admin/docs"
                  component={DocsAdmin}
                />
              </>
            ) : (
              () => <Redirect to={`/academy/${programId}/home`} />
            )}
          </Layout>
        ) : (
          () => <Redirect to={`/academy/${programId}`} />
        )}
      </Switch>
    </>
  );
};
export default Academy;
